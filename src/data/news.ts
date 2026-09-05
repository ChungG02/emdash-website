export interface NewsItem {
  title: string;
  description: string;
  image: string;
  fallbackImage: string;
  alt: string;
  href?: string;
  date?: string;
}

export const newsItems: NewsItem[] = [
  {
    title: "Thông tin sản xuất và vật tư đóng gói",
    description:
      "Cập nhật hoạt động sản xuất, giải pháp đóng gói và những sản phẩm mới từ Thái Sơn Plastic.",
    image: "/images/banners/thong-tin-san-xuat-va-vat-tu-dong-goi.png",
    fallbackImage: "/images/banners/banner1.png",
    alt: "Tin tức sản xuất và đóng gói công nghiệp",
  },
  {
    title: "Kiến thức lựa chọn băng dính công nghiệp",
    description:
      "Những tiêu chí quan trọng giúp doanh nghiệp chọn đúng loại băng dính cho từng nhu cầu.",
    image: "/images/banners/cach-lua-chon-bang-dinh-cong-nghiep.png",
    fallbackImage: "/images/banners/banner2.png",
    alt: "Kiến thức băng dính công nghiệp",
  },
  {
    title: "Ứng dụng màng PE trong đóng gói hàng hóa",
    description:
      "Tìm hiểu cách màng PE bảo vệ pallet, hạn chế bụi bẩn và tối ưu quá trình vận chuyển.",
    image: "/images/banners/ung-dung-pe-trong-dong-goi.png",
    fallbackImage: "/images/banners/banner3.png",
    alt: "Ứng dụng màng PE công nghiệp",
  },
];
