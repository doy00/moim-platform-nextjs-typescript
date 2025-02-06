import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://dothemeet.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://dothemeet.vercel.app/auth/signin',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.1,
    },
    {
      url: 'https://dothemeet.vercel.app/auth/signup',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.1,
    },
    {
      url: 'https://dothemeet.vercel.app/detail',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.3,
    },
    {
      url: 'https://dothemeet.vercel.app/favorites',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: 'https://dothemeet.vercel.app/make',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.1,
    },
    {
      url: 'https://dothemeet.vercel.app/mypage',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.4,
    },
    {
      url: 'https://dothemeet.vercel.app/mylike',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ];
}
