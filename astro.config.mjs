import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://raunaqgupta.com",
  prefetch: true,
  integrations: [mdx(), sitemap()],
  image: {
    layout: "constrained"
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark"
      }
    }
  },
  experimental: {
    fonts: [{
      provider: 'local',
      name: 'DMSerifDisplay-Italic',
      cssVariable: '--font-dm-serif-display-italic',
      variants: [{
        src: ["./src/assets/fonts/DMSerifDisplay-Italic.woff2"],
        weight: 400,
        style: 'normal'
      }]
    }]
  }
});