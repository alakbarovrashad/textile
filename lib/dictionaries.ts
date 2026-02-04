import "server-only";
import type { Locale } from "@/i18n";

const dictionaries = {
  az: () => import("@/dictionaries/az.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  ru: () => import("@/dictionaries/ru.json").then((m) => m.default),
  tr: () => import("@/dictionaries/ru.json").then((m) => m.default),
} as const;

export async function getDictionary(locale: Locale) {
  const dictLoader = dictionaries[locale] ?? dictionaries.en;
  return dictLoader();
}
