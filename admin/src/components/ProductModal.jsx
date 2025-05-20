import React from "react";

const ProductModal = ({ viewItem, setViewItem, currency }) => {
  if (!viewItem) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-md w-[90%] max-w-lg shadow-lg relative"
      >
        <button
          onClick={() => setViewItem(null)}
          className="absolute top-2 right-2 text-xl font-bold text-gray-600"
        >
          &times;
        </button>
        <img
          src={viewItem.image[0]}
          alt={viewItem.name}
          className="w-full h-48 object-cover rounded mb-4"
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
      </motion.div>
    </div>
  );
};

export default ProductModal;
