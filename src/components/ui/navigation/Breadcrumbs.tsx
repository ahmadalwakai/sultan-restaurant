"use client";

import { Breadcrumb, Text } from "@chakra-ui/react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        {items.map((item, i) => (
          <Breadcrumb.Item key={i}>
            {item.href ? (
              <Breadcrumb.Link asChild>
                <Link href={item.href}>{item.label}</Link>
              </Breadcrumb.Link>
            ) : (
              <Breadcrumb.CurrentLink>
                <Text>{item.label}</Text>
              </Breadcrumb.CurrentLink>
            )}
            {i < items.length - 1 && <Breadcrumb.Separator />}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}
