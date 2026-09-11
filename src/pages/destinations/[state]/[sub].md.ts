import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { subDestinationMarkdown, markdownResponse } from "../../../utils/markdown-view";

export const getStaticPaths: GetStaticPaths = async () => {
  const subDestinations = await getCollection("subDestinations");
  return subDestinations.map((entry) => ({
    params: { state: entry.data.parentState, sub: entry.id.replace(/^[^/]+\//, "") },
    props: { entry },
  }));
};

export const GET: APIRoute = ({ props }) =>
  markdownResponse(subDestinationMarkdown(props.entry, props.entry.body ?? ""));
