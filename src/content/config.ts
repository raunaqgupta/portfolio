import { z, defineCollection } from 'astro:content';

const casestudyCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    organization: z.string(),
    date: z.date(),
    thumbnail: z.string().url(),
    caseStudy: z.boolean().optional()
  }),
});

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z.enum(['recipe', 'poems', 'post']).optional()
  })
})

const jobCollection = defineCollection({
  schema: z.object({
    role: z.string(),
    organization: z.string(),
    from: z.date(),
    to: z.date().optional()
  })
})

const educationCollection = defineCollection({
  schema: z.object({
    role: z.string(),
    organization: z.string(),
    from: z.date(),
    to: z.date().optional()
  })
})

export const collections = {
  'casestudies': casestudyCollection,
  'blog': blogCollection,
  'jobs': jobCollection,
  'education': educationCollection
};