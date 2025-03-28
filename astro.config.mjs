import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  server : {
    headers : {
      "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com/ https://vitals.vercel-analytics.com/; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://cdn.statically.io/ https://*.githubusercontent.com/; connect-src 'self' https://va.vercel-scripts.com/ https://vitals.vercel-analytics.com/ https://gh-pinned-repos-tsj7ta5xfhep.deno.dev/; font-src 'self'",
      "Cross-Origin-Embedder-Policy": "credentialless",
      "Cross-Origin-Resource-Policy": "cross-origin",
      "Cross-Origin-Opener-Policy": "same-origin"

    }
  },
  devToolbar: {
    enabled: false
  },
  integrations: [tailwind(), react()],
  vite: {
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
      },
    },
    optimizeDeps: {
      exclude: ['@vercel/analytics', '@vercel/speed-insights']
    }
  },
  integrations: [tailwind(), react()]
  },
);