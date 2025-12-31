/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
  // For production optimization
  output: 'standalone',
  images: {
    domains: ['localhost'],
    unoptimized: true, // For Docker deployments
  },
  typescript: {
    // Allow production builds to successfully complete even with type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Allow production builds to successfully complete even with ESLint errors
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig




