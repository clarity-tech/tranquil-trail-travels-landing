import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { fixedDepartureMarkdown, markdownResponse } from "../../utils/markdown-view";

export const getStaticPaths: GetStaticPaths = async () => {
  const departures = await getCollection("fixedDepartures");
  return departures.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
};

export const GET: APIRoute = ({ props }) =>
  markdownResponse(fixedDepartureMarkdown(props.entry, props.entry.body ?? ""));
