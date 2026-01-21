/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    appDir: true, // nécessaire si tu utilises l'App Router
  },
};

module.exports = nextConfig;