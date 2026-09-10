import type { UiLocale } from "../i18n/ui";

export interface LanguageOption {
  code: UiLocale;
  label: string;
}

export const languages: LanguageOption[] = [
  {
    code: "vi",
    label: "Tiếng Việt",
  },
  {
    code: "en",
    label: "English",
  },
  {
    code: "zh",
    label: "中文",
  },
];
