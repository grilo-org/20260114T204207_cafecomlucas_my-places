import nextPWA from 'next-pwa'
const isProd = process.env.NODE_ENV === 'production'

const withPWA = nextPWA({
  dest: 'public',
  disable: !isProd
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'us-west-2.graphassets.com'
      }
    ]
  }
}

export default withPWA(nextConfig)
