export interface HeroSlide {
  id: number;
  image: string;
  alt: string;
  href?: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/images/banners/banner1.png",
    alt: "Sản phẩm và nhà máy Công ty Thái Sơn",
    href: "#bang-dinh",
  },
  {
    id: 2,
    image: "/images/banners/banner2.png",
    alt: "Các sản phẩm vật tư đóng gói",
    href: "#mang-pe",
  },
  {
    id: 3,
    image: "/images/banners/banner3.png",
    alt: "Giải pháp đóng gói công nghiệp",
    href: "#lien-he",
  },
];
