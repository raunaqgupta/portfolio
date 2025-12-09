import { defineConfig, fontProviders } from "astro/config";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  integrations: [mdx()],
  image: {
    layout: "constrained"
  },
  redirects: {
    '/': '/portfolio'
  } 
  ,
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