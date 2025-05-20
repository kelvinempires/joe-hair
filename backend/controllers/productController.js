import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/product.model.js";
import mongoose from "mongoose"; 

// Add Product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    console.log("Bestseller received in request:", bestseller); // Debugging

    // Validate required fields
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        msg: "Name, price, and category are required.",
      });
    }

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imageUrl = await Promise.all(
      images.map(async (item) => {
        try {
          let result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        } catch (error) {
          console.error("Error uploading image to Cloudinary:", error.message);
          throw new Error("Failed to upload image. Please try again.");
        }
      })
    );

    let parsedSizes = [];
    try {
      parsedSizes = JSON.parse(sizes);
    } catch (error) {
      return res.status(400).json({
        success: false,
        msg: "Invalid sizes format. Please provide a valid JSON array.",
      });
    }

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" || bestseller === true, // Convert to boolean
      sizes: parsedSizes,
      image: imageUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({
      success: false,
      msg: "Failed to add product. Please try again later.",
    });
  }
};

// List Products
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error("Error listing products:", error.message);
    res
      .status(500)
      .json({
        success: false,
        msg: "Failed to fetch products. Please try again later.",
      });
  }
};

// Remove Product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, msg: "Product ID is required." });
    }

    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ success: false, msg: "Product not found" });
    }

    res.json({ success: true, msg: "Product removed successfully" });
  } catch (error) {
    console.error("Error removing product:", error.message);
    res
      .status(500)
      .json({
        success: false,
        msg: "Failed to remove product. Please try again later.",
      });
  }
};

// Single Product Info (For fetching product details)
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, msg: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res
      .status(500)
      .json({
        success: false,
        msg: "Failed to fetch product. Please try again later.",
      });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      name,
      price,
      description,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // Validate required fields
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        msg: "Name, price, and category are required.",
      });
    }

    const existingProduct = await productModel.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ success: false, msg: "Product not found" });
    }

    // Process uploaded image files
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

const imageUrl = [image1, image2, image3, image4]
  .filter(Boolean)
  .map((f) => f.path);

    // Parse sizes
    let parsedSizes = [];
    try {
      parsedSizes = JSON.parse(sizes);
    } catch (error) {
      return res.status(400).json({
        success: false,
        msg: "Invalid sizes format. Please provide a valid JSON array.",
      });
    }

    const updatedProduct = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" || bestseller === true,
      sizes: parsedSizes,
      image: imageUrl.length > 0 ? imageUrl : existingProduct.image,
      date: Date.now(),
    };

    await productModel.findByIdAndUpdate(productId, updatedProduct);

    res.json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({
      success: false,
      msg: "Failed to update product. Please try again later.",
    });
  }
};

const singleProductById =  async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID" });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export { listProduct, removeProduct, singleProduct, addProduct, updateProduct, singleProductById };
