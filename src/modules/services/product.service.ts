import { getEmDashCollection } from "emdash";
import type { Product } from "../../../.emdash/types";

export async function getProductsByCategory(
  categorySlug: string,
  limit = 4,
) {
  return getEmDashCollection<"products", Product>("products", {
    status: "published",

    where: {
      product_category: categorySlug,
    },

    orderBy: {
      published_at: "desc",
    },

    limit,
  });
}