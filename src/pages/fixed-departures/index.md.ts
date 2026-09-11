import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { dateFmt, indexMarkdown, markdownResponse, mdLink, priceFmt } from "../../utils/markdown-view";

export const GET: APIRoute = async () => {
  const upcoming = (await getCollection("fixedDepartures"))
    .filter((d) => d.data.endDate.getTime() >= Date.now())
    .sort((a, b) => a.data.startDate.getTime() - b.data.startDate.getTime());

  return markdownResponse(
    indexMarkdown({
      heading: "Fixed departures",
      summary:
        "Dated, priced, small-group journeys with a published day-by-day itinerary. Everything else on this site is a private custom trip.",
      sections: [
        {
          heading: "Upcoming",
          body: upcoming.length
            ? upcoming
                .map((d) =>
                  mdLink(
                    d.data.title,
                    `/fixed-departures/${d.id}/`,
                    `${dateFmt.format(d.data.startDate)} – ${dateFmt.format(d.data.endDate)}. ${d.data.durationNights} nights / ${d.data.durationDays} days in ${d.data.state}, ${priceFmt.format(d.data.price)} ${d.data.priceNote.toLowerCase()}. ${d.data.routeSummary}`
                  )
                )
                .join("\n")
            : "No departures are currently scheduled. Private departures on these routes are arranged on request.",
        },
      ],
      canonicalPath: "/fixed-departures/",
    })
  );
};
