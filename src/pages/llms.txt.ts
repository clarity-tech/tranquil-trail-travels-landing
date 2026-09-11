import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { siteConfig } from "../data/site";

/**
 * /llms.txt — https://llmstxt.org
 *
 * The format is a *link map*, not a brochure: every section is a list of
 * `- [Name](url): description` lines so an assistant can pick a page and go
 * fetch it. It is generated from the content collections for the same reason
 * the sitemap is — a hand-written list silently goes stale the first time
 * someone adds a destination.
 */

const abs = (path: string) => new URL(path, siteConfig.url).href;

/** Deterministic regardless of the build machine's timezone (CI runs UTC). */
const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const priceFmt = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** Collapse a description onto one line — a line break would end the entry. */
const oneLine = (s: string) => s.replace(/\s+/g, " ").trim();

/** First sentence only. Frontmatter prose runs long; a map entry should not. */
const firstSentence = (s: string) => oneLine(s).split(/(?<=\.)\s+/)[0];

const link = (name: string, path: string, description: string) =>
  `- [${name}](${abs(path)}): ${oneLine(description)}`;

export const GET: APIRoute = async () => {
  const [destinations, subDestinations, departures, posts] = await Promise.all([
    getCollection("destinations"),
    getCollection("subDestinations"),
    getCollection("fixedDepartures"),
    getCollection("blog"),
  ]);

  const sections: string[] = [];

  const byOrder = (a: { data: { order: number } }, b: { data: { order: number } }) =>
    a.data.order - b.data.order;

  const destinationLinks = [...destinations]
    .sort(byOrder)
    .map((d) =>
      link(`${d.data.title} — ${d.data.tagline}`, `/destinations/${d.id}/`, d.data.description)
    );

  sections.push(
    `## Start here\n\n` +
      link(
        "Homepage",
        "/",
        "The five-chapter story of Northeast India the rest of the site hangs off, plus current departures and recent field notes."
      )
  );

  sections.push(
    `## Destinations\n\n` +
      link(
        "All destinations",
        "/destinations/",
        "Hub page listing every state we operate in."
      ) +
      "\n" +
      destinationLinks.join("\n")
  );

  if (subDestinations.length > 0) {
    const subLinks = [...subDestinations].sort(byOrder).map((s) => {
      const slug = s.id.replace(/^[^/]+\//, "");
      return link(
        `${s.data.title}, ${s.data.parentStateName}`,
        `/destinations/${s.data.parentState}/${slug}/`,
        `${s.data.description} Suggested stay: ${firstSentence(
          s.data.practicalInfo.recommendedDuration
        )}`
      );
    });
    sections.push(`## Places within those states\n\n${subLinks.join("\n")}`);
  }

  // Matches Layout.astro and the departures hub: a trip is listed until the
  // day it ends, then drops off the site — and must drop off here with it.
  const upcoming = departures
    .filter((d) => d.data.endDate.getTime() >= Date.now())
    .sort((a, b) => a.data.startDate.getTime() - b.data.startDate.getTime());

  if (upcoming.length > 0) {
    const departureLinks = upcoming.map((d) => {
      const dates = `${dateFmt.format(d.data.startDate)} – ${dateFmt.format(d.data.endDate)}`;
      const price = `${priceFmt.format(d.data.price)} ${d.data.priceNote.toLowerCase()}`;
      const soldOut = d.data.status === "sold-out" ? " Currently sold out." : "";
      return link(
        d.data.title,
        `/fixed-departures/${d.id}/`,
        `${dates}. ${d.data.durationNights} nights / ${d.data.durationDays} days in ${d.data.state}, ${price}. ${d.data.routeSummary}${soldOut}`
      );
    });
    sections.push(
      `## Fixed departures (dated group trips, priced)\n\n` +
        link(
          "All upcoming departures",
          "/fixed-departures/",
          "Hub page listing every departure that has not yet concluded."
        ) +
        "\n" +
        departureLinks.join("\n")
    );
  }

  const published = posts
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());

  if (published.length > 0) {
    sections.push(
      `## Journal\n\n` +
        published
          .map((p) => link(p.data.title, `/blog/${p.id}/`, p.data.description))
          .join("\n")
    );
  }

  sections.push(
    `## Contact\n\n` +
      `Enquiries are handled person-to-person — there is no booking engine on this site.\n\n` +
      `- WhatsApp (fastest): ${siteConfig.contact.whatsapp} — ${
        `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`
      }\n` +
      `- Email: ${siteConfig.contact.email}\n` +
      `- Instagram: ${siteConfig.contact.instagram}\n` +
      `- Sitemap: ${abs("/sitemap.xml")}`
  );

  const body =
    `# ${siteConfig.name}\n\n` +
    `> ${siteConfig.tagline}\n\n` +
    `${siteConfig.description}\n\n` +
    `Every itinerary is custom-built and privately guided; trips are planned directly with ` +
    `a human over WhatsApp or email rather than booked online. Fixed departures are the ` +
    `exception — those are dated, priced, small-group trips with a published day-by-day plan.\n\n` +
    `${sections.join("\n\n")}\n`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
