import Head from 'next/head';

export interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  structuredData?: Record<string, any>[];
}

export function SEOHead({
  title,
  description,
  canonical,
  ogImage = '/images/og/default.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  keywords = [],
  author,
  publishedTime,
  modifiedTime,
  section,
  tags,
  noindex = false,
  structuredData,
}: SEOHeadProps) {
  const fullTitle = title.includes('Sultan Restaurant')
    ? title
    : `${title} | Sultan Restaurant`;

  const metaDescription = description.length > 160
    ? `${description.substring(0, 157)}...`
    : description;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords.join(', ')} />
      {author && <meta name="author" content={author} />}
      {section && <meta name="article:section" content={section} />}
      {publishedTime && <meta name="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta name="article:modified_time" content={modifiedTime} />}
      {tags && tags.map(tag => (
        <meta key={tag} name="article:tag" content={tag} />
      ))}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Sultan Restaurant" />
      {canonical && <meta property="og:url" content={canonical} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Structured Data */}
      {structuredData && structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data),
          }}
        />
      ))}
    </Head>
  );
}