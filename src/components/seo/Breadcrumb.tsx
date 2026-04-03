import Link from 'next/link';
import { HiChevronRight } from 'react-icons/hi';
import { Flex, Text } from '@chakra-ui/react';
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
      <Flex as="nav" className={className} aria-label="Breadcrumb">
        <Flex as="ol" align="center" gap={2}>
          {items.map((item, index) => (
            <Flex as="li" key={item.href} align="center">
              {index > 0 && (
                <HiChevronRight
                  className="h-4 w-4 text-gray-400 mx-2"
                  aria-hidden="true"
                />
              )}
              {item.current ? (
                <Text
                  as="span"
                  fontSize="sm"
                  fontWeight="medium"
                  color="gray.900"
                  aria-current="page"
                >
                  {item.name}
                </Text>
              ) : (
                <Link href={item.href}>
                  <Text
                    fontSize="sm"
                    color="gray.500"
                    _hover={{ color: "gray.700" }}
                    transition="colors 0.2s"
                  >
                    {item.name}
                  </Text>
                </Link>
              )}
            </Flex>
          ))}
        </Flex>
      </Flex>
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