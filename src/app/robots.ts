import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/mypage/',
    },
    sitemap: 'https://dothemeet.vercel.app/sitemap.xml',
  };
}
