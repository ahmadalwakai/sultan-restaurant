// Breadcrumb schema types
interface BreadcrumbListItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item: string;
}

interface BreadcrumbList {
  '@context': string;
  '@type': 'BreadcrumbList';
  itemListElement: BreadcrumbListItem[];
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface BreadcrumbData {
  items: BreadcrumbItem[];
}

export function generateBreadcrumbSchema(data: BreadcrumbData): BreadcrumbList {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: data.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Helper function to create breadcrumb data from URL path
export function createBreadcrumbData(pathname: string, baseUrl: string): BreadcrumbData {
  const pathSegments = pathname.split('/').filter(Boolean);
  const items: BreadcrumbItem[] = [
    { name: 'Home', url: baseUrl }
  ];

  let currentPath = baseUrl;
  pathSegments.forEach(segment => {
    currentPath += `/${segment}`;
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    items.push({ name, url: currentPath });
  });

  return { items };
}