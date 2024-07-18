import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { StorefrontLayout, PDP } from "components";
import { useProducts, useStorefronts } from "hooks";
import { buildStorePath } from "utils";

const Product = () => {
  const router = useRouter();
  const { handle, store } = router.query;
  const { storefront, fetchStorefront } = useStorefronts();

  const { loading, product, recommendedProducts, images, fetchProduct } =
    useProducts();

  useEffect(() => {
    if (handle) {
      fetchProduct(handle);
    }
  }, [handle]);

  useEffect(() => {
    if (store) {
      fetchStorefront(store);
    }
  }, [store]);

  if (!storefront) return null;
  return (
    <StorefrontLayout storefront={storefront}>
      <PDP
        disableFileGuidelines
        loading={loading}
        handle={handle}
        images={images}
        product={product}
        recommendedProducts={recommendedProducts}
        productUrl={buildStorePath(store, `/products`)}
        storefrontImagesUrl={ storefront?.imagesUrl }
      />
    </StorefrontLayout>
  );
};

export default Product;
