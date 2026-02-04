export const i18n = {
  locales: ["az", "en", "ru", "tr"],
  defaultLocale: "en",
} as const;

export type Locale = (typeof i18n)["locales"][number];