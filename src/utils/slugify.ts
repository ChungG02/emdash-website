const DIACRITIC_PATTERN = /\p{Diacritic}/gu;
const NON_ASCII_SLUG_CHARACTER_PATTERN = /[^a-z0-9]+/g;

/**
 * Creates the canonical URL slug used by public content routes.
 * Vietnamese đ/Đ must be mapped before Unicode decomposition because it is
 * not decomposed by String.prototype.normalize().
 */
export function slugifyAscii(value: string, maxLength = 80): string {
  const normalized = value
    .normalize("NFKC")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .normalize("NFD")
    .replace(DIACRITIC_PATTERN, "")
    .toLowerCase()
    .replace(NON_ASCII_SLUG_CHARACTER_PATTERN, "-")
    .replace(/^-+|-+$/g, "");

  if (normalized) {
    return normalized.slice(0, maxLength).replace(/-+$/g, "");
  }

  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return `untitled-${(hash >>> 0).toString(36)}`.slice(0, maxLength);
}

// Drop-in export for EmDash's slug utility alias.
export const slugify = slugifyAscii;

export function decodeSlugSafely(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
