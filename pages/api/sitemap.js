import { initApollo } from "apollo/client";
import { QUERY_PRODUCTS } from "graphql/shopify/products";
import { QUERY_COLLECTIONS } from "graphql/shopify/collections";

let date = new Date().toISOString();

const STATIC_LINKS = [
  {
    loc: "https://www.activesourcelabs.com",
    lastmod: date,
  },
];

const handler = async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/xml");

  // Instructing the Vercel edge to cache the file
  res.setHeader("Cache-control", "stale-while-revalidate, s-maxage=3600");
  let urls = STATIC_LINKS || [];
  let client = initApollo();

  let products = await client.query({
    query: QUERY_PRODUCTS,
    variables: {
      first: 250,
      query: "tag_not:hidden",
    },
  });

  products.data.products.edges
    .map((edge) => edge.node)
    .forEach((product) => {
      urls.push({
        loc: `https://www.activesource.com/products/${product.handle}`,
        lastmod: product.updatedAt,
      });
    });

  let collections = await client.query({
    query: QUERY_COLLECTIONS,
    variables: {
      first: 250,
    },
  });

  collections.data.collections.edges
    .map((edge) => edge.node)
    .forEach((collection) => {
      urls.push({
        loc: `https://www.activesource.com/collections/${collection.handle}`,
        lastmod: collection.updatedAt,
      });
    });

  // generate sitemap here
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls
      .map(
        (url) => `
      <url>
        <loc>${url.loc}</loc>
        <lastmod>${url.lastmod}</lastmod>
      </url>
    `
      )
      .join("") +
    `        
    </urlset>`;

  res.end(xml);
};

export default handler;
