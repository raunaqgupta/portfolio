import { z, defineCollection } from 'astro:content';

const casestudyCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    organization: z.string(),
    date: z.date(),
    thumbnail: z.string().url(),
    caseStudy: z.boolean().optional()
  }),
});

const poemCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
  })
})

const recipeCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date()
  })
})

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date()
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

export const collections = {
  'casestudies': casestudyCollection,
  'poems': poemCollection,
  'recipes': recipeCollection,
  'blog': blogCollection,
  'jobs': jobCollection
};