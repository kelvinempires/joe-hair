import React from "react";

const ProductRow = ({
  item,
  currency,
  navigate,
  setViewItem,
  removeProduct,
  removing,
}) => (
  <div className="grid grid-cols-2 md:grid-cols-[1fr_1fr_1fr_1fr_1fr] text-sm items-center gap-4 border-b py-2 px-2">
    <img
      src={item.image[0]}
      alt={item.name}
      className="w-12 h-12 rounded object-cover"
    />
    <p>{item.name}</p>
    <p>{item.category}</p>
    <p>
      {currency}
      {item.price}
    </p>
    <div className="flex gap-3 text-sm">
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
);

export default ProductRow;
