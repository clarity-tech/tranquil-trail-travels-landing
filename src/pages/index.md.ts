import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { indexMarkdown, markdownResponse, mdLink } from "../utils/markdown-view";
import { siteConfig } from "../data/site";

export const GET: APIRoute = async () => {
  const destinations = (await getCollection("destinations")).sort(
    (a, b) => a.data.order - b.data.order
  );
  const upcoming = (await getCollection("fixedDepartures"))
    .filter((d) => d.data.endDate.getTime() >= Date.now())
    .sort((a, b) => a.data.startDate.getTime() - b.data.startDate.getTime());

  return markdownResponse(
    indexMarkdown({
      heading: `${siteConfig.name} — ${siteConfig.tagline}`,
      summary: siteConfig.description,
      intro:
        "Every itinerary is custom-built and privately guided across Assam, Arunachal Pradesh, " +
        "Meghalaya and Nagaland. Fixed departures are the exception: dated, priced, small-group " +
        "trips with a published day-by-day plan.",
      sections: [
        {
          heading: "Destinations",
          body: destinations
            .map((d) =>
              mdLink(`${d.data.title} — ${d.data.tagline}`, `/destinations/${d.id}/`, d.data.description)
            )
            .join("\n"),
        },
        {
          heading: "Upcoming fixed departures",
          body: upcoming.length
            ? upcoming
                .map((d) =>
                  mdLink(d.data.title, `/fixed-departures/${d.id}/`, `${d.data.durationNights} nights in ${d.data.state}. ${d.data.routeSummary}`)
                )
                .join("\n")
            : "None currently scheduled — private departures are arranged on request.",
        },
      ],
      canonicalPath: "/",
    })
  );
};
