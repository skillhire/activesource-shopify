import React, { useRef, useState, useEffect, useContext } from "react";
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
  const { cart, setCart, lineItemTotal, setLineItemTotal } = useContext(ShopContext);

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

  const cartLinesAdd = async (lines) => {
    let resp = await cartLinesAddMutation({
      variables: {
        cartId: cart?.id,
        lines: lines,
      },
    });    
    if(resp?.data?.cartLinesAdd?.cart){
      setCart(resp?.data?.cartLinesAdd?.cart);    
    }    
    return resp?.data?.cartLinesAdd?.cart;
  };

  const cartLineAdd = async ({ variantId, quantity, sellingPlanId, attributes }) => {    

    let customAttributes = attributes
      ?.filter(({ key, value }) => key && value?.length > 0)

    let resp = await cartLinesAddMutation({
      variables: {
        cartId: cart?.id,
        lines: [
          {
            merchandiseId: variantId,
            quantity: quantity,
            sellingPlanId: sellingPlanId,
            attributes: customAttributes
          },
        ],
      },
    })
    if(resp?.data?.cartLinesAdd?.cart){
      setCart(resp?.data?.cartLinesAdd?.cart);    
    }
    return resp?.data?.cartLinesAdd?.cart;
  };

  const cartLinesAddBulk = async (lines) => {
    let resp = await cartLinesAddMutation({
      variables: {
        cartId: cart?.id,
        lines: lines,
      },
    });
    if(resp?.data?.cartLinesAdd?.cart){
      setCart(resp?.data?.cartLinesAdd?.cart);    
    }
    return resp?.data?.cartLinesAdd?.cart;
  };

  const cartLinesRemove = async (lineIds) => {
    let resp = await cartLinesRemoveMutation({
      variables: {
        cartId: cart?.id,
        lineIds: lineIds,
      },
    });
    if(resp?.data?.cartLinesRemove?.cart){
      setCart(resp?.data?.cartLinesRemove?.cart);    
    }    
    return resp?.data?.cartLinesRemove?.cart;
  };

  const cartLineRemove = async (lineId) => {
    let resp = await cartLinesRemoveMutation({
      variables: {
        cartId: cart?.id,
        lineIds: [lineId],
      },
    });
    if(resp?.data?.cartLinesRemove?.cart){
      setCart(resp?.data?.cartLinesRemove?.cart);
    }
    return resp?.data?.cartLinesRemove?.cart;
  };

  const cartLinesRemoveBulk = async (lineIds) => {
    let resp = await cartLinesRemoveMutation({
      variables: {
        cartId: cart?.id,
        lineIds: lineIds,
      },
    });
    if(resp?.data?.cartLinesRemove?.cart){
      setCart(resp?.data?.cartLinesRemove?.cart);
    }
    return resp?.data?.cartLinesRemove?.cart;
  };

  const cartLinesUpdate = async (lines) => {
    let resp = await cartLinesUpdateMutation({
      variables: {
        cartId: cart?.id,
        lines: lines,
      },
    });
    if(resp?.data?.cartLinesUpdate?.cart){
      setCart(resp?.data?.cartLinesUpdate?.cart);
    }
    return resp?.data?.cartLinesUpdate?.cart;
  };

  const cartLineUpdate = async ({ lineId, variantId, quantity }) => {
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
    if(resp?.data?.cartLinesUpdate?.cart){
      setCart(resp?.data?.cartLinesUpdate?.cart);
    }
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
    let cartId = await localStorage.getItem("shopifyCartId");
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
    localStorage.removeItem("shopifyCartId");
    const resp = await cartCreateMutation({
      variables: {
        input: {},
      },
    });
    if(resp?.data?.cartCreate?.cart){
      localStorage.setItem("shopifyCartId", resp.data.cartCreate.cart.id);
      setCart(resp.data.cartCreate.cart);
    }
    return resp.data.cartCreate.cart;
  };

  const updateLineTotal = () => {
    if (!cart?.lines) return;
    let total = cart.lines.edges
      .map(({ node: li }) => li.quantity)
      .reduce((a, b) => a + b, 0);
    setLineItemTotal(total);
  };

  // Dangersouly resets the cart
  const cartReset = () => {
    setCheckout(null);
    setCookie("shopifyCartId", null);
    const variables = { input: {} };
    checkoutCreateMutation({ variables });
  }

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

  useEffect(() => {          
    cartFindOrCreate();    
  }, []);

  return {
    loading,
    error,
    cart,
    setCart,
    cartReset,
    cartFind,
    cartFindOrCreate,
    cartLineAdd,
    cartLinesAdd,
    cartLinesAddBulk,
    cartLineRemove,
    cartLinesRemove,
    cartLinesRemoveBulk,
    cartLineUpdate,
    cartLinesUpdate,
    cartDiscountCodesUpdate,
    cartBuyerIdentityUpdate,
    lineItemTotal,
    updateLineTotal,
  };
};

export default useCart;
