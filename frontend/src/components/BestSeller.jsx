import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSellers = () => {
  const { products } = useContext(ShopContext); // Access products from context
  const [bestSellers, setBestSellers] = useState([]); // State for best-selling products
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const bestProduct = products.filter((item) => (item.bestseller));
    setBestSellers(bestProduct.slice(0, 5));
    setLoading(false);
  }, [products]);

  return (
    <div className="py-10">
      <div className="text-center py-8 text-3xl">
        <Title test1={"BEST"} test2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Shop our most sought-after products, chosen by customers for their
          exceptional quality and performance. Discover your next favorite item
          today!
        </p>
      </div>
      {loading ? (
        <p className="text-gray-500 text-center">Loading best sellers...</p>
      ) : bestSellers.length === 0 ? (
        <p className="text-gray-500 text-center col-span-full">
          No best-selling items available right now.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6">
          {bestSellers.map((item,index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BestSellers;
