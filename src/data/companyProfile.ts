export interface CompanyOverviewItem {
  label: string;
  value: string;
  emphasizeValue?: boolean;
}

export type CompanyProfileParagraph =
  | string
  | {
      before: string;
      emphasis: string;
      after?: string;
    };

export interface CompanyProfileSection {
  id: string;
  title?: string;
  paragraphs?: CompanyProfileParagraph[];
  details?: CompanyOverviewItem[];
  bullets?: string[];
  highlight?: string;
}

export interface CompanyProfile {
  name: string;
  pageTitle: string;
  overview: CompanyOverviewItem[];
  introduction: CompanyProfileSection[];
  motto: string;
  products: string[];
  factoryImage: string;
}

export const companyProfile: CompanyProfile = {
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
    {
      id: "gioi-thieu-chung",
      paragraphs: [
        {
          before: "",
          emphasis: "Công ty TNHH SXTM và XNK Thái Sơn",
          after:
            " hoạt động trong lĩnh vực sản xuất và cung cấp các giải pháp bao bì phục vụ nhu cầu đóng gói, bảo quản và vận chuyển hàng hóa. Với định hướng đầu tư bài bản vào công nghệ, máy móc và đội ngũ nhân sự, Thái Sơn không ngừng hoàn thiện năng lực sản xuất nhằm mang đến những sản phẩm ổn định, phù hợp với yêu cầu thực tế của khách hàng.",
        },
        "Chúng tôi cung cấp các sản phẩm bao bì màng PE, vật tư đóng gói và giải pháp hỗ trợ doanh nghiệp tối ưu quy trình đóng kiện, lưu kho và vận chuyển hàng hóa.",
      ],
    },
    {
      id: "thong-tin-doanh-nghiep",
      title: "Thông tin doanh nghiệp",
      // details: [
      //   {
      //     label: "Tên doanh nghiệp",
      //     value: "Công ty TNHH SXTM và XNK Thái Sơn",
      //     emphasizeValue: true,
      //   },
      //   {
      //     label: "Trụ sở chính",
      //     value: "Thôn Vĩnh Lộc 2, xã Tây Phương, TP. Hà Nội, Việt Nam",
      //   },
      // ],
      paragraphs: [
        "Ngay từ những năm đầu hoạt động, Thái Sơn đã chú trọng đầu tư mở rộng nhà xưởng, đổi mới máy móc và ứng dụng công nghệ vào sản xuất. Việc tập trung hoạt động sản xuất tại khu vực Hòa Lạc giúp công ty từng bước nâng cao năng lực đáp ứng, chủ động tiến độ và phục vụ tốt hơn nhu cầu ngày càng đa dạng của khách hàng.",
        "Các sản phẩm bao bì do Thái Sơn cung cấp hiện được sử dụng tại nhiều doanh nghiệp trên toàn quốc, đồng hành cùng khách hàng trong hoạt động sản xuất, đóng gói và xuất khẩu hàng hóa.",
      ],
    },
    {
      id: "tam-nhin",
      title: "Tầm nhìn",
      paragraphs: [
        "Thái Sơn hướng tới trở thành doanh nghiệp sản xuất bao bì nhựa uy tín tại Việt Nam, được khách hàng và đối tác lựa chọn nhờ chất lượng sản phẩm ổn định, dịch vụ chuyên nghiệp và năng lực đáp ứng linh hoạt.",
      ],
    },
    {
      id: "su-menh",
      title: "Sứ mệnh",
      paragraphs: [
        "Chúng tôi xác định sứ mệnh của mình là mang đến các giải pháp bao bì phù hợp, hiệu quả và bền vững cho doanh nghiệp thông qua:",
      ],
      bullets: [
        "Không ngừng cải tiến công nghệ và kỹ thuật sản xuất.",
        "Nâng cao chất lượng sản phẩm, tối ưu chi phí cho khách hàng.",
        "Đáp ứng linh hoạt yêu cầu về quy cách, số lượng và tiến độ giao hàng.",
        "Xây dựng môi trường làm việc ổn định, phát triển năng lực cho đội ngũ cán bộ công nhân viên.",
        "Hướng tới các sản phẩm và giải pháp đóng gói thân thiện hơn với môi trường.",
      ],
    },
    {
      id: "dinh-huong-phat-trien",
      title: "Định hướng phát triển",
      paragraphs: [
        "Từ năm 2025, Thái Sơn đẩy mạnh chiến lược mở rộng năng lực sản xuất, đầu tư công nghệ mới và nâng cao hiệu quả vận hành. Công ty tập trung vào các mục tiêu:",
      ],
      bullets: [
        "Tăng năng lực đáp ứng đơn hàng và rút ngắn thời gian cung ứng.",
        "Cải tiến chất lượng sản phẩm, kiểm soát độ ổn định giữa các lô hàng.",
        "Tối ưu chi phí sản xuất để mang đến mức giá cạnh tranh.",
        "Thúc đẩy hợp tác với các doanh nghiệp có nhu cầu xuất khẩu.",
        "Góp phần tạo việc làm và phát triển kinh tế – xã hội tại địa phương.",
      ],
    },
    {
      id: "quy-mo-nha-xuong-va-nhan-su",
      title: "Quy mô nhà xưởng và nhân sự",
      paragraphs: [
        {
          before: "Thái Sơn sở hữu nhà xưởng có diện tích hơn ",
          emphasis: "1.000 m²",
          after: ", được đầu tư dây chuyền sản xuất theo hướng đồng bộ và hiện đại.",
        },
        "Đội ngũ nhân sự gồm kỹ thuật viên, công nhân lành nghề và bộ phận tư vấn bán hàng có kinh nghiệm trong lĩnh vực bao bì, luôn sẵn sàng hỗ trợ khách hàng từ khâu lựa chọn sản phẩm đến triển khai đơn hàng.",
        "Công ty áp dụng phương pháp quản lý 5S nhằm duy trì môi trường sản xuất ngăn nắp, nâng cao hiệu quả vận hành và kiểm soát chất lượng sản phẩm một cách nhất quán.",
      ],
    },
    {
      id: "gia-tri-cot-loi",
      title: "Giá trị cốt lõi",
      highlight: "Uy tín – Chuyên nghiệp – Chất lượng – Hiệu quả",
      paragraphs: [
        "Đây là những giá trị định hướng cho mọi hoạt động của Thái Sơn, từ sản xuất và kiểm soát chất lượng đến tư vấn, giao hàng và chăm sóc khách hàng sau bán.",
        "Chúng tôi tin rằng sự hợp tác bền vững phải được xây dựng từ sản phẩm đáp ứng đúng yêu cầu, tiến độ rõ ràng và tinh thần đồng hành lâu dài cùng khách hàng.",
      ],
    },
    {
      id: "cam-ket-cua-thai-son",
      title: "Cam kết của Thái Sơn",
      bullets: [
        "Sản phẩm có chất lượng ổn định, đáp ứng yêu cầu sử dụng thực tế.",
        "Giá thành cạnh tranh, minh bạch và phù hợp với từng quy cách đơn hàng.",
        "Cung cấp đa dạng chủng loại, kích thước và quy cách đóng gói.",
        "Chủ động nguồn hàng, hỗ trợ khách hàng giảm áp lực tồn kho khi cần.",
        "Giao hàng tận nơi, đúng tiến độ đã thống nhất.",
        "Hỗ trợ tư vấn kỹ thuật, mẫu thử và phương án sản phẩm phù hợp.",
        "Đồng hành sau bán hàng, tiếp nhận phản hồi để liên tục cải thiện chất lượng dịch vụ.",
      ],
    },
    {
      id: "vi-sao-nen-lua-chon-thai-son",
      title: "Vì sao nên lựa chọn Thái Sơn?",
      bullets: [
        "Năng lực cung ứng linh hoạt cho nhiều nhu cầu đóng gói khác nhau.",
        "Có thể cung cấp mẫu sản phẩm trước khi triển khai đơn hàng số lượng lớn.",
        "Giá bán rõ ràng, hỗ trợ xuất hóa đơn VAT theo quy định.",
        "Quy trình tư vấn và tiếp nhận đơn hàng nhanh chóng.",
        "Hỗ trợ giao hàng linh hoạt theo kế hoạch của khách hàng.",
        "Định hướng hợp tác lâu dài, lấy hiệu quả sử dụng của khách hàng làm trọng tâm.",
      ],
      paragraphs: [
        "Thái Sơn mong muốn trở thành đối tác đáng tin cậy của doanh nghiệp trong hành trình tối ưu hoạt động đóng gói, bảo quản và vận chuyển hàng hóa.",
      ],
    },
  ] satisfies CompanyProfileSection[],

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

  factoryImage: "/images/banners/gioi-thieu.png",
};
