export interface BreadcrumbProps {
  pageName: string;
  pageDescription?: string;
  badge?: string;
  badgeIcon?: string;
}

export interface BreadcrumbLink {
  href: string;
  text: string;
}