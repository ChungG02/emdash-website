const DIACRITIC_PATTERN = /\p{Diacritic}/gu;
const NON_ASCII_SLUG_CHARACTER_PATTERN = /[^a-z0-9]+/g;
const TRAILING_HYPHENS_PATTERN = /-+$/g;

function slugify(value, maxLength = 80) {
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
    return normalized.slice(0, maxLength).replace(TRAILING_HYPHENS_PATTERN, "");
  }

  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return `untitled-${(hash >>> 0).toString(36)}`.slice(0, maxLength);
}

export { slugify };

