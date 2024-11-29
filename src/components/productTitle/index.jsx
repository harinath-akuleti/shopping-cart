import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../context";
import { useContext } from "react";

function ProductTitle({ product }) {
  const navigate = useNavigate();
  function navigateToProductDetailsPage(id) {
    navigate("/product-details/" + id);
  }

  const { handleAddToCart, cartItems } = useContext(ShoppingCartContext);
  return (
    <div className="p-6 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover rounded-md transition-transform transform hover:scale-105"
        />
      </div>

      <div className="mt-4 text-center flex-grow">
        <h3 className="text-xl font-semibold text-gray-800">{product.title}</h3>
        <p className="mt-2 text-lg font-bold text-gray-900">${product.price}</p>
      </div>

      <button
        onClick={() => navigateToProductDetailsPage(product.id)}
        className="mt-4 px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        View Details
      </button>

      <button
        onClick={() => handleAddToCart(product)}
        className={`px-5 mt-5 w-full py-2 rounded-none transition-colors ${
          cartItems.findIndex((item) => item.id === product.id) > -1
            ? "bg-gray-400 cursor-not-allowed text-gray-700"
            : "bg-black text-white hover:bg-gray-800"
        }`}
        disabled={cartItems.findIndex((item) => item.id === product.id) > -1}
      >
        {cartItems.findIndex((item) => item.id === product.id) > -1
          ? "Added to Cart"
          : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductTitle;
