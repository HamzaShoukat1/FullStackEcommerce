import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },

  // // Explicitly assign your workspace root directory
  // turbopack: {
  //   root: path.resolve(__dirname, "../../"),
  // },
};

export default nextConfig;
