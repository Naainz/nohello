import { defineConfig } from 'astro/config';
import staticAdapter from '@astrojs/static';

// https://astro.build/config
export default defineConfig({
  site: 'https://nh.naai.nz',
  output: 'static',
  adapter: staticAdapter()
});
