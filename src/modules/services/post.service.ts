import { getEmDashCollection } from "emdash";
import {
  DEFAULT_UI_LOCALE,
  type UiLocale,
} from "../../i18n/ui";
import { getTermsForEntriesWithFallback } from "../../i18n/content";

type PostTaxonomy = "category" | "tag";

export async function getPostsByTaxonomy(
  taxonomy: PostTaxonomy,
  termSlug: string,
  locale: UiLocale,
  limit = 100,
) {
  const directResult = await getEmDashCollection("posts", {
    status: "published",
    where: { [taxonomy]: termSlug },
    orderBy: { published_at: "desc" },
    limit,
    locale,
  });

  if (
    directResult.error ||
    directResult.entries.length > 0 ||
    locale === DEFAULT_UI_LOCALE
  ) {
    return directResult;
  }

  const fallbackResult = await getEmDashCollection("posts", {
    status: "published",
    orderBy: { published_at: "desc" },
    locale: DEFAULT_UI_LOCALE,
  });

  if (fallbackResult.error || fallbackResult.entries.length === 0) {
    return fallbackResult;
  }

  const termsByPost = await getTermsForEntriesWithFallback(
    "posts",
    fallbackResult.entries.map((post) => post.data.id),
    taxonomy,
    locale,
  );

  return {
    ...fallbackResult,
    entries: fallbackResult.entries
      .filter((post) =>
        (termsByPost.get(post.data.id) ?? []).some(
          (term) => term.slug === termSlug,
        ),
      )
      .slice(0, limit),
    nextCursor: undefined,
    hasMore: false,
  };
}
