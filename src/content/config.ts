import { z, defineCollection, reference } from 'astro:content';

const articles = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z.enum(['recipe', 'poem', 'post', 'audio', 'case-study', 'collection']).optional(),
    internal: z.boolean().optional(),
    // Case study specific fields
    description: z.string().optional(),
    organization: z.string().optional(),
    product: z.string().optional(),
    hero: z.string().url().optional(),
    published: z.boolean().optional(),
    // Collection specific fields
    name: z.string().optional(),
    caseStudies: z.array(reference('articles')).optional()
  })
})

const jobs = defineCollection({
  schema: z.object({
    role: z.string(),
    organization: z.string(),
    from: z.date(),
    to: z.date().optional(),
    caseStudies: z.array(reference('articles')).optional()
  })
})

const education = defineCollection({
  schema: z.object({
    role: z.string(),
    organization: z.string(),
    from: z.date(),
    to: z.date().optional()
  })
})

export const collections = {
  articles,
  jobs,
  education,
};