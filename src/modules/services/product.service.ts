import {
  getEmDashCollection,
  getTermsForEntries,
} from "emdash";

import type {
  Product,
} from "../../../.emdash/types";

export async function getProductsByCategory(
  categorySlug: string,
  limit = 100,
) {
  const directResult = await getEmDashCollection<"products", Product>(
    "products",
    {
      status: "published",
      where: {
        product_category: categorySlug,
      },
      orderBy: {
        published_at: "desc",
      },
      limit,
    },
  );

  if (directResult.error || directResult.entries.length > 0) {
    return directResult;
  }

  // An assignment can appear in Admin while the optimized taxonomy query
  // misses it. Fall back to the hydrated term mapping only in that case.
  const fallbackResult = await getEmDashCollection<"products", Product>(
    "products",
    {
      status: "published",
      orderBy: {
        published_at: "desc",
      },
    },
  );

  if (fallbackResult.error || fallbackResult.entries.length === 0) {
    return fallbackResult;
  }

  const termsByProduct = await getTermsForEntries(
    "products",
    fallbackResult.entries.map((product) => product.data.id),
    "product_category",
  );

  const entries = fallbackResult.entries
    .filter((product) =>
      (termsByProduct.get(product.data.id) ?? []).some(
        (term) => term.slug === categorySlug,
      ),
    )
    .slice(0, limit);

  return {
    ...fallbackResult,
    entries,
    nextCursor: undefined,
    hasMore: false,
  };
}
