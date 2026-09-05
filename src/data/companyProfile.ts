import { contactSummary } from "./contact";

export interface CompanyOverviewItem {
  label: string;
  value: string;
}

export const companyProfile = {
  name: "Công ty Thái Sơn",

  pageTitle: "Giới thiệu",

  overview: [
    {
      label: "Quy mô nhà máy",
      value: "Đang cập nhật",
    },
    {
      label: "Văn phòng chính",
      value: "Thôn Vĩnh Lộc 2, xã Tây Phương, TP Hà Nội, Việt Nam.",
    },
    {
      label: "Chi nhánh",
      value: "Đang cập nhật",
    },
    {
      label: "Chứng chỉ đạt được",
      value: "Đang cập nhật",
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
    "Công ty TNHH Sản Xuất, Thương mại và XNK Thái Sơn là đơn vị chuyên sản xuất và cung cấp bao bì màng PE và vật tư đóng gói công nghiệp, phục vụ thị trường trong nước và xuất khẩu. Với bề dày hình thành và phát triển, Công ty chúng tôi đã từng bước khẳng định vị thế là nhà sản xuất màng phức hợp uy tín tại miền Bắc.",
    "Ngay từ những năm đầu hoạt động, Công ty chúng tôi đã đầu tư mở rộng nhà xưởng, máy móc và công nghệ, chuyển toàn bộ xưởng sản xuất về Hòa Lạc nhằm nâng cao năng lực sản xuất và đáp ứng tốt hơn nhu cầu ngày càng tăng của khách hàng.",
    "Công Ty XNK Thái Sơn đã không ngừng cải tiến quy trình, mở rộng quy mô và nâng cao chất lượng sản phẩm. Bao bì do Thái Sơn sản xuất hiện nay đã được sử dụng rộng rãi trên toàn quốc và theo chân nhiều doanh nghiệp xuất khẩu ra thị trường quốc tế.",
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

  contact: contactSummary,

  factoryImage: "/images/banners/gioi-thieu.png",
};