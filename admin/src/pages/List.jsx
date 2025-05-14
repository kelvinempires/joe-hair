import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true); // State for skeleton loader
  const [removing, setRemoving] = useState(null); // State for tracking the product being removed

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop skeleton loader after fetching
    }
  };

  const removeProduct = async (id) => {
    setRemoving(id); // Set the product ID being removed
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success(response.data.msg);
        fetchList();
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setRemoving(null); // Clear the removing state
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (loading) {
    // Render skeleton loader while loading
    return (
      <div className="flex flex-col gap-2">
        <p className="mb-2">All products List</p>
        {/* Skeleton for table header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-100 text-sm">
          <div className="h-5 bg-gray-300 rounded w-full"></div>
          <div className="h-5 bg-gray-300 rounded w-full"></div>
          <div className="h-5 bg-gray-300 rounded w-full"></div>
          <div className="h-5 bg-gray-300 rounded w-full"></div>
          <div className="h-5 bg-gray-300 rounded w-full"></div>
          <div className="h-5 bg-gray-300 rounded w-full"></div>
          <div className="h-5 bg-gray-300 rounded w-full"></div>
          <div className="h-5 bg-gray-300 rounded w-full"></div>
          <div className="h-5 bg-gray-300 rounded w-full"></div>
        </div>

        {/* Skeleton for product rows */}
        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 gap-2 px-2 border border-gray-300 text-sm animate-pulse"
          >
            <div className="w-12 h-12 bg-gray-300 rounded"></div>
            <div className="h-5 bg-gray-300 rounded w-full"></div>
            <div className="h-5 bg-gray-300 rounded w-full"></div>
            <div className="h-5 bg-gray-300 rounded w-full hidden md:block"></div>
            <div className="h-5 bg-gray-300 rounded w-full hidden md:block"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <p className="mb-2">All products List</p>
      <div className="flex flex-col gap-2">
        {/* -----------list table title----------- */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* -----------product list----------- */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 gap-2 px-2 border border-gray-300 text-sm"
            key={index}
          >
            <img className="w-12" src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <p
              onClick={() => removeProduct(item._id)}
              className={`text-right md:text-center cursor-pointer text-lg ${
                removing === item._id ? "pointer-events-none text-gray-400" : ""
              }`}
            >
              {removing === item._id ? (
                <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full border-gray-300 border-t-black"></div>
              ) : (
                "X"
              )}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
