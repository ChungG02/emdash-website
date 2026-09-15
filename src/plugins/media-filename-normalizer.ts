import { definePlugin } from "emdash";
import type { PluginDescriptor, ResolvedPlugin } from "emdash";
import { slugifyAscii } from "../utils/slugify";

export function mediaFilenameNormalizer(): PluginDescriptor {
  return {
    id: "thai-son-media-filename-normalizer",
    version: "1.0.0",
    entrypoint: "/src/plugins/media-filename-normalizer.ts",
    format: "native",
    capabilities: ["media:write"],
  };
}

export function createPlugin(): ResolvedPlugin {
  return definePlugin({
    id: "thai-son-media-filename-normalizer",
    version: "1.0.0",
    capabilities: ["media:write"],
    hooks: {
      "media:beforeUpload": async (event) => {
        const extensionStart = event.file.name.lastIndexOf(".");
        const extension =
          extensionStart > 0 ? event.file.name.slice(extensionStart).toLowerCase() : "";
        const originalStem =
          extensionStart > 0 ? event.file.name.slice(0, extensionStart) : event.file.name;
        const normalizedStem = slugifyAscii(originalStem, 96);

        // A numeric camera filename is technically valid but not useful in
        // the media library. Keep its identity while making the purpose clear.
        const safeStem = /^\d+$/.test(normalizedStem)
          ? `product-image-${normalizedStem}`
          : normalizedStem;

        event.file.name = `${safeStem || "image"}${extension}`;
      },
    },
  });
}

