import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { indexMarkdown, markdownResponse, mdLink } from "../../utils/markdown-view";

export const GET: APIRoute = async () => {
  const destinations = (await getCollection("destinations")).sort(
    (a, b) => a.data.order - b.data.order
  );
  const subs = (await getCollection("subDestinations")).sort((a, b) => a.data.order - b.data.order);

  return markdownResponse(
    indexMarkdown({
      heading: "Destinations — Northeast India",
      summary:
        "The four Northeast Indian states we build journeys in, and the individual places within them.",
      sections: [
        {
          heading: "States",
          body: destinations
            .map((d) =>
              mdLink(`${d.data.title} — ${d.data.tagline}`, `/destinations/${d.id}/`, d.data.description)
            )
            .join("\n"),
        },
        {
          heading: "Places",
          body: subs.length
            ? subs
                .map((s) =>
                  mdLink(
                    `${s.data.title}, ${s.data.parentStateName}`,
                    `/destinations/${s.data.parentState}/${s.id.replace(/^[^/]+\//, "")}/`,
                    s.data.description
                  )
                )
                .join("\n")
            : null,
        },
      ],
      canonicalPath: "/destinations/",
    })
  );
};
