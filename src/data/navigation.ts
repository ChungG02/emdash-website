import type { UiMessageKey } from "../i18n/ui";

export interface NavigationItem {
  label: string;
  href: string;
  disabled?: boolean;
  children?: NavigationItem[];
}

interface NavigationDefinition {
  labelKey: UiMessageKey;
  href: string;
  disabled?: boolean;
  children?: NavigationDefinition[];
}

type Translate = (key: UiMessageKey) => string;

const navigationDefinitions: NavigationDefinition[] = [
  {
    labelKey: "nav.virginResin",
    href: "/product-category/hat-nhua-nguyen-sinh",
    children: [
      { labelKey: "nav.peResin", href: "/products/hat-nhua-pe" },
      { labelKey: "nav.ppResin", href: "/products/hat-nhua-pp" },
      { labelKey: "nav.petResin", href: "/products/hat-nhua-pet" },
      { labelKey: "nav.pvcResin", href: "/products/hat-nhua-pvc" },
    ],
  },
  {
    labelKey: "nav.peFilm",
    href: "/product-category/mang-quan-pe",
    children: [
      { labelKey: "nav.handWrapFilm", href: "/products/mang-pe-quan-tay" },
      { labelKey: "nav.machineWrapFilm", href: "/products/mang-pe-quan-may" },
      { labelKey: "nav.brickWrapFilm", href: "/products/mang-pe-quan-gach" },
      {
        labelKey: "nav.clearPeFilm",
        href: "/products/mang-boc-pe-trong-suot",
      },
      { labelKey: "nav.coloredPeFilm", href: "/products/mang-boc-pe-mau" },
      { labelKey: "nav.customProduction", href: "#", disabled: true },
    ],
  },
  {
    labelKey: "nav.petStrap",
    href: "/product-category/day-pet",
    children: [
      { labelKey: "nav.virginStrap", href: "/products/day-dai-nguyen-sinh" },
      { labelKey: "nav.ppStrap", href: "/products/day-dai-nhua-pp" },
      { labelKey: "nav.petStrap", href: "/products/day-dai-pet" },
    ],
  },
  {
    labelKey: "nav.adhesiveTape",
    href: "/product-category/bang-dinh",
    children: [
      { labelKey: "nav.clearTape", href: "/products/bang-dinh-trong" },
      {
        labelKey: "nav.cartonTape",
        href: "/products/bang-dinh-dan-thung-carton",
      },
      {
        labelKey: "nav.electricalTape",
        href: "/products/bang-dinh-cach-dien",
      },
      { labelKey: "nav.clothTape", href: "/products/bang-dinh-vai" },
      { labelKey: "nav.paperTape", href: "/products/bang-dinh-giay" },
      { labelKey: "nav.doubleSidedTape", href: "/products/bang-keo-2-mat" },
      { labelKey: "nav.foilTape", href: "/products/bang-dinh-bac" },
      { labelKey: "nav.medicalTape", href: "/products/bang-dinh-y-te" },
      {
        labelKey: "nav.fiberglassTape",
        href: "/products/bang-dinh-soi-thuy-tinh",
      },
    ],
  },
  {
    labelKey: "nav.otherProducts",
    href: "/#san-pham-khac",
    children: [
      { labelKey: "nav.edgeProtector", href: "/#thanh-nep" },
      { labelKey: "nav.bubbleWrap", href: "/#cuon-xop-no" },
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
      disabled: child.disabled,
    })),
  }));

export const isNavigationItemActive = (
  currentPath: string,
  href: string,
): boolean => {
  return href === "/" ? currentPath === "/" : false;
};
