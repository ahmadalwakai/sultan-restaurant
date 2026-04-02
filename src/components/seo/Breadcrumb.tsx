import Link from 'next/link';
import { HiChevronRight } from 'react-icons/hi';
import { generateBreadcrumbSchema, createBreadcrumbData } from '@/lib/seo/schemas/breadcrumb-schema';
import { JsonLd } from './JsonLd';

export interface BreadcrumbItem {
  name: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  // Convert to schema format
  const schemaData = generateBreadcrumbSchema({
    items: items.map(item => ({
      name: item.name,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://sultanrestaurant.co.uk'}${item.href}`,
    })),
  });

  return (
    <>
      <JsonLd data={schemaData} />
      <nav className={`flex ${className}`} aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <HiChevronRight
                  className="h-4 w-4 text-gray-400 mx-2"
                  aria-hidden="true"
                />
              )}
              {item.current ? (
                <span
                  className="text-sm font-medium text-gray-900"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

// Helper hook to generate breadcrumbs from pathname
export function useBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sultanrestaurant.co.uk';
  const breadcrumbData = createBreadcrumbData(pathname, baseUrl);

  return breadcrumbData.items.map((item, index) => ({
    name: item.name,
    href: item.url.replace(baseUrl, ''),
    current: index === breadcrumbData.items.length - 1,
  }));
}