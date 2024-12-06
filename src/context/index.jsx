// create the context
// provide the stage to context
// wrap context in root component
// consume the context using useContext

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  function handleAddToCart(getProductDetails) {
    let copyExistingCartItems = [...cartItems];
    const findIndexOfCurrentItem = copyExistingCartItems.findIndex(
      (cartItem) => cartItem.id === getProductDetails.id
    );

    if (findIndexOfCurrentItem === -1) {
      copyExistingCartItems.push({
        ...getProductDetails,
        quantity: 1,
        totalPrice: getProductDetails.price,
      });
    } else {
      console.log("it's coming here");
      copyExistingCartItems[findIndexOfCurrentItem] = {
        ...copyExistingCartItems[findIndexOfCurrentItem],
        quantity: copyExistingCartItems[findIndexOfCurrentItem].quantity + 1,
        totalPrice:
          (copyExistingCartItems[findIndexOfCurrentItem].quantity + 1) *
          copyExistingCartItems[findIndexOfCurrentItem].price,
      };
    }
    console.log(copyExistingCartItems, "copyExistingCartItems");
    setCartItems(copyExistingCartItems);
    localStorage.setItem("cartItems", JSON.stringify(copyExistingCartItems));
    navigate("/cart");
  }

  async function fetchListOfProducts() {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const result = await response.json();

      if (result && result?.products) setListOfProducts(result.products);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setLoading(false);
    }
  }

  function handleRemoveFromCart(getProductDetails, isFullyRemoveFromCart) {
    let copyExistingCartItems = [...cartItems];
    const findIndexOfCurrentItem = copyExistingCartItems.findIndex(
      (item) => item.id === getProductDetails.id
    );
    if (isFullyRemoveFromCart) {
      copyExistingCartItems.splice(findIndexOfCurrentItem, 1);
    } else {
      copyExistingCartItems[findIndexOfCurrentItem] = {
        ...copyExistingCartItems[findIndexOfCurrentItem],
        quantity: copyExistingCartItems[findIndexOfCurrentItem].quantity - 1,
        totalPrice:
          (copyExistingCartItems[findIndexOfCurrentItem].quantity - 1) *
          copyExistingCartItems[findIndexOfCurrentItem].price,
      };
    }
    localStorage.setItem("cartItems", JSON.stringify(copyExistingCartItems));
    setCartItems(copyExistingCartItems);
  }

  useEffect(() => {
    setLoading(true);
    fetchListOfProducts();

    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      try {
        setCartItems(JSON.parse(storedCartItems));
      } catch (error) {
        console.error("Failed to parse cartItems from localStorage:", error);
        setCartItems([]); // Reset to an empty cart if parsing fails
      }
    } else {
      setCartItems([]);
    }
  }, []);

  console.log({ cartItems });

  return (
    <ShoppingCartContext.Provider
      value={{
        loading,
        productDetails,
        listOfProducts,
        cartItems,
        setLoading,
        setProductDetails,
        handleAddToCart,
        handleRemoveFromCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
