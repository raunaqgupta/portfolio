// Type definitions for the portfolio site

export interface Breadcrumb {
  text: string;
  url: string;
}

export interface Action {
  label: string;
  url: string;
  isExternal?: boolean;
}

export interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  robots?: string;
  canonicalUrl?: string;
}

export interface PageProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: Action[];
  robots?: string;
  seoImage?: string;
  seoType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}
