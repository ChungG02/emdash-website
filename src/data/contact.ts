export interface ContactInformationItem {
  label: string;
  value: string;
  href?: string;
}

export interface CompanyLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  phoneHref?: string;
  email: string;
  emailHref?: string;
  mapUrl?: string;
}

export interface SocialMedia {
  facebookPageUrl?: string;
}

export const socialMedia: SocialMedia = {
  facebookPageUrl: "https://www.facebook.com/profile.php?id=61592446688107",
};

export interface MapLocation {
  id: string;
  title: string;
  address: string;
  embedUrl?: string;
}

const mainOfficeAddress =
  "Thôn Vĩnh Lộc 2, Xã Tây Phương, Thành Phố Hà Nội, Việt Nam";
const mainOfficeMapQuery = encodeURIComponent(mainOfficeAddress);

export const contactSummary: ContactInformationItem[] = [
  // {
  //   label: "Điện thoại",
  //   value: "Đang cập nhật",
  // },
  {
    label: "Hotline",
    value: "0965 190 888",
    href: "tel:0965190888",
  },
  {
    label: "Email",
    value: "info@thaisonplastic.com",
  },
];

export const companyLocations: CompanyLocation[] = [
  {
    id: "main-office",
    name: "Văn phòng chính",
    address: mainOfficeAddress,
    phone: "0965 190 888",
    phoneHref: "tel:0965190888",
    email: "info@thaisonplastic.com",
    mapUrl: `https://www.google.com/maps/search/?api=1&query=${mainOfficeMapQuery}`,
  },
  {
    id: "branch-office",
    name: "Chi nhánh",
    address: "Đang cập nhật",
    phone: "Đang cập nhật",
    email: "Đang cập nhật",
  },
  {
    id: "factory",
    name: "Nhà máy",
    address: "Đang cập nhật",
    phone: "Đang cập nhật",
    email: "Đang cập nhật",
  },
];

export const mapLocations: MapLocation[] = [
  {
    id: "main-office-map",
    title: "Văn phòng chính",
    address: mainOfficeAddress,
    embedUrl: `https://www.google.com/maps?q=${mainOfficeMapQuery}&output=embed`,
  },
];

// Compatibility export used by the existing EmDash product detail components.
export const contactInfo = {
  hotline: {
    label: "Hotline",
    display: "096 519 08 88",
    href: "tel:0965190888",
  },
} as const;
