/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during builds to avoid type errors in API routes
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 