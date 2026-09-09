import { getEmDashCollection, getTermsForEntries } from "emdash";

import type { Product } from "../../../.emdash/types";
import {
  navigationItems,
  type NavigationItem,
} from "../../data/navigation";

const HEADER_PRODUCT_LIMIT = 100;

export async function getHeaderNavigationItems() {
  const productResult = await getEmDashCollection<"products", Product>(
    "products",
    {
      status: "published",
      orderBy: { published_at: "desc" },
      limit: HEADER_PRODUCT_LIMIT,
    },
  );

  if (productResult.error || productResult.entries.length === 0) {
    return {
      items: navigationItems,
      cacheHint: productResult.cacheHint,
      error: productResult.error,
    };
  }

  try {
    const categorySlugs = new Set(
      navigationItems.flatMap((item) =>
        item.productCategorySlug ? [item.productCategorySlug] : [],
      ),
    );
    const categoryTermsByProduct = await getTermsForEntries(
      "products",
      productResult.entries.map((product) => product.data.id),
      "product_category",
    );
    const productsByCategory = new Map<string, NavigationItem[]>();

    for (const product of productResult.entries) {
      const categories = categoryTermsByProduct.get(product.data.id) ?? [];

      for (const category of categories) {
        if (!categorySlugs.has(category.slug)) continue;

        const products = productsByCategory.get(category.slug) ?? [];
        products.push({
          label: product.data.title,
          href: `/products/${product.id}`,
        });
        productsByCategory.set(category.slug, products);
      }
    }

    return {
      items: navigationItems.map((item) => {
        if (!item.productCategorySlug) return item;

        const children = productsByCategory.get(item.productCategorySlug);

        return {
          ...item,
          children: children?.length ? children : undefined,
        };
      }),
      cacheHint: productResult.cacheHint,
      error: null,
    };
  } catch (error) {
    return {
      items: navigationItems,
      cacheHint: productResult.cacheHint,
      error,
    };
  }
}
