import { z, defineCollection, reference } from 'astro:content';

const casestudies = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    organization: z.string(),
    date: z.date(),
    thumbnail: z.string().url(),
    caseStudy: z.boolean().optional()
  }),
});

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z.enum(['recipe', 'poems', 'post']).optional()
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
  education
};