import Head from "next/head";

const MetaFields = ({
  title,
  metaKeywords,
  metaDescription,
  metaImage,
  metaDomain,
  metaUrl,
  ...props
}) => (
  <Head>
    <title>{title}</title>
    <meta charSet="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no"
    />
    <meta name="keywords" content={metaKeywords} />
    <meta name="description" content={metaDescription} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={metaDescription} />
    <meta property="og:image" content={metaImage} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:domain" content={metaDomain} />
    <meta property="twitter:url" content={metaUrl} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={metaDescription} />
    <meta name="twitter:image" content={metaImage} />
  </Head>
);

export default MetaFields;
