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
      { label: "Màng PE quấn tay", href: "/#mang-pe" },
      { label: "Màng PE quấn máy", href: "/#mang-pe" },
      { label: "Màng PE quấn gạch", href: "/#mang-pe" },
      { label: "Màng bọc PE trong suốt", href: "/#mang-pe" },
      { label: "Màng bọc PE màu", href: "/#mang-pe" },
      { label: "Sản xuất theo yêu cầu", href: "/#mang-pe" },
    ],
  },
  {
    label: "Dây đai PET",
    href: "/#day-dai-pet",
    children: [
      { label: "Dây đai nguyên sinh", href: "/#day-dai-pet" },
      { label: "Dây đai PET", href: "/#day-dai-pet" },
      { label: "Dây đai nhựa PP", href: "/#day-dai-pet" },
    ],
  },
  {
    label: "Băng dính",
    href: "/#bang-dinh",
    children: [
      { label: "Băng dính trong", href: "/#bang-dinh" },
      { label: "Băng dính dàn thùng carton", href: "/#bang-dinh" },
      { label: "Băng dính cách điện", href: "/#bang-dinh" },
      { label: "Băng dính vải", href: "/#bang-dinh" },
      { label: "Băng dính giấy", href: "/#bang-dinh" },
      { label: "Băng keo 2 mặt", href: "/#bang-dinh" },
      { label: "Băng dính bằng bạc", href: "/#bang-dinh" },
      { label: "Băng dính y tế", href: "/#bang-dinh" },
      { label: "Băng dính sợi thuỷ tinh", href: "/#bang-dinh" },
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
