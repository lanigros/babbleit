/** @type {import('next').NextConfig} */
module.exports = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  i18n: {
    locales: ['en-us'],
    defaultLocale: 'en-us'
  },
  images: {
    domains: []
  },
  async rewrites() {
    return [
      {
        source: '/api/:path',
        destination: 'http://localhost:8000/api/:path'
      }
    ]
  }
}
