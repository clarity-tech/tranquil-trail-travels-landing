import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { destinationMarkdown, markdownResponse } from "../../utils/markdown-view";

export const getStaticPaths: GetStaticPaths = async () => {
  const destinations = await getCollection("destinations");
  return destinations.map((entry) => ({ params: { id: entry.id }, props: { entry } }));
};

export const GET: APIRoute = ({ props }) =>
  markdownResponse(destinationMarkdown(props.entry, props.entry.body ?? ""));
