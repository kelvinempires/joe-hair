import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const EditProduct = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/product/single/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setProduct(res.data.product);
          setImageUrls(res.data.product.image || []);
        } else {
          toast.error(res.data.message);
        }
      } catch (err) {
        toast.error(err.message || "Error fetching product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

 const handleUpdate = async () => {
   if (!product.name || !product.price || !product.category) {
     toast.error("Please fill all required fields.");
     return;
   }

   try {
     setUpdating(true);
     const formData = new FormData();
     formData.append("name", product.name);
     formData.append("price", product.price);
     formData.append("category", product.category);
     formData.append("description", product.description || "");
     formData.append("brand", product.brand || "");
     formData.append("quantity", product.quantity || "");
     formData.append("discount", product.discount || "");
     formData.append("condition", product.condition || "");
     formData.append("tags", product.tags || "");
     formData.append("sizes", JSON.stringify(product.sizes || []));
     formData.append("bestseller", product.bestseller || false);

     imageFiles.forEach((file, index) => {
       formData.append(`image${index + 1}`, file);
     });

     const res = await axios.put(
       `${backendUrl}/api/product/update/${id}`,
       formData,
       {
         headers: {
           "Content-Type": "multipart/form-data",
           Authorization: `Bearer ${token}`,
         },
       }
     );

     if (res.data.success) {
       toast.success("Product updated successfully!");
       navigate("/list");
     } else {
       toast.error(res.data.message || "Update failed");
     }
   } catch (err) {
     toast.error(err.message || "Error updating product");
   } finally {
     setUpdating(false);
   }
 };


  if (loading) {
    return <p>Loading product...</p>;
  }

  if (!product) {
    return <p className="text-red-500">Failed to load product data.</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name || ""}
        onChange={handleChange}
        className="w-full p-2 border mb-2"
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price || ""}
        onChange={handleChange}
        className="w-full p-2 border mb-2"
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={product.category || ""}
        onChange={handleChange}
        className="w-full p-2 border mb-2"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={product.description || ""}
        onChange={handleChange}
        className="w-full p-2 border mb-2"
      />

      <input
        type="file"
        multiple
        onChange={handleImageChange}
        className="w-full p-2 border mb-4"
      />

      {imageUrls.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {imageUrls.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Preview ${i}`}
              className="rounded w-full h-20 object-cover"
            />
          ))}
        </div>
      )}

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        disabled={updating}
      >
        {updating ? "Updating..." : "Update Product"}
      </button>
    </div>
  );
};

export default EditProduct;
