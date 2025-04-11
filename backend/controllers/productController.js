import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/product.model.js";

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

    // Validate required fields
    if (!name || !price || !category) {
      return res.json({
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
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" || bestseller === true || false,
      sizes: JSON.parse(sizes),
      image: imageUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "product Added" });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

// List Products
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

// Remove Product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, msg: "Product removed" });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

// Single Product Info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productModel.findById(productId);

    if (!product) {
      return res.json({ success: false, msg: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

export { listProduct, removeProduct, singleProduct, addProduct };
