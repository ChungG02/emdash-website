import { contactSummary } from "./contact";

export interface CompanyOverviewItem {
  label: string;
  value: string;
}

export const companyProfile = {
  name: "CÔNG TY TNHH SẢN XUẤT THƯƠNG MẠI VÀ XUẤT NHẬP KHẨU THÁI SƠN",

  pageTitle: "Giới thiệu",

  overview: [
    {
      label: "Số đăng ký kinh doanh",
      value: "0111184458 – Sở Kế hoạch & Đầu Tư TP Hà Nội cấp lần đầu ngày 19/08/2025",
    },
    {
      label: "Trụ sở chính",
      value: "Thôn Vĩnh Lộc 2, xã Tây Phương, TP Hà Nội, Việt Nam.",
    },
    {
      label: "Hotline",
      value: "0965 190 888",
    },
    {
      label: "Email",
      value: "info@thaisonplastic.com",
    },
    {
      label: "Quy mô nhân sự",
      value: "Đang cập nhật",
    },
    {
      label: "Thời gian hoạt động",
      value: "Đang cập nhật",
    },
  ] satisfies CompanyOverviewItem[],

  introduction: [
    
  ],

  motto:
    "Trung thực – Uy tín – Chính xác – Tận tâm – Trách nhiệm",

  products: [
    "Các loại băng dính",
    "Màng quấn và màng co PE",
    "Hạt chống ẩm",
    "Túi PE, HDPE, PP và LDPE",
    "Thanh nẹp góc",
    "Dây đai PP và PET",
  ],

  // contact: contactSummary,

  factoryImage: "/images/banners/gioi-thieu.png",
};