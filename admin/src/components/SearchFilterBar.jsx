import React from "react";

const SearchFilterBar = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
}) => (
  <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-6">
    <input
      type="text"
      placeholder="Search product..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="border px-4 py-2 rounded-md w-full md:w-1/3 shadow-sm focus:outline-blue-500"
    />

    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="border px-4 py-2 rounded-md w-full md:w-auto shadow-sm"
    >
      <option value="All">All Categories</option>
      {categories.map((cat, idx) => (
        <option key={idx} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  </div>
);

export default SearchFilterBar;
