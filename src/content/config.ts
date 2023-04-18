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
    title: z.string()
  })
})

export const collections = {
  'projects': projectCollection,
  'poems': poemCollection
};