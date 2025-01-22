import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['sprint-fe-project.s3.ap-northeast-2.amazonaws.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*', // 클라이언트에서 요청하는 경로
        destination: 'http://54.180.32.63:8080/:path*', // 백엔드 서버 주소
      },
    ];
  },
};

export default nextConfig;
