import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://nh.naai.nz',
  output: 'server',
  adapter: cloudflare(),
});
