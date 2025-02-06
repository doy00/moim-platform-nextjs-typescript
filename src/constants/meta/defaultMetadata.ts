import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  metadataBase:
    process.env.NEXT_PUBLIC_RUN_MODE === 'development'
      ? new URL('http://localhost:3000')
      : new URL('https://dothemeet.vercel.app'),
  title: 'dothemeet',
  description: 'dothemeet',
  generator: 'Next.js',
  applicationName: 'dothemeet',
  keywords: ['dothemeet'],
  authors: [{ name: 'dothemeet', url: 'https://dothemeet.vercel.app' }],
  creator: 'dothemeet',
  publisher: 'dothemeet',
  alternates: {
    canonical: '/',
    languages: {
      'ko-KR': '/',
    },
  },
  openGraph: {
    title: 'dothemeet',
    description: 'dothemeet',
    url: 'https://dothemeet.vercel.app',
    siteName: 'dothemeet',
    images: [
      {
        url: '/images/img_thumbnail.webp',
        width: 800,
        height: 600,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    },
  },
  icons: {
    icon: '/favicons/favicon.ico',
    shortcut: '/favicons/favicon.ico',
    apple: '/favicons/favicon.ico',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/favicons/apple-touch-icon.png',
    },
  },
};
