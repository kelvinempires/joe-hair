import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
    const{currency} = useContext(ShopContext)
  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden ">
        <img
          // className="hover:opacity-75 hover:scale-110 transition-transform ease-in-out duration-300 hover:-translate-y-1 hover:shadow-lg"
          className="hover:opacity-80 hover:scale-105 transition-transform ease-in-out duration-300 hover:-translate-y-1 hover:shadow-lg w-full h-[200px] max-h-[300px] object-cover rounded-md sm:h-[180px] md:h-[200px] lg:h-[220px] xl:h-[250px]"
          src={image[0]}
          alt="image"
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem