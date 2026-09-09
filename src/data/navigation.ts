import type { UiMessageKey } from "../i18n/ui";

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

interface NavigationDefinition {
  labelKey: UiMessageKey;
  href: string;
  children?: NavigationDefinition[];
}

type Translate = (key: UiMessageKey) => string;

const navigationDefinitions: NavigationDefinition[] = [
  {
    labelKey: "nav.virginResin",
    href: "/#hat-nhua-nguyen-sinh",
    children: [
      { labelKey: "nav.peResin", href: "/#hat-nhua-nguyen-sinh" },
      { labelKey: "nav.ppResin", href: "/#hat-nhua-nguyen-sinh" },
      { labelKey: "nav.pvcResin", href: "/#hat-nhua-nguyen-sinh" },
      { labelKey: "nav.petResin", href: "/#hat-nhua-nguyen-sinh" },
    ],
  },
  {
    labelKey: "nav.peFilm",
    href: "/#mang-pe",
    children: [
      { labelKey: "nav.handWrapFilm", href: "/#mang-pe" },
      { labelKey: "nav.machineWrapFilm", href: "/#mang-pe" },
      { labelKey: "nav.brickWrapFilm", href: "/#mang-pe" },
      { labelKey: "nav.clearPeFilm", href: "/#mang-pe" },
      { labelKey: "nav.coloredPeFilm", href: "/#mang-pe" },
      { labelKey: "nav.customProduction", href: "/#mang-pe" },
    ],
  },
  {
    labelKey: "nav.petStrap",
    href: "/#day-dai-pet",
    children: [
      { labelKey: "nav.virginStrap", href: "/#day-dai-pet" },
      { labelKey: "nav.petStrap", href: "/#day-dai-pet" },
      { labelKey: "nav.ppStrap", href: "/#day-dai-pet" },
    ],
  },
  {
    labelKey: "nav.adhesiveTape",
    href: "/#bang-dinh",
    children: [
      { labelKey: "nav.clearTape", href: "/#bang-dinh" },
      { labelKey: "nav.cartonTape", href: "/#bang-dinh" },
      { labelKey: "nav.electricalTape", href: "/#bang-dinh" },
      { labelKey: "nav.clothTape", href: "/#bang-dinh" },
      { labelKey: "nav.paperTape", href: "/#bang-dinh" },
      { labelKey: "nav.doubleSidedTape", href: "/#bang-dinh" },
      { labelKey: "nav.foilTape", href: "/#bang-dinh" },
      { labelKey: "nav.medicalTape", href: "/#bang-dinh" },
      { labelKey: "nav.fiberglassTape", href: "/#bang-dinh" },
    ],
  },
  {
    labelKey: "nav.otherProducts",
    href: "/#san-pham-khac",
    children: [
      {
        labelKey: "nav.edgeProtector",
        href: "/product-category/thanh-nep",
      },
      {
        labelKey: "nav.bubbleWrap",
        href: "/product-category/cuon-xop-no",
      },
      // { label: "Thanh nẹp đóng pallet", href: "/#thanh-nep-goc" },
      // { label: "Nẹp góc công nghiệp", href: "/#thanh-nep-goc" },
    ],
  },
  { 
    labelKey: "nav.news",
    href: "/#tin-tuc",
    children: [
      { labelKey: "nav.aboutUs", href: "/gioi-thieu" },
      { labelKey: "nav.exportNews", href: "/posts/tin-xuat-khau" },
      { labelKey: "nav.productionInfo", href: "/posts/thong-tin-san-xuat" },
      { labelKey: "nav.recruitment", href: "/posts/tuyen-dung" },
    ],
  },
  // { label: "Sản phẩm khác", href: "#catalogue" },
  { labelKey: "nav.contact", href: "/lien-he" },
];

export const getNavigationItems = (translate: Translate): NavigationItem[] =>
  navigationDefinitions.map((item) => ({
    label: translate(item.labelKey),
    href: item.href,
    children: item.children?.map((child) => ({
      label: translate(child.labelKey),
      href: child.href,
    })),
  }));

export const isNavigationItemActive = (
  currentPath: string,
  href: string,
): boolean => {
  return href === "/" ? currentPath === "/" : false;
};
