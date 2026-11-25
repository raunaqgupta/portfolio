import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { transformerNotationHighlight } from "@shikijs/transformers";

import sentry from "@sentry/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://www.raunaqgupta.com",
  prefetch: true,
  integrations: [
    mdx(),
    sitemap(),
    sentry({
      project: "javascript-astro",
      org: "raunaq-gupta-mf",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
  image: {
    layout: "constrained",
  },
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      themes: {
        light: "solarized-light",
        dark: "solarized-dark",
      },
      transformers: [transformerNotationHighlight()],
    },
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Cal Sans",
      cssVariable: "--font-cal-sans",
    },
    {
      // Card titles and wordmarks on the home page; italic for the resume
      // section's repeating rows.
      provider: fontProviders.google(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: [900],
      styles: ["normal", "italic"],
    },
  ],
});
