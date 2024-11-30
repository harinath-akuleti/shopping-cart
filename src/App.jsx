import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/productList";
import ProductDetailsPage from "./pages/productDetails";
import CartListPage from "./pages/cartList";
import NotFound from "./pages/notFound";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/products" element={<ProductListPage />}></Route>
        <Route
          path="/product-details/:id"
          element={<ProductDetailsPage />}
        ></Route>
        <Route path="/cart" element={<CartListPage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
