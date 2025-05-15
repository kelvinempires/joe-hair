import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [viewItem, setViewItem] = useState(null); // For modal view
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);

  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/product/list");
      if (res.data.success) {
        setList(res.data.products);
        setFilteredList(res.data.products);
        const cats = [
          ...new Set(res.data.products.map((item) => item.category)),
        ];
        setCategories(cats);
      } else {
        toast.error(res.data.msg);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    setRemoving(id);
    try {
      const res = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        toast.success(res.data.msg);
        fetchList();
      } else {
        toast.error(res.data.msg);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setRemoving(null);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    let filtered = list;

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    setFilteredList(filtered);
    setCurrentPage(1); // Reset to first page on search/filter change
  }, [searchQuery, selectedCategory, list]);

  const paginatedItems = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded-md w-full md:w-1/3"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-4 py-2 rounded-md w-full md:w-auto"
        >
          <option value="All">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] text-sm border-b font-semibold px-2 py-1 hidden md:grid">
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span className="text-center">Actions</span>
      </div>

      {paginatedItems.map((item) => (
        <div
          key={item._id}
          className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] text-sm border-b items-center gap-2 py-2 px-2"
        >
          <img src={item.image[0]} alt="" className="w-12 h-12 object-cover" />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>
            {currency}
            {item.price}
          </p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => setViewItem(item)}
              className="text-blue-600 hover:underline"
            >
              View
            </button>
            <button
              onClick={() => navigate(`/edit/${item._id}`)}
              className="text-green-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => removeProduct(item._id)}
              className={`text-red-600 hover:underline ${
                removing === item._id && "opacity-50 pointer-events-none"
              }`}
            >
              {removing === item._id ? "..." : "Delete"}
            </button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === idx + 1
                ? "bg-blue-600 text-white"
                : "bg-white text-black"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {viewItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-[90%] max-w-lg shadow-lg relative">
            <button
              onClick={() => setViewItem(null)}
              className="absolute top-2 right-2 text-lg font-bold"
            >
              &times;
            </button>
            <img
              src={viewItem.image[0]}
              alt=""
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h2 className="text-xl font-bold mb-1">{viewItem.name}</h2>
            <p className="text-sm mb-1">
              Category: <b>{viewItem.category}</b>
            </p>
            <p className="text-sm mb-2">
              Price: {currency}
              {viewItem.price}
            </p>
            <p className="text-sm text-gray-600">{viewItem.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
