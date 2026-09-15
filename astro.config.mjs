import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2, sandbox } from "@emdash-cms/cloudflare";
import { formsPlugin } from "@emdash-cms/plugin-forms";
import webhookNotifier from "@emdash-cms/plugin-webhook-notifier";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import emdash from "emdash/astro";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { cloudflareEmail } from "@emdash-cms/cloudflare/plugins";
import { mediaFilenameNormalizer } from "./src/plugins/media-filename-normalizer.ts";
import { thaiSonEmailTemplate } from "./src/plugins/thai-son-email-template.ts";

const canonicalSlugifyPath = fileURLToPath(
  new URL("./src/utils/slugify-runtime.js", import.meta.url),
);
const canonicalSlugifySource = readFileSync(canonicalSlugifyPath, "utf8");

const canonicalSlugifyPlugin = {
  name: "canonical-emdash-slugify",
  enforce: "pre",
  resolveId(source) {
    return source === "@emdash-cms/admin/slugify"
      ? canonicalSlugifyPath
      : undefined;
  },
  load(id) {
    const normalizedId = id.replaceAll("\\", "/");
    return normalizedId.endsWith("/@emdash-cms/admin/dist/slugify.js")
      ? canonicalSlugifySource
      : undefined;
  },
};

export default defineConfig({
  site: "https://my-emdash-site.chungg02.workers.dev",
  output: "server",
  i18n: {
    defaultLocale: "vi",
    locales: ["vi", "en", "zh"],
  },
  adapter: cloudflare(),
  image: {
    layout: "constrained",
    responsiveStyles: true,
  },
  integrations: [
    react(),
    emdash({
      database: d1({ binding: "DB", session: "auto" }),
      storage: r2({ binding: "MEDIA" }),
      middleware: {
        outer: "./src/middleware.ts",
      },
      plugins: [
        formsPlugin({
          defaultSpamProtection: "honeypot",
        }),
        mediaFilenameNormalizer(),
        thaiSonEmailTemplate(),
        cloudflareEmail({
          binding: "EMAIL",
          from: {
            email: "website@chungdev.website",
            name: "Thái Sơn Plastic",
          },
          replyTo: "info@thaisonplastic.com",
        }),
      ],
      sandboxed: [webhookNotifier],
      sandboxRunner: sandbox(),
      marketplace: "https://marketplace.emdashcms.com",
    }),
  ],
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Inter",
      cssVariable: "--font-body",
      weights: [400, 500, 600, 700],
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "JetBrains Mono",
      cssVariable: "--font-mono",
      weights: [400, 500],
      fallbacks: ["monospace"],
    },
  ],
  devToolbar: { enabled: false },
  vite: {
    optimizeDeps: {
      rolldownOptions: {
        plugins: [
          {
            name: "canonical-emdash-slugify-optimize",
            resolveId(source) {
              return source === "@emdash-cms/admin/slugify"
                ? canonicalSlugifyPath
                : undefined;
            },
            load(id) {
              const normalizedId = id.replaceAll("\\", "/");
              return normalizedId.endsWith("/@emdash-cms/admin/dist/slugify.js")
                ? canonicalSlugifySource
                : undefined;
            },
          },
        ],
      },
    },
    resolve: {
      alias: {
        // EmDash's default slugifier preserves Unicode. Use the site's
        // canonical ASCII/Vietnamese-aware implementation for new content.
        "@emdash-cms/admin/slugify": canonicalSlugifyPath,
      },
    },
    plugins: [
      canonicalSlugifyPlugin,
      tailwindcss(),
    ],
    server: {
      hmr: false,
    },
  },
});
