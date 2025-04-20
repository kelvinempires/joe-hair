import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa"; // Import the shopping cart icon
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      to={`/product/${id}`}
      className="block bg-white p-3 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
    >
      <div className="overflow-hidden rounded-md">
        <img
          className="w-full h-[200px] max-h-[300px] object-cover rounded-md sm:h-[180px] md:h-[200px] lg:h-[220px] xl:h-[250px] hover:opacity-90 hover:scale-105 transition-transform duration-300"
          src={image[0]}
          alt="Product"
        />
      </div>
      <div className="flex items-center justify-between mt-3">
        <div>
          <p className="text-gray-700 font-semibold text-sm">{name}</p>
          <p className="text-gray-900 text-sm font-medium">
            {currency}
            {price}
          </p>
        </div>
        <FaShoppingCart className="text-gray-600 text-lg hover:text-black transition-colors duration-200 cursor-pointer" />
      </div>
    </Link>
  );
};

export default ProductItem;
