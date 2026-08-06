/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/:locale(en|zh|ru)/request-a-quote",
        destination: "/:locale/contact",
        permanent: true,
      },
      {
        source: "/request-a-quote",
        destination: "/en/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
