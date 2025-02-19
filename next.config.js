/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  typescript: {
    ignoreBuildErrors: true, 
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
    images: {
      domains: ['cdn.sanity.io'],
    },
  };
  
  module.exports = nextConfig;
  