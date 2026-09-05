export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export const navigationItems: NavigationItem[] = [
  {
    label: "Băng dính",
    href: "/#bang-dinh",
    children: [
      { label: "Băng dính 2 mặt xốp", href: "/#bang-dinh" },
      { label: "Băng dính phòng sạch", href: "/#bang-dinh" },
      { label: "Băng dính sợi thủy tinh", href: "/#bang-dinh" },
      { label: "Băng dính chống tĩnh điện", href: "/#bang-dinh" },
      { label: "Băng dính lõi nhựa", href: "/#bang-dinh" },
      { label: "Băng dính điện PVC", href: "/#bang-dinh" },
      { label: "Băng dính văn phòng phẩm", href: "/#bang-dinh" },
      { label: "Băng dính nhôm", href: "/#bang-dinh" },
      { label: "Băng dính phản quang", href: "/#bang-dinh" },
      { label: "Băng dính VHB", href: "/#bang-dinh" },
      { label: "Băng dính kapton chịu nhiệt", href: "/#bang-dinh" },
      { label: "Băng dính kraft", href: "/#bang-dinh" },
      { label: "Băng dính bảo vệ bề mặt", href: "/#bang-dinh" },
      { label: "Băng dính đóng gói OPP", href: "/#bang-dinh" },
      { label: "Băng dính xuất khẩu", href: "/#bang-dinh" },
      { label: "Băng dính dán nền", href: "/#bang-dinh" },
      { label: "Băng dính simili", href: "/#bang-dinh" },
      { label: "Băng dính 2 mặt", href: "/#bang-dinh" },
      { label: "Băng dính vải", href: "/#bang-dinh" },
      { label: "Băng dính giấy", href: "/#bang-dinh" },
      { label: "Băng dính in chữ", href: "/#bang-dinh" },
      { label: "Băng dính cao su non", href: "/#bang-dinh" },
    ],
  },
  {
    label: "Hạt nhựa nguyên sinh",
    href: "/#hat-nhua-nguyen-sinh",
  },
  {
    label: "Màng quấn PE",
    href: "/#mang-pe",
  },
  {
    label: "Thanh nẹp góc",
    href: "/#thanh-nep-goc",
  },
  {
    label: "Sản phẩm khác",
    href: "/#san-pham-khac",
    children: [
      { label: "Dây đai PP, PET", href: "/#san-pham-khac" },
      { label: "Túi PE, HDPE, PP, LDPE", href: "/#san-pham-khac" },
      { label: "Thùng Carton", href: "/#san-pham-khac" },
      { label: "Ống giấy, ống lõi", href: "/#san-pham-khac" },
      { label: "Màng POF, PVC, PE", href: "/#san-pham-khac" },
    ],
  },
  { label: "Tin tức", href: "/#tin-tuc" },
  // { label: "CATALOGUE", href: "#catalogue" },
  { label: "Liên hệ", href: "/lien-he" },
];

export const isNavigationItemActive = (
  currentPath: string,
  href: string,
): boolean => {
  return href === "/" ? currentPath === "/" : false;
};
