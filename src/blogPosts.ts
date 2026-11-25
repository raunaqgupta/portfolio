// The posts listed on the blog: published articles outside the categories
// that have pages of their own, newest first. Shared by /blog and the blog
// section on the home page.
import { getCollection } from "astro:content";
import { CATEGORIES, ROUTES } from "./constants";

const HIDDEN_CATEGORIES: string[] = [
  CATEGORIES.PORTFOLIO,
  CATEGORIES.RECIPE,
  CATEGORIES.POEM,
  CATEGORIES.AUDIO,
  CATEGORIES.COLLECTION,
  CATEGORIES.MICRO,
];

export async function getBlogPosts() {
  let posts: Awaited<ReturnType<typeof getCollection<"articles">>> = [];
  try {
    posts = await getCollection("articles", ({ data }) => {
      return data.internal !== true && !HIDDEN_CATEGORIES.includes(data.category ?? "");
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }

  return posts
    .map(({ id, ...rest }) => ({ id: `${ROUTES.BLOG}/` + id, ...rest }))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
