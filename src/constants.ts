// Constants used across the site

export const SITE_URL = "https://www.raunaqgupta.com";
export const SITE_NAME = "Raunaq Gupta";
export const DEFAULT_DESCRIPTION = "Personal website of Raunaq Gupta";
export const DEFAULT_AUTHOR = "Raunaq Gupta";

export const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const ROUTES = {
  HOME: "/",
  PORTFOLIO: "/portfolio",
  BLOG: "/blog",
  RESUME: "/resume",
  INTERNAL: "/internal",
} as const;

export const CATEGORIES = {
  RECIPE: "recipe",
  POEM: "poem",
  POST: "post",
  AUDIO: "audio",
  CASE_STUDY: "case-study",
  COLLECTION: "collection",
} as const;
