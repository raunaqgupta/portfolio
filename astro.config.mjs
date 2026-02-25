import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { transformerNotationHighlight } from "@shikijs/transformers";

// https://astro.build/config
export default defineConfig({
  site: "https://www.raunaqgupta.com",
  prefetch: true,
  integrations: [mdx(), sitemap()],
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
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Cal Sans",
        cssVariable: "--font-cal-sans",
      },
    ],
  },
});
