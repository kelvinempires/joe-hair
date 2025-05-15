// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { backendUrl } from "../App";
// import { toast } from "react-toastify";

// const EditProduct = ({ token }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);
//   const [imageFiles, setImageFiles] = useState([]);
//   const [imageUrls, setImageUrls] = useState([]);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(
//           `${backendUrl}/api/product//update/:productId"${id}`
//         );
//         if (res.data.success) {
//           setProduct(res.data.product);
//           setImageUrls(res.data.product.image || []);
//         } else {
//           toast.error(res.data.msg);
//         }
//       } catch (err) {
//         toast.error( err.message || "Error fetching product");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImageFiles(files);
//   };

//   const handleUpdate = async () => {
//     if (!product.name || !product.price || !product.category) {
//       toast.error("Please fill all required fields.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", product.name);
//     formData.append("price", product.price);
//     formData.append("category", product.category);
//     formData.append("description", product.description);
//     imageFiles.forEach((file) => {
//       formData.append("images", file); // 'images' is the key the backend expects
//     });

//     try {
//       setUpdating(true);
//       const res = await axios.put(
//         `${backendUrl}/api/product/update/${id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (res.data.success) {
//         toast.success("Product updated successfully!");
//         navigate("/list");
//       } else {
//         toast.error(res.data.msg);
//       }
//     } catch (err) {
//       toast.error(err.message || "Update failed.");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (loading) return <p>Loading product...</p>;
//   if (!product) return <p>Product not found</p>;

//   return (
//     <div className="max-w-xl mx-auto p-4">
//       <h2 className="text-xl font-bold mb-4">Edit Product</h2>

//       <label className="block mb-2">Name</label>
//       <input
//         name="name"
//         value={product.name}
//         onChange={handleChange}
//         className="w-full border px-3 py-2 rounded mb-4"
//       />

//       <label className="block mb-2">Price</label>
//       <input
//         type="number"
//         name="price"
//         value={product.price}
//         onChange={handleChange}
//         className="w-full border px-3 py-2 rounded mb-4"
//       />

//       <label className="block mb-2">Category</label>
//       <input
//         name="category"
//         value={product.category}
//         onChange={handleChange}
//         className="w-full border px-3 py-2 rounded mb-4"
//       />

//       <label className="block mb-2">Description</label>
//       <textarea
//         name="description"
//         value={product.description}
//         onChange={handleChange}
//         className="w-full border px-3 py-2 rounded mb-4"
//         rows={4}
//       />

//       <label className="block mb-2">Images</label>
//       <input
//         type="file"
//         multiple
//         onChange={handleImageChange}
//         className="w-full border px-3 py-2 rounded mb-4"
//       />
//       <div className="mt-2">
//         {imageUrls?.length > 0 && (
//           <div>
//             <p>Current Images:</p>
//             {imageUrls.map((url, index) => (
//               <img
//                 key={index}
//                 src={url}
//                 alt={`Product image ${index + 1}`}
//                 className="w-20 h-20 object-cover mr-2"
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       <button
//         onClick={handleUpdate}
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//         disabled={updating}
//       >
//         {updating ? "Updating..." : "Update Product"}
//       </button>
//     </div>
//   );
// };

// export default EditProduct;
