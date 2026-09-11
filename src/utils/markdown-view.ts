/**
 * Markdown views of the pages, served at `<page>/index.md` and advertised with
 * `<link rel="alternate" type="text/markdown">` (llmstxt.org v2).
 *
 * These are composed, not dumped. Each entry's markdown body is only the
 * narrative opening — three or four paragraphs of prose. Everything an
 * assistant is actually asked about (itineraries, best time to visit, prices,
 * day-by-day plans, FAQs) lives in frontmatter and is assembled by the .astro
 * templates. Serving `entry.body` alone would look right and quietly drop all
 * of it, so the builders below mirror what each template renders.
 *
 * Keep them in step with their templates: if a section is added to a page,
 * add it here too, or the markdown view starts lying by omission.
 */
import type { CollectionEntry } from "astro:content";
import { siteConfig } from "../data/site";

const abs = (path: string) => new URL(path, siteConfig.url).href;

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const priceFmt = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`;

/** Drop empty sections rather than emit a heading with nothing under it. */
const block = (...parts: (string | null | undefined | false)[]) =>
  parts.filter(Boolean).join("\n\n");

const section = (heading: string, body: string | null) =>
  body && body.trim() ? `## ${heading}\n\n${body}` : null;

const list = (items: readonly string[]) => items.map((i) => `- ${i}`).join("\n");

const subsections = (
  items: readonly { title: string; description: string }[],
  suffix?: (item: never) => string
) =>
  items
    .map((item) => `### ${item.title}${suffix ? suffix(item as never) : ""}\n\n${item.description}`)
    .join("\n\n");

const faqs = (items: readonly { question: string; answer: string }[]) =>
  items.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n");

/** Every view ends the same way: how to actually book, and where the page is. */
const footer = (canonicalPath: string) =>
  [
    "---",
    "",
    `Trips are planned directly with a human — there is no booking engine on this site.`,
    "",
    `- WhatsApp (fastest): ${siteConfig.contact.whatsapp} — ${whatsappUrl}`,
    `- Email: ${siteConfig.contact.email}`,
    `- Instagram: ${siteConfig.contact.instagram}`,
    "",
    `Canonical page: ${abs(canonicalPath)}`,
    `Site index for assistants: ${abs("/llms.txt")}`,
  ].join("\n");

export function destinationMarkdown(entry: CollectionEntry<"destinations">, body: string) {
  const d = entry.data;
  return (
    block(
      `# ${d.title} — ${d.tagline}`,
      `> ${d.description}`,
      body.trim(),
      section("Best time to visit", `**${d.bestTimeToVisit.months}** — ${d.bestTimeToVisit.note}`),
      section("Highlights", subsections(d.highlights)),
      section(
        "Top experiences",
        d.topExperiences
          .map((e) => `### ${e.title} — ${e.location}\n\n${e.description}`)
          .join("\n\n")
      ),
      section("Cultural highlights", subsections(d.culturalHighlights)),
      section(
        "Sample itineraries",
        d.sampleItineraries
          .map((i) => `### ${i.title} (${i.duration})\n\n${i.summary}`)
          .join("\n\n")
      ),
      section("Frequently asked questions", faqs(d.faqs)),
      footer(`/destinations/${entry.id}/`)
    ) + "\n"
  );
}

export function subDestinationMarkdown(entry: CollectionEntry<"subDestinations">, body: string) {
  const s = entry.data;
  const slug = entry.id.replace(/^[^/]+\//, "");
  const practical = [
    `- **How to reach**: ${s.practicalInfo.howToReach}`,
    `- **Best time**: ${s.practicalInfo.bestTime}`,
    s.practicalInfo.entryFee ? `- **Entry fee**: ${s.practicalInfo.entryFee}` : null,
    `- **Recommended duration**: ${s.practicalInfo.recommendedDuration}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    block(
      `# ${s.title}, ${s.parentStateName} — ${s.tagline}`,
      `> ${s.description}`,
      `Part of [${s.parentStateName}](${abs(`/destinations/${s.parentState}/`)}).`,
      body.trim(),
      section("Highlights", subsections(s.highlights)),
      section("Practical information", practical),
      section("Frequently asked questions", faqs(s.faqs)),
      footer(`/destinations/${s.parentState}/${slug}/`)
    ) + "\n"
  );
}

export function fixedDepartureMarkdown(entry: CollectionEntry<"fixedDepartures">, body: string) {
  const f = entry.data;
  const concluded = f.endDate.getTime() < Date.now();

  const facts = [
    `- **Dates**: ${dateFmt.format(f.startDate)} – ${dateFmt.format(f.endDate)}`,
    `- **Duration**: ${f.durationNights} nights / ${f.durationDays} days`,
    `- **Price**: ${priceFmt.format(f.price)} (${f.priceNote})`,
    `- **Region**: ${f.state}`,
    `- **Route**: ${f.routeSummary}`,
    `- **Group**: ${f.groupPolicy.ageGroup}, maximum ${f.groupPolicy.maxGroupSize} travellers, ${f.groupPolicy.vehicle}`,
    `- **Status**: ${
      concluded ? "concluded — this departure has already run" : f.status.replace(/-/g, " ")
    }`,
    f.arrivalNote ? `- **Arrival**: ${f.arrivalNote}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const itinerary = f.days
    .map((day) => {
      const meals = day.meals.length ? `\n\nMeals: ${day.meals.join(", ")}.` : "";
      return `### Day ${day.day} — ${day.title}\n\n*${day.route}*\n\n${day.description}\n\nStay: ${day.stay}.${meals}`;
    })
    .join("\n\n");

  return (
    block(
      `# ${f.title} — ${f.tagline}`,
      `> ${f.description}`,
      concluded
        ? `**This departure has concluded.** Dates for the next edition are planned on request — ${whatsappUrl}`
        : null,
      facts,
      body.trim(),
      section("Highlights", list(f.highlights)),
      section("Day by day", itinerary),
      section("What is included", list(f.inclusions)),
      section("What is not included", list(f.exclusions)),
      section("Group policy", f.groupPolicy.note),
      section("Frequently asked questions", faqs(f.faqs)),
      footer(`/fixed-departures/${entry.id}/`)
    ) + "\n"
  );
}

export const markdownResponse = (body: string) =>
  new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });

/** The three pages with no markdown source of their own — composed from the
 *  same collections the .astro hubs render from. */
export function indexMarkdown(opts: {
  heading: string;
  summary: string;
  intro?: string;
  sections: { heading: string; body: string | null }[];
  canonicalPath: string;
}) {
  return (
    block(
      `# ${opts.heading}`,
      `> ${opts.summary}`,
      opts.intro,
      ...opts.sections.map((s) => section(s.heading, s.body)),
      footer(opts.canonicalPath)
    ) + "\n"
  );
}

export const mdLink = (name: string, path: string, notes: string) =>
  `- [${name}](${abs(path)}): ${notes.replace(/\s+/g, " ").trim()}`;

export { abs, dateFmt, priceFmt };
