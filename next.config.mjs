/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables React strict mode for better debugging
  swcMinify: true, // Enables SWC-based minification for faster builds
  images: {
    domains: ["cdn.builder.io"], // Allows images from 'example.com' to be optimized
  },
  webpack: (config, { isServer }) => {
    // Custom Webpack configuration
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, // Example: Disable 'fs' module on client-side
      };
    }
    return config;
  },
  env: {
    CUSTOM_API_URL: process.env.CUSTOM_API_URL, // Example: Set environment variables
  },
};

export default nextConfig;
