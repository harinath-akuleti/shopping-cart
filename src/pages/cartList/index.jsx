import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import { useNavigate } from "react-router-dom";
import CartTitle from "../../components/cartTitle";

function CartListPage() {
  const { cartItems } = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        My Shopping Cart
      </h1>
      <div className="grid md:grid-cols-3 gap-8 mt-10">
        {/* Cart Items Section */}
        <div className="md:col-span-2 space-y-6">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((singleItem) => (
              <div
                key={singleItem.id}
                className="bg-white shadow-md p-4 rounded-lg"
              >
                <CartTitle singleItem={singleItem} />
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              <h2 className="text-lg font-semibold">
                No items in the cart yet!
              </h2>
              <p className="mt-2">
                Add some items to your cart to see them here.
              </p>
            </div>
          )}
        </div>
        {/* Order Summary Section */}
        <div className="bg-gray-50 shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 border-b pb-3">
            Order Summary
          </h3>
          <ul className="text-gray-700 mt-4 space-y-2">
            <li className="flex justify-between text-sm">
              <span>Total Items:</span>
              <span>{cartItems?.length || 0}</span>
            </li>
            <li className="flex justify-between text-sm font-semibold">
              <span>Total Price:</span>
              <span>
                $
                {cartItems
                  ?.reduce((total, item) => total + item.totalPrice, 0)
                  .toFixed(2) || "0.00"}
              </span>
            </li>
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <button
              disabled={cartItems.length === 0}
              className={`px-6 py-3 rounded-lg transition duration-300 ease-in-out transform ${
                cartItems.length === 0
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800 hover:scale-105"
              }`}
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => navigate("/products")}
              className="w-full px-4 py-3 bg-gray-100 text-gray-800 font-bold rounded hover:bg-gray-200 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartListPage;
