import React, { useState, useEffect, useContext } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ShopContext } from "context";
import {
  CART_FETCH,
  CART_CREATE,
  CART_LINES_ADD,
  CART_LINES_REMOVE,
  CART_LINES_UPDATE,
  CART_BUYER_IDENTITY_UPDATE,
} from "graphql/shopify/cart";
import { CART_DISCOUNT_CODE_UPDATE } from "graphql/shopify/discounts";

const useCart = (props) => {
  const { cart, setCart, setLineItemTotal } = useContext(ShopContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [cartCreateMutation, cartCreateResp] = useMutation(CART_CREATE);

  const [cartLinesAddMutation, cartLinesAddResp] = useMutation(CART_LINES_ADD);

  const [cartLinesRemoveMutation, cartLinesRemoveResp] =
    useMutation(CART_LINES_REMOVE);

  const [cartLinesUpdateMutation, cartLinesUpdateResp] =
    useMutation(CART_LINES_UPDATE);

  const [cartDiscountCodesUpdateMutation, cartDiscountCodesUpdateResp] =
    useMutation(CART_DISCOUNT_CODE_UPDATE);

  const [cartFetchQuery, cartFetchResp] = useLazyQuery(CART_FETCH);

  const [cartBuyerIdentityUpdateMutation, cartBuyerIdentityUpdateResp] =
    useLazyQuery(CART_BUYER_IDENTITY_UPDATE);

  const cartBuyerIdentityUpdate = async (customerAccessToken, email) => {
    if (cart?.id) {
      let resp = await cartBuyerIdentityUpdateMutation({
        variables: {
          cartId: cart.id,
          buyerIdentity: {
            customerAccessToken,
            email,
          },
        },
      });
      return resp;
    } else {
      console.log("Cart ID is required");
    }
  };

  const cartLinesAdd = ({ variantId, quantity, sellingPlanId, attributes }) => {
    cartLinesAddMutation({
      variables: {
        cartId: cart?.id,
        lines: [
          {
            merchandiseId: variantId,
            quantity: quantity,
            sellingPlanId: sellingPlanId,
            attributes: attributes,
          },
        ],
      },
    });
  };

  const cartLinesAddBulk = (lines) => {
    cartLinesAddMutation({
      variables: {
        cartId: cart?.id,
        lines: lines,
      },
    });
  };

  const cartLinesRemove = async (lineId) => {
    let resp = await cartLinesRemoveMutation({
      variables: {
        cartId: cart?.id,
        lineIds: [lineId],
      },
    });
    setCart(resp?.data?.cartLinesRemove?.cart);
    return resp?.data?.cartLinesRemove?.cart;
  };

  const cartLinesRemoveBulk = async (lineIds) => {
    let resp = await cartLinesRemoveMutation({
      variables: {
        cartId: cart?.id,
        lineIds: lineIds,
      },
    });
    setCart(resp?.data?.cartLinesRemove?.cart);
    return resp?.data?.cartLinesRemove?.cart;
  };

  const cartLinesUpdate = async ({ lineId, variantId, quantity }) => {
    let resp = await cartLinesUpdateMutation({
      variables: {
        cartId: cart?.id,
        lines: [
          {
            id: lineId,
            merchandiseId: variantId,
            quantity: quantity,
          },
        ],
      },
    });
    setCart(resp?.data?.cartLinesUpdate?.cart);
    return resp?.data?.cartLinesUpdate?.cart;
  };

  const cartDiscountCodesUpdate = async (discountCodes) => {
    let resp = await cartDiscountCodesUpdateMutation({
      variables: {
        cartId: cart?.id,
        discountCodes: discountCodes,
      },
    });
    if (resp?.data.cartDiscountCodesUpdate.userErrors?.length === 0) {
      setCart(resp?.data.cartDiscountCodesUpdate.cart);
    }
    return resp?.data.cartDiscountCodesUpdate.cart;
  };

  const cartFind = async (cartId) => {
    let resp = await cartFetchQuery({
      variables: {
        id: cartId,
      },
    });
    if (resp.data.cart) {
      setCart(resp.data.cart);
    }
    return resp.data.cart;
  };

  const cartFindOrCreate = async () => {
    let cartId = localStorage.getItem("cart_id");
    let resp;
    if (cartId) {
      resp = await cartFetchQuery({
        variables: {
          id: cartId,
        },
      });
      if (resp?.data?.cart == null) {
        await cartCreate();
      } else {
        setCart(resp.data.cart);
        return resp.data.cart;
      }
    } else {
      await cartCreate();
    }
  };

  const cartCreate = async () => {
    localStorage.removeItem("cart_id");
    const resp = await cartCreateMutation({
      variables: {
        input: {},
      },
    });
    setCart(resp.data.cartCreate.cart);
    return resp.data.cartCreate.cart;
  };

  const updateLineTotal = () => {
    if (!cart?.lines) return;
    let total = cart.lines.edges
      .map(({ node: li }) => li.quantity)
      .reduce((a, b) => a + b, 0);
    setLineItemTotal(total);
  };

  useEffect(() => {
    if (cartFetchResp?.data) {
      setCart(cartFetchResp?.data?.node);
    }
  }, [cartFetchResp?.data]);

  useEffect(() => {
    if (cartCreateResp?.data) {
      localStorage.setItem(
        "cart_id",
        cartCreateResp?.data?.cartCreate?.cart?.id
      );
      setCart(cartCreateResp?.data?.cartCreate?.cart);
    }
  }, [cartCreateResp?.data]);

  useEffect(() => {
    if (cartLinesAddResp?.data) {
      setCart(cartLinesAddResp?.data?.cartLinesAdd?.cart);
    }
  }, [cartLinesAddResp?.data]);

  useEffect(() => {
    if (cart) {
      updateLineTotal();
    }
  }, [cart]);

  useEffect(() => {
    setError(
      cartFetchResp?.error ||
        cartCreateResp?.error ||
        cartLinesAddResp?.error ||
        cartLinesRemoveResp?.error ||
        cartLinesUpdateResp?.error ||
        cartDiscountCodesUpdateResp?.error ||
        cartBuyerIdentityUpdateResp?.error
    );
  }, [
    cartFetchResp?.error,
    cartCreateResp?.error,
    cartLinesAddResp?.error,
    cartLinesRemoveResp?.error,
    cartLinesUpdateResp?.error,
    cartDiscountCodesUpdateResp?.error,
    cartBuyerIdentityUpdateResp?.error,
  ]);

  useEffect(() => {
    setLoading(
      cartFetchResp?.loading ||
        cartCreateResp?.loading ||
        cartLinesAddResp?.loading ||
        cartLinesRemoveResp?.loading ||
        cartLinesUpdateResp?.loading ||
        cartDiscountCodesUpdateResp?.loading ||
        cartBuyerIdentityUpdateResp?.loading
    );
  }, [
    cartFetchResp?.loading,
    cartCreateResp?.loading,
    cartLinesAddResp?.loading,
    cartLinesRemoveResp?.loading,
    cartLinesUpdateResp?.loading,
    cartDiscountCodesUpdateResp?.loading,
    cartBuyerIdentityUpdateResp?.loading,
  ]);

  return {
    loading,
    error,
    cart,
    setCart,
    cartFind,
    cartFindOrCreate,
    cartLinesAdd,
    cartLinesAddBulk,
    cartLinesRemove,
    cartLinesRemoveBulk,
    cartLinesUpdate,
    cartDiscountCodesUpdate,
    cartBuyerIdentityUpdate,
    updateLineTotal,
  };
};

export default useCart;
