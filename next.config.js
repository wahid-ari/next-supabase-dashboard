module.exports = {
  // TODO Docs https://vercel.com/guides/how-to-enable-cors#enabling-cors-in-a-next.js-app
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  env: {
    // API_ROUTE: "http://localhost:3000",
  },
  reactStrictMode: true,
  images: {
    // https://nextjs.org/docs/pages/api-reference/components/image#domains
    // domains: ['images-na.ssl-images-amazon.com', 'i.gr-assets.com', 'images.unsplash.com'],
    // https://nextjs.org/docs/pages/api-reference/components/image#remotepatterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'i.gr-assets.com',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
};
