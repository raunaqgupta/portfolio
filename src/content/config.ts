import { z, defineCollection } from 'astro:content';

const projectCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    organization: z.string(),
  }),
});

const poemCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date()
  })
})

export const collections = {
  'projects': projectCollection,
  'poems': poemCollection
};