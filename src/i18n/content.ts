import {
  getEmDashCollection,
  getEmDashEntry,
  getTermsForEntries,
  type CollectionFilter,
  type CollectionResult,
  type EntryResult,
  type InferCollectionData,
} from "emdash";
import { DEFAULT_UI_LOCALE, type UiLocale } from "./ui";

/**
 * Collection queries are intentionally strict per locale in EmDash. Keep a
 * localized listing useful while its first translations are being authored by
 * falling back to the Vietnamese collection only when the requested locale is
 * completely empty.
 */
export async function getCollectionWithFallback<
  T extends string,
  D = InferCollectionData<T>,
>(
  collection: T,
  filter: CollectionFilter & { locale: UiLocale },
): Promise<CollectionResult<D>> {
  const localized = await getEmDashCollection<T, D>(collection, filter);

  if (
    localized.error ||
    localized.entries.length > 0 ||
    filter.locale === DEFAULT_UI_LOCALE
  ) {
    return localized;
  }

  return getEmDashCollection<T, D>(collection, {
    ...filter,
    locale: DEFAULT_UI_LOCALE,
  });
}

const isMissingLiveEntry = (error: Error | undefined) =>
  error?.name === "LiveEntryNotFoundError" ||
  error?.message.includes("was not found") === true;

/**
 * EmDash 0.36 can surface a locale miss as LiveEntryNotFoundError before its
 * internal fallback chain advances. Treat only that error as a miss and retry
 * the Vietnamese entry; real loader/database errors still propagate.
 */
export async function getEntryWithFallback<
  T extends string,
  D = InferCollectionData<T>,
>(
  collection: T,
  id: string,
  locale: UiLocale,
): Promise<EntryResult<D>> {
  const localized = await getEmDashEntry<T, D>(collection, id, { locale });

  if (
    localized.entry ||
    locale === DEFAULT_UI_LOCALE ||
    (localized.error && !isMissingLiveEntry(localized.error))
  ) {
    return localized;
  }

  const fallback = await getEmDashEntry<T, D>(collection, id, {
    locale: DEFAULT_UI_LOCALE,
  });

  return fallback.entry
    ? { ...fallback, fallbackLocale: DEFAULT_UI_LOCALE }
    : fallback;
}

/**
 * Keep translated content attached to its Vietnamese taxonomy until an admin
 * also adds translated taxonomy labels. A locale-specific term wins whenever
 * it exists.
 */
export async function getTermsForEntriesWithFallback(
  collection: string,
  entryIds: string[],
  taxonomyName: string,
  locale: UiLocale,
) {
  const localized = await getTermsForEntries(
    collection,
    entryIds,
    taxonomyName,
    { locale },
  );

  if (locale === DEFAULT_UI_LOCALE) return localized;

  const missingIds = entryIds.filter(
    (entryId) => (localized.get(entryId) ?? []).length === 0,
  );
  if (missingIds.length === 0) return localized;

  const fallback = await getTermsForEntries(
    collection,
    missingIds,
    taxonomyName,
    { locale: DEFAULT_UI_LOCALE },
  );

  for (const entryId of missingIds) {
    const terms = fallback.get(entryId) ?? [];
    if (terms.length > 0) localized.set(entryId, terms);
  }

  return localized;
}
