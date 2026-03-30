import { z, defineCollection, reference } from "astro:content";
import {glob} from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z
      .enum(["recipe", "poem", "post", "audio", "portfolio", "collection"])
      .optional(),
    internal: z.boolean().optional(),
    // Case study specific fields
    description: z.string().optional(),
    organization: z.string().optional(),
    product: z.string().optional(),
    collection: z.string(reference("articles")).optional(),
    thumbnail: z.string().url().optional(),
    hero: z.string().url().optional(),
    published: z.boolean().optional(),
    // Collection specific fields
    name: z.string().optional(),
    caseStudies: z.array(reference("articles")).optional(),
  }),
});

const jobs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/jobs" }),
  schema: z.object({
    role: z.string(),
    organization: z.string(),
    from: z.date(),
    to: z.date().optional(),
    caseStudies: z.array(reference("articles")).optional(),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/education" }),
  schema: z.object({
    role: z.string(),
    organization: z.string(),
    from: z.date(),
    to: z.date().optional(),
  }),
});

export const collections = {
  articles,
  jobs,
  education,
};
