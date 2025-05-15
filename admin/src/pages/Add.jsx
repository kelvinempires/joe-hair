import React, { useEffect, useState, useMemo, useCallback } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const hasValidImage = images.some((img) => img !== null);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img?.preview) URL.revokeObjectURL(img.preview);
      });
    };
  }, [images]);

  const handleImageChange = (index, file) => {
    const updatedImages = [...images];
    if (updatedImages[index]?.preview) {
      URL.revokeObjectURL(updatedImages[index].preview);
    }
    file.preview = URL.createObjectURL(file);
    updatedImages[index] = file;
    setImages(updatedImages);
  };

  const handleSizeToggle = useCallback((size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  }, []);

  const subCategoryOptions = useMemo(() => {
    switch (category) {
      case "Men":
      case "Women":
        return ["Topwear", "Bottomwear", "Winterwear"];
      case "Kids":
        return ["Boys", "Girls", "Accessories"];
      default:
        return [];
    }
  }, [category]);

  useEffect(() => {
    setSubCategory(subCategoryOptions[0] || "");
  }, [category, subCategoryOptions]);

  const resetForm = () => {
    setImages([null, null, null, null]);
    setName("");
    setDescription("");
    setCategory("Men");
    setSubCategory("Topwear");
    setPrice("");
    setSizes([]);
    setBestseller(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !description.trim()) {
      toast.error("Please enter product name and description");
      return;
    }

    if (price <= 0 || isNaN(price)) {
      toast.error("Price must be a valid number greater than 0");
      return;
    }

    if (sizes.length === 0) {
      toast.error("Please select at least one size");
      return;
    }

    if (!hasValidImage) {
      toast.error("Please upload at least one image");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      images.forEach((img, i) => {
        if (img) formData.append(`image${i + 1}`, img);
      });

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          resetForm();
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    name.trim() &&
    description.trim() &&
    !isNaN(price) &&
    Number(price) > 0 &&
    sizes.length > 0 &&
    hasValidImage;

  if (pageLoading) {
    return <div className="animate-pulse text-gray-400">Loading form...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-start gap-4"
    >
      <div>
        <p className="mb-2 font-semibold">Upload Images</p>
        <div className="flex gap-2">
          {images.map((img, index) => (
            <label key={index} htmlFor={`image${index}`}>
              <img
                className={`w-20 h-20 object-cover rounded border ${
                  !img && !hasValidImage ? "border-red-500" : "border-gray-300"
                }`}
                src={img ? img.preview : assets.upload_area}
                alt="upload preview"
                title="Click to upload image"
              />
              <input
                type="file"
                id={`image${index}`}
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(index, e.target.files[0])}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full max-w-[500px]">
        <label className="block mb-1">Product Name</label>
        <input
          className="w-full px-3 py-2 border rounded"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="w-full max-w-[500px]">
        <label className="block mb-1">Description</label>
        <textarea
          className="w-full px-3 py-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-wrap gap-4 w-full">
        <div className="flex flex-col">
          <label className="mb-1">Category</label>
          <select
            className="px-3 py-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Subcategory</label>
          <select
            className="px-3 py-2 border rounded"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            {subCategoryOptions.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Price (₦)</label>
          <input
            className="px-3 py-2 border rounded"
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-1">Sizes</label>
        <div className="flex gap-2">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <span
              key={size}
              role="button"
              tabIndex={0}
              aria-pressed={sizes.includes(size)}
              onClick={() => handleSizeToggle(size)}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && handleSizeToggle(size)
              }
              className={`cursor-pointer px-3 py-1 border rounded focus:outline-none ${
                sizes.includes(size)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              {size}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={bestseller}
          onChange={() => setBestseller(!bestseller)}
        />
        <label>Mark as Bestseller</label>
      </div>

      <button
        type="submit"
        disabled={!isFormValid || loading}
        className={`px-4 py-2 text-white rounded transition ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : isFormValid
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        {loading ? "Submitting..." : "Add Product"}
      </button>
    </form>
  );
};

export default Add;
