import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
}

export function SEO({ title, description, canonical }: SEOProps) {
  const siteTitle = 'CoolifyStarter';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
  const currentUrl = canonical || `https://yourdomain.com${window.location.pathname}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />
      
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fm=avif&fit=crop&q=80&w=1200&h=630" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fm=avif&fit=crop&q=80&w=1200&h=630" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
