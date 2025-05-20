import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { backendUrl, currency } from "../App";
import SearchFilterBar from "../components/SearchFilterBar";
import ProductRow from "../components/ProductRow";
import Pagination from "../components/Pagination";
import ProductModal from "../components/ProductModal";

const List = ({ token }) => {
  const navigate = useNavigate();

  // === STATE ===
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewItem, setViewItem] = useState(null);
  const [removing, setRemoving] = useState(null);

  const itemsPerPage = 8;

  // === FETCH PRODUCTS ===
  const fetchList = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success) {
        const products = res.data.products;
        setList(products);
        setFilteredList(products);
        const uniqueCategories = [...new Set(products.map((p) => p.category))];
        setCategories(uniqueCategories);
      } else {
        toast.error(res.data.msg);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // === REMOVE PRODUCT ===
  const removeProduct = async (id) => {
    setRemoving(id);
    try {
      const res = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        toast.success(res.data.msg);
        fetchList(); // refresh list
      } else {
        toast.error(res.data.msg);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setRemoving(null);
    }
  };

  // === EFFECTS ===
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
    setCurrentPage(1); // reset to first page on filter
  }, [searchQuery, selectedCategory, list]);

  // === PAGINATION ===
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const paginatedItems = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // === RENDER ===
  return (
    <div className="space-y-4">
      <SearchFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] sm:grid-cols-[1fr_2fr_1fr_1fr_1fr] text-sm font-semibold px-2 py-2 border-b bg-gray-100 rounded">
        <span>Image</span>
        <span>Name</span>
        <span className="hidden sm:block">Category</span>
        <span>Price</span>
        <span className="text-center">Actions</span>
      </div>

      {paginatedItems.map((item) => (
        <ProductRow
          key={item._id}
          item={item}
          currency={currency}
          navigate={navigate}
          setViewItem={setViewItem}
          removeProduct={removeProduct}
          removing={removing}
        />
      ))}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <ProductModal
        viewItem={viewItem}
        setViewItem={setViewItem}
        currency={currency}
      />
    </div>
  );
};

export default List;
