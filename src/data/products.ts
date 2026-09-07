import type { MediaValue } from "emdash";

export interface Product {
  name: string;
  image: string | MediaValue;
  alt: string;
  fallbackImage: string;
  href?: string;
  objectPosition?: string;
}

export interface ProductSectionData {
  id: string;
  title: string;
  alternate?: boolean;
  products: Product[];
}

const screenshot = (url: string) =>
  `https://image.thum.io/get/width/650/crop/650/noanimate/${url}`;

const productSectionData: ProductSectionData[] = [
  {
    id: "bang-dinh",
    title: "BĂNG DÍNH",
    products: [
      {
        name: "Băng Dính Siêu Dính 2 Mặt VHB",
        image: '/images/products/bang-dinh-2-mat-vhb.png',
        alt: "Băng dính siêu dính hai mặt VHB",
        fallbackImage: "/images/banners/banner2.png",
        objectPosition: "18% center",
      },
      {
        name: "Băng Dính Fleece Tape",
        image: '/images/products/bang-dinh-fleece-tape.png',
        alt: "Băng dính Fleece Tape",
        fallbackImage: "/images/banners/banner1.png",
        objectPosition: "39% center",
      },
      {
        name: "Băng Dính Dán Bạt",
        image: '/images/products/bang-dinh-dan-bat.png',
        alt: "Băng dính dán bạt công nghiệp",
        fallbackImage: "/images/banners/banner2.png",
        objectPosition: "12% center",
      },
      {
        name: "Băng Dính Giấy Washi",
        image: "/images/products/bang-keo-giay.webp",
        alt: "Băng dính giấy Washi",
        fallbackImage: "/images/banners/banner2.png",
        objectPosition: "25% center",
      },
      {
        name: "Băng Dính Che Sơn",
        image: "/images/products/bang-keo-che-son.webp",
        alt: "Băng dính che sơn",
        fallbackImage: "/images/banners/banner1.png",
        objectPosition: "43% center",
      },
      {
        name: "Băng Dính Vải Công Nghiệp",
        image: "/images/products/bang-keo-vai-nhieu-mau.jpg",
        alt: "Băng dính vải công nghiệp",
        fallbackImage: "/images/banners/banner2.png",
        objectPosition: "30% center",
      },
      {
        name: "Băng Dính 2 Mặt Công Nghiệp",
        image: "/images/products/bang-keo-2-mat-trang-dau.webp",
        alt: "Băng dính hai mặt công nghiệp",
        fallbackImage: "/images/banners/banner2.png",
        objectPosition: "8% center",
      },
      {
        name: "Băng Dính Đóng Gói OPP",
        image: "/images/products/bang-dinh-opp.png",
        alt: "Băng dính đóng gói OPP",
        fallbackImage: "/images/banners/banner1.png",
        objectPosition: "34% center",
      },
    ],
  },
  {
    id: "hat-nhua-nguyen-sinh",
    title: "HẠT NHỰA NGUYÊN SINH",
    alternate: true,
    products: [
      {
        name: "Hạt nhựa PE",
        image: "/images/products/hat-nhua-pe.png",
        alt: "Hạt nhựa PE",
        fallbackImage: "/images/banners/banner2.png",
        objectPosition: "48% 78%",
      },
      {
        name: "Hạt nhựa PP",
        image: "/images/products/hat-nhua-pp.png",
        alt: "Hạt nhựa PP",
        fallbackImage: "/images/banners/banner2.png",
        objectPosition: "50% 82%",
      },
      {
        name: "Hạt nhựa PVC",
        image: "/images/products/hat-nhua-pvc.png",
        alt: "Hạt nhựa PVC",
        fallbackImage: "/images/banners/banner2.png",
        objectPosition: "45% 76%",
      },
      {
        name: "Hạt nhựa PET",
        image: "/images/products/hat-nhua-pet.png",
        alt: "Hạt nhựa PET",
        fallbackImage: "/images/banners/banner3.png",
        objectPosition: "78% center",
      },
    ],
  },
  {
    id: "mang-pe",
    title: "MÀNG QUẤN PE",
    products: [
      {
        name: "Màng PE Công Nghiệp",
        image: "/images/products/mang-pe-quan-hang.png",
        alt: "Màng PE công nghiệp",
        fallbackImage: "/images/banners/banner1.png",
        objectPosition: "76% center",
      },
      {
        name: "Màng Căng Công Nghiệp",
        image: "/images/products/mang-quan-cong-nghiep.png",
        alt: "Màng căng công nghiệp",
        fallbackImage: "/images/banners/banner1.png",
        objectPosition: "83% center",
      },
      {
        name: "Màng Quấn Pallet",
        image: "/images/banners/banner3.png",
        alt: "Màng quấn bảo vệ pallet",
        fallbackImage: "/images/banners/banner3.png",
        objectPosition: "28% center",
      },
      {
        name: "Màng Bọc PE Công Nghiệp",
        image: "/images/banners/banner2.png",
        alt: "Màng bọc PE công nghiệp",
        fallbackImage: "/images/banners/banner2.png",
        objectPosition: "35% center",
      },
    ],
  },
  {
    id: "thanh-nep-goc",
    title: "THANH NẸP GÓC",
    alternate: true,
    products: [
      {
        name: "Thanh Nẹp Góc Chữ V",
        image: "/images/products/thanh-nep-goc-chu-v.png",
        alt: "Thanh nẹp góc chữ V",
        fallbackImage: "/images/banners/banner2.png",
        objectPosition: "72% 90%",
      },
      {
        name: "Nẹp Giấy Bảo Vệ Góc",
        image: "/images/products/nep-giay-bao-ve-goc.png",
        alt: "Nẹp giấy bảo vệ góc",
        fallbackImage: "/images/banners/banner2.png",
        objectPosition: "75% 88%",
      },
      {
        name: "Thanh Nẹp Đóng Pallet",
        image: "/images/products/thanh-nep-goc-chu-pallet.png",
        alt: "Thanh nẹp đóng pallet",
        fallbackImage: "/images/banners/banner3.png",
        objectPosition: "30% center",
      },
      {
        name: "Nẹp Góc Công Nghiệp",
        image: "/images/products/thanh-nep-goc-cong-nghiep.png",
        alt: "Nẹp góc công nghiệp",
        fallbackImage: "/images/banners/banner3.png",
        objectPosition: "22% center",
      },
    ],
  },
  {
    id: "day-dai-pet",
    title: "DÂY ĐAI PET",
    products: [
      {
        name: "Dây Đai PET",
        image: "/images/products/day-dai-pp-pet.png",
        alt: "Dây đai PET",
        fallbackImage: "/images/banners/banner2.png",
        objectPosition: "62% center",
      },
    ],
  },
];

const productSectionOrder = [
  "hat-nhua-nguyen-sinh",
  "mang-pe",
  "day-dai-pet",
  "bang-dinh",
  "thanh-nep-goc",
] as const;

export const productSections: ProductSectionData[] = productSectionOrder.map(
  (id, index) => {
    const section = productSectionData.find((item) => item.id === id);

    if (!section) {
      throw new Error(`Không tìm thấy nhóm sản phẩm: ${id}`);
    }

    return {
      ...section,
      alternate: index % 2 === 1,
    };
  },
);
