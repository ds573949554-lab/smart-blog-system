/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // 警告：这会在构建时忽略ESLint错误
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 警告：这会在构建时忽略TypeScript错误
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
