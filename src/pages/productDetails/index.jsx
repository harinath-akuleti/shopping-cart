import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShoppingCartContext } from "../../context";

function ProductDetailsPage() {
  const { id } = useParams();
  const {
    productDetails,
    setProductDetails,
    loading,
    setLoading,
    handleAddToCart,
    cartItems,
  } = useContext(ShoppingCartContext);

  async function fetchProductDetails() {
    try {
      setLoading(true);
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const result = await response.json();

      if (response.ok && result) {
        setProductDetails(result);
      } else {
        console.error("Failed to fetch product details:", result);
        setProductDetails(null);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      setProductDetails(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800 sm:text-4xl">
              Loading Product Details...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  if (!productDetails) {
    return (
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800 sm:text-4xl">
              Product Not Found
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Sorry, we couldn't find the product you're looking for.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col lg:flex-row items-center lg:items-start justify-between space-y-4 lg:space-y-0">
      <div className="lg:w-1/3 space-y-4">
        {productDetails.images && productDetails.images.length > 0 ? (
          productDetails.images.map((image, index) => (
            <div key={index} className="mb-4">
              <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-md">
                <img
                  src={image}
                  alt={productDetails.title}
                  className="w-full h-64 object-cover rounded-lg transition-transform duration-300 transform hover:scale-105"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <p className="text-gray-600">No images available.</p>
          </div>
        )}
      </div>

      <div className="flex flex-col w-full lg:w-1/3 space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">
          {productDetails.title}
        </h3>
        <p className="text-lg text-gray-600">{productDetails.description}</p>
        <p className="text-xl font-bold text-gray-900">
          ${productDetails.price}
        </p>

        <button
          onClick={() => handleAddToCart(productDetails)}
          disabled={
            productDetails
              ? cartItems.findIndex((item) => item.id === productDetails.id) >
                -1
              : false
          }
          className={`px-6 py-3 rounded-lg transition duration-300 ease-in-out transform ${
            productDetails &&
            cartItems.findIndex((item) => item.id === productDetails.id) > -1
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800 hover:scale-105"
          }`}
        >
          {productDetails &&
          cartItems.findIndex((item) => item.id === productDetails.id) > -1
            ? "Added to Cart"
            : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
