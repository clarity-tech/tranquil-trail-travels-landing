/**
 * Per-page `lastmod` for the sitemap, derived from git history.
 *
 * Why not `new Date()`: stamping build time on every URL tells crawlers the
 * whole site changed on every deploy. Google only honours `lastmod` while it
 * stays consistently accurate, so an always-now date is worse than no date.
 *
 * Why the shallow guard matters: on a shallow clone `git log` happily returns
 * the single available commit's date for *every* file — no error, just the
 * false-freshness problem again, now hidden behind machinery that looks right
 * locally. So when history is missing we emit nothing at all. CI must check
 * out with `fetch-depth: 0` (see .github/workflows/deploy.yml) for dates to
 * appear in production.
 *
 * Precedence per URL: frontmatter `updatedDate` -> git commit date -> omit.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const git = (args) =>
  execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });

/** One pass over the log instead of a subprocess per file. */
function buildDateMap() {
  try {
    if (git(["rev-parse", "--is-shallow-repository"]).trim() === "true") {
      console.warn(
        "[sitemap] shallow clone — omitting lastmod rather than emitting the same date for every URL"
      );
      return null;
    }
  } catch {
    console.warn("[sitemap] git unavailable — omitting lastmod");
    return null;
  }

  const dates = new Map();
  let current = null;
  // Renames are not followed: `--follow` is per-file only. A renamed file
  // shows up at its rename commit, which is fine — it is a new URL anyway.
  for (const line of git(["log", "--pretty=format:%cI", "--name-only"]).split("\n")) {
    const text = line.trim();
    if (text === "") continue;
    if (/^\d{4}-\d{2}-\d{2}T/.test(text)) {
      current = text;
    } else if (current && !dates.has(text)) {
      // Log is newest-first, so the first sighting of a path is its latest change.
      dates.set(text, current);
    }
  }
  return dates;
}

/** The file that owns a page's *content* — not its chrome. A nav tweak in
 *  Layout.astro does not mean the destination page changed. */
function sourceFor(pathname) {
  const segments = pathname.replace(/^\/|\/$/g, "").split("/").filter(Boolean);

  if (segments.length === 0) return "src/pages/index.astro";
  if (segments.length === 1 && segments[0] === "destinations")
    return "src/pages/destinations/index.astro";
  if (segments.length === 1 && segments[0] === "fixed-departures")
    return "src/pages/fixed-departures/index.astro";
  if (segments[0] === "destinations" && segments.length === 2)
    return `src/content/destinations/${segments[1]}.md`;
  if (segments[0] === "destinations" && segments.length === 3)
    return `src/content/sub-destinations/${segments[1]}/${segments[2]}.md`;
  if (segments[0] === "fixed-departures" && segments.length === 2)
    return `src/content/fixed-departures/${segments[1]}.md`;
  if (segments[0] === "blog" && segments.length === 2)
    return `src/content/blog/${segments[1]}.md`;

  return null;
}

/** Escape hatch: set `updatedDate` in frontmatter to override the git date —
 *  to claim a substantive rewrite, or to keep a typo fix from re-flagging the
 *  page. Nothing sets it today; it exists so the option is there. */
function frontmatterDate(file) {
  if (!file.endsWith(".md") || !existsSync(file)) return null;
  const head = readFileSync(file, "utf8").split(/\r?\n/, 40);
  if (head[0] !== "---") return null;
  for (const line of head.slice(1)) {
    if (line === "---") break;
    const match = line.match(/^updatedDate:\s*["']?([^"'\s#]+)["']?/);
    if (match) {
      const parsed = new Date(match[1]);
      if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
    }
  }
  return null;
}

export function createLastmodSerializer() {
  const dates = buildDateMap();

  return (item) => {
    const file = sourceFor(new URL(item.url).pathname);
    if (!file) return item;

    const stamp = frontmatterDate(file) ?? (dates && existsSync(file) ? dates.get(file) : null);
    return stamp ? { ...item, lastmod: stamp } : item;
  };
}
