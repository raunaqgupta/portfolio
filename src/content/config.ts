import { z, defineCollection } from 'astro:content';

const projectCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    organization: z.string(),
    date: z.date(),
    thumbnail: z.string().url()
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
  'projects': projectCollection,
  'poems': poemCollection,
  'recipes': recipeCollection,
  'blog': blogCollection,
  'jobs': jobCollection
};