export interface LanguageOption {
  code: "vi" | "en" | "zh";
  label: string;
  href: string;
}

export const languages: LanguageOption[] = [
  {
    code: "vi",
    label: "Tiếng Việt",
    href: "/",
  },
  {
    code: "en",
    label: "English",
    href: "/en",
  },
  {
    code: "zh",
    label: "中文",
    href: "/zh",
  },
];