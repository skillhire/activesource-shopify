module.exports = {
  images: {
    domains: ["assets.vercel.com", "cdn.shopify.com", "res.cloudinary.com"],
  },
  async rewrites() {
    return [
      { source: "/sitemap.xml", destination: "/api/sitemap" },
      {
        source: "/search",
        destination: "/search/all",
      },
    ];
  },
};
