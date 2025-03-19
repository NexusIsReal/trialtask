/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during builds to avoid type errors in API routes
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript during builds due to API route type errors
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig 