export interface NavigationItem {
  label: string;
  href: string;
  productCategorySlug?: string;
  children?: NavigationItem[];
}

export const navigationItems: NavigationItem[] = [
  {
    label: "Hạt nhựa nguyên sinh",
    href: "/product-category/hat-nhua-nguyen-sinh",
    productCategorySlug: "hat-nhua-nguyen-sinh",
  },
  {
    label: "Màng quấn PE",
    href: "/product-category/mang-pe",
    productCategorySlug: "mang-pe",
  },
  {
    label: "Dây đai PET",
    href: "/product-category/day-dai-pet",
    productCategorySlug: "day-dai-pet",
  },
  {
    label: "Băng dính",
    href: "/product-category/bang-dinh",
    productCategorySlug: "bang-dinh",
  },
  {
    label: "Sản phẩm khác",
    href: "/products",
    children: [
      { label: "Thanh nẹp góc chữ V", href: "/#thanh-nep-goc" },
      { label: "Nẹp giấy bảo vệ góc", href: "/#thanh-nep-goc" },
      { label: "Thanh nẹp đóng pallet", href: "/#thanh-nep-goc" },
      { label: "Nẹp góc công nghiệp", href: "/#thanh-nep-goc" },
    ],
  },
  { 
    label: "Tin tức", 
    href: "/#tin-tuc",
    children: [
      { label: "Giới thiệu về chúng tôi", href: "/gioi-thieu" },
      { label: "Tin xuất khẩu", href: "/posts/tin-xuat-khau" },
      { label: "Thông tin sản xuất", href: "/posts/thong-tin-san-xuat" },
      { label: "Tuyển dụng", href: "/posts/tuyen-dung" },
    ],
  },
  // { label: "CATALOGUE", href: "#catalogue" },
  { label: "Liên hệ", href: "/lien-he" },
];

export const isNavigationItemActive = (
  currentPath: string,
  href: string,
): boolean => {
  const hrefPath = href.split(/[?#]/, 1)[0] || "/";

  return hrefPath === "/"
    ? currentPath === "/"
    : currentPath === hrefPath || currentPath.startsWith(`${hrefPath}/`);
};
