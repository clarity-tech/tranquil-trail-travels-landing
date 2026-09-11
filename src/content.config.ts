import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const destinations = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/destinations" }),
  schema: z.object({
    title: z.string(),
    state: z.string(),
    tagline: z.string(),
    description: z.string(),
    heroImage: z.string().optional(),
    bestTimeToVisit: z.object({
      months: z.string(),
      note: z.string(),
    }),
    highlights: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
      })
    ),
    topExperiences: z.array(
      z.object({
        title: z.string(),
        location: z.string(),
        description: z.string(),
        image: z.string().optional(),
      })
    ),
    culturalHighlights: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
    sampleItineraries: z.array(
      z.object({
        title: z.string(),
        duration: z.string(),
        summary: z.string(),
      })
    ),
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ),
    seo: z.object({
      metaTitle: z.string(),
      metaDescription: z.string(),
    }),
    /** Optional override for the sitemap's git-derived lastmod — set it to
     *  claim a substantive rewrite, or to stop a typo fix re-flagging the page.
     *  See src/utils/git-lastmod.mjs. */
    updatedDate: z.coerce.date().optional(),
    order: z.number().default(0),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    state: z.string().optional(),
    category: z.enum([
      "destination-guide",
      "culture-heritage",
      "adventure-nature",
      "practical-travel",
      "luxury-experiences",
    ]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const subDestinations = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/sub-destinations" }),
  schema: z.object({
    title: z.string(),
    parentState: z.string(),
    parentStateName: z.string(),
    tagline: z.string(),
    description: z.string(),
    heroImage: z.string().optional(),
    highlights: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
      })
    ),
    practicalInfo: z.object({
      howToReach: z.string(),
      bestTime: z.string(),
      entryFee: z.string().optional(),
      recommendedDuration: z.string(),
    }),
    gallery: z
      .array(
        z.object({
          image: z.string(),
          caption: z.string(),
        })
      )
      .optional(),
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ),
    seo: z.object({
      metaTitle: z.string(),
      metaDescription: z.string(),
    }),
    /** Optional override for the sitemap's git-derived lastmod — set it to
     *  claim a substantive rewrite, or to stop a typo fix re-flagging the page.
     *  See src/utils/git-lastmod.mjs. */
    updatedDate: z.coerce.date().optional(),
    order: z.number().default(0),
  }),
});

const fixedDepartures = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/fixed-departures" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    state: z.string(),
    /** id of the parent entry in the `destinations` collection, e.g. "meghalaya" */
    parentState: z.string(),
    description: z.string(),
    heroImage: z.string().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    durationNights: z.number(),
    durationDays: z.number(),
    price: z.number(),
    priceCurrency: z.string().default("INR"),
    priceNote: z.string().default("Per person"),
    /** "past" is derived from endDate at build time — do not set it here */
    status: z.enum(["open", "filling-fast", "sold-out"]).default("open"),
    routeSummary: z.string(),
    arrivalNote: z.string().optional(),
    highlights: z.array(z.string()),
    days: z.array(
      z.object({
        day: z.number(),
        title: z.string(),
        route: z.string(),
        description: z.string(),
        stay: z.string(),
        meals: z.array(z.string()).default([]),
        image: z.string().optional(),
      })
    ),
    inclusions: z.array(z.string()),
    exclusions: z.array(z.string()),
    groupPolicy: z.object({
      note: z.string(),
      ageGroup: z.string(),
      maxGroupSize: z.number(),
      vehicle: z.string(),
    }),
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ),
    seo: z.object({
      metaTitle: z.string(),
      metaDescription: z.string(),
    }),
    /** Optional override for the sitemap's git-derived lastmod — set it to
     *  claim a substantive rewrite, or to stop a typo fix re-flagging the page.
     *  See src/utils/git-lastmod.mjs. */
    updatedDate: z.coerce.date().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { destinations, blog, subDestinations, fixedDepartures };
