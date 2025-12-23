import { z, defineCollection, reference } from 'astro:content';

const casestudies = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    organization: z.string(),
    product: z.string().optional(),
    date: z.date(),
    thumbnail: z.string().url(),
    hero: z.string().url().optional(),
    published: z.boolean().optional()
  }),
});

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z.enum(['recipe', 'poem', 'post']).optional()
  })
})

const jobs = defineCollection({
  schema: z.object({
    role: z.string(),
    organization: z.string(),
    from: z.date(),
    to: z.date().optional(),
    caseStudies: z.array(reference('casestudies')).optional()
  })
})

const product = defineCollection({
  schema: z.object({
    name: z.string(),
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    thumbnail: z.string().url().optional(),
    hero: z.string().url().optional(),
    organization: z.string(),
    caseStudies: z.array(reference('casestudies')).optional()
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
  casestudies,
  blog,
  jobs,
  education,
  product,
};