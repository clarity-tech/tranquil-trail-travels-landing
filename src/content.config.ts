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

export const collections = { destinations, blog };
