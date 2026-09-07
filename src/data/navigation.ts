export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export const navigationItems: NavigationItem[] = [
  {
    label: "Hạt nhựa nguyên sinh",
    href: "/#hat-nhua-nguyen-sinh",
    children: [
      { label: "Hạt nhựa PE", href: "/#hat-nhua-nguyen-sinh" },
      { label: "Hạt nhựa PP", href: "/#hat-nhua-nguyen-sinh" },
      { label: "Hạt nhựa PVC", href: "/#hat-nhua-nguyen-sinh" },
      { label: "Hạt nhựa PET", href: "/#hat-nhua-nguyen-sinh" },
    ],
  },
  {
    label: "Màng quấn PE",
    href: "/#mang-pe",
    children: [
      { label: "Màng PE công nghiệp", href: "/#mang-pe" },
      { label: "Màng căng công nghiệp", href: "/#mang-pe" },
      { label: "Màng quấn pallet", href: "/#mang-pe" },
      { label: "Màng bọc PE công nghiệp", href: "/#mang-pe" },
    ],
  },
  {
    label: "Dây đai PET",
    href: "/#day-dai-pet",
    children: [
      { label: "Dây đai PET", href: "/#day-dai-pet" },
    ],
  },
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
    label: "Sản phẩm khác",
    href: "/#san-pham-khac",
    children: [
      { label: "Thanh nẹp", href: "/#thanh-nep" },
      { label: "Cuộn xốp nổ", href: "/#cuon-xop-no" },
      // { label: "Thanh nẹp đóng pallet", href: "/#thanh-nep-goc" },
      // { label: "Nẹp góc công nghiệp", href: "/#thanh-nep-goc" },
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
  // { label: "Sản phẩm khác", href: "#catalogue" },
  { label: "Liên hệ", href: "/lien-he" },
];

export const isNavigationItemActive = (
  currentPath: string,
  href: string,
): boolean => {
  return href === "/" ? currentPath === "/" : false;
};
