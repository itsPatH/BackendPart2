const ProductErrors = {
    CODES: {
      CREATION_FAILED: -1,
      NOT_FOUND: -2,
      LIST_EMPTY: -3,
    },
    HTTP_STATUS: {
      CREATION_FAILED: 500,
      NOT_FOUND: 404,
      LIST_EMPTY: 404,
    },
    MESSAGES: {
      CREATION_FAILED: "Error during product creation",
      NOT_FOUND: "Product doesn't exist",
      LIST_EMPTY: "Product list is empty, try creating a product first",
    },
  };
  
  const CartErrors = {
    CODES: {
      CREATION_FAILED: -1,
      NOT_FOUND: -2,
      PRODUCT_NOT_FOUND: -3,
      LIST_EMPTY: -4,
      PRODUCT_NOT_FOUND_ON_CART: -5,
    },
    HTTP_STATUS: {
      CREATION_FAILED: 500,
      NOT_FOUND: 404,
      PRODUCT_NOT_FOUND: 404,
      LIST_EMPTY: 404,
      PRODUCT_NOT_FOUND_ON_CART: 404,
    },
    MESSAGES: {
      CREATION_FAILED: "Couldn't create cart",
      NOT_FOUND: "Cart doesn't exist",
      PRODUCT_NOT_FOUND: "Product doesn't exist",
      LIST_EMPTY: "Cart list is empty, try creating a cart first",
      PRODUCT_NOT_FOUND_ON_CART: "Product is not in the cart",
    },
  };
  
  export {
    ProductErrors,
    CartErrors,
  };
  