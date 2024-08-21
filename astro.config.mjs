import { defineConfig } from 'astro/config';

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: 'https://nh.naai.nz',
  output: 'server',
  adapter: vercel()
});