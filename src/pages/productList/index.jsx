import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import ProductTitle from "../../components/productTitle";

function ProductListPage() {
  const { loading, listOfProducts } = useContext(ShoppingCartContext);

  if (loading) {
    return (
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-light text-gray-800 sm:text-4xl">
              Loading Products...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-100 to-white sm:py-20 lg:py-24">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 sm:text-5xl lg:text-6xl">
            Our Featured Products
          </h2>
          <p className="mt-4 text-lg text-gray-600 sm:text-xl">
            Discover a range of top-quality items tailored to meet your needs
            and preferences.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {listOfProducts && listOfProducts.length > 0 ? (
            listOfProducts.map((product) => (
              <div key={product.id}>
                <ProductTitle product={product}></ProductTitle>
              </div>
            ))
          ) : (
            <div className="text-center col-span-full">
              <p className="text-gray-600 text-lg">
                No products available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductListPage;
