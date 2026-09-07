import type { Product as EmDashProduct } from "../../../.emdash/types";

export interface ProductCardItem {
  name: string;
  image?: EmDashProduct["featured_image"];
  alt: string;
  href: string;
}

export interface ProductSectionData {
  id: string;
  title: string;
  alternate?: boolean;
  products: ProductCardItem[];
}