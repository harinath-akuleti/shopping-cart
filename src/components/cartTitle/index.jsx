import { Fragment, useContext } from "react";
import { ShoppingCartContext } from "../../context";

function CartTitle({ singleItem }) {
  const { handleRemoveFromCart, handleAddToCart } =
    useContext(ShoppingCartContext);
  return (
    <Fragment>
      <div className="grid grid-cols-3 items-center gap-6">
        {/* Product Image and Details */}
        <div className="col-span-2 flex items-center gap-4">
          <div className="w-28 h-28 bg-gray-200 p-1 rounded-md overflow-hidden">
            <img
              src={singleItem?.thumbnail}
              alt={singleItem?.title}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {singleItem?.title}
            </h3>
            <button
              onClick={() => handleRemoveFromCart(singleItem, true)}
              className="text-red-500 text-sm font-semibold hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
        {/* Price and Quantity */}
        <div className="ml-auto text-right">
          <h3 className="text-lg font-bold text-gray-900">
            ${singleItem?.totalPrice.toFixed(2)}
          </h3>

          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => handleRemoveFromCart(singleItem, false)}
              className="disabled:opacity-65 w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 text-lg font-bold"
              aria-label="Decrease Quantity"
              disabled={singleItem?.quantity === 1}
            >
              -
            </button>
            <span className="text-base font-semibold text-gray-800 w-8 text-center">
              {singleItem?.quantity}
            </span>
            <button
              onClick={() => handleAddToCart(singleItem)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 text-lg font-bold"
              aria-label="Increase Quantity"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <hr className="mt-4 border-t border-gray-200" />
    </Fragment>
  );
}

export default CartTitle;
