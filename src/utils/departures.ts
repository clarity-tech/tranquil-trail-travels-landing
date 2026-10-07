import type { CollectionEntry } from "astro:content";

/** Whether a departure is promoted anywhere on the site: the departure bar, the
 *  nav item, the homepage, the hub, its state's page, llms.txt and the markdown
 *  twins of those pages. A departure is listed until the day it ends, unless it
 *  sells out first. Its own page stays live either way and shows it as concluded
 *  or fully booked.
 *  Every listing calls this, so the HTML pages and their markdown views cannot
 *  disagree about which departures are on offer. */
export const isListed = (d: CollectionEntry<"fixedDepartures">) =>
  d.data.endDate.getTime() >= Date.now() && d.data.status !== "sold-out";
