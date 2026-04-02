import { ReactNode } from 'react';

interface JsonLdProps {
  data: Record<string, any>;
  children?: ReactNode;
}

export function JsonLd({ data, children }: JsonLdProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data, null, 2),
        }}
      />
      {children}
    </>
  );
}

// Helper component for multiple structured data objects
interface StructuredDataProps {
  schemas: Record<string, any>[];
  children?: ReactNode;
}

export function StructuredData({ schemas, children }: StructuredDataProps) {
  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}
      {children}
    </>
  );
}