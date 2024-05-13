import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Layout, PDP } from "components";
import { useProducts } from "hooks";

const Product = () => {
  const router = useRouter();
  const { handle } = router.query;

  const { loading, product, recommendedProducts, images, fetchProduct } =
    useProducts();

  useEffect(() => {
    if (handle) {
      fetchProduct(handle);
    }
  }, [handle]);

  return (
    <Layout metaTitle={product?.title} metaDescription={product?.description}>
      <PDP
        loading={loading}
        handle={handle}
        images={images}
        product={product}
        recommendedProducts={recommendedProducts}
      />
    </Layout>
  );
};

export default Product;
