import { z, defineCollection } from 'astro:content';

const projectCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    organization: z.string(),
  }),
});

export const collections = {
  'projects': projectCollection,
};