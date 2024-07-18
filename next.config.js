module.exports = {
  images: {
    domains: ["assets.vercel.com", "cdn.shopify.com", "res.cloudinary.com"],
  },
  async rewrites() {
    return [
      { source: "/sitemap.xml", destination: "/api/sitemap" },
      {
        source: "/shop/all",
        destination: "/collections/womens",
      },
      {
        source: "/search",
        destination: "/search/all",
      },
      {
        source: "/about-us",
        destination: "/pages/about-us",
      },
      {
        source: "/terms-of-service",
        destination: "/docs/terms-of-service",
      },
      {
        source: "/privacy-policy",
        destination: "/docs/privacy-policy",
      },
      {
        source: "/services",
        destination: "/pages/enterprise-solutions",
      },
      {
        source: "/enterprise-solutions",
        destination: "/pages/enterprise-solutions",
      },
      {
        source: "/hire-an-expert",
        destination: "/pages/hire-an-expert",
      },
      {
        source: "/placement-guide",
        destination: "/docs/placement-guide",
      },
      { 
        source: "/storefronts/:store/collections",
        destination: "/storefronts/:store/collections/index",
      },
      { 
        source: "/storefronts/:store/login",
        destination: "/login"
      }
    ];
  },
};
