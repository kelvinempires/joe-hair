import React from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => (
  <div className="flex justify-center mt-6 gap-2">
    {Array.from({ length: totalPages }, (_, idx) => (
      <button
        key={idx}
        onClick={() => setCurrentPage(idx + 1)}
        className={`px-3 py-1 rounded border ${
          currentPage === idx + 1 ? "bg-blue-600 text-white" : "bg-gray-100"
        }`}
      >
        {idx + 1}
      </button>
    ))}
  </div>
);

export default Pagination;
