import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import "dotenv/config";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Setup Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads", // Folder in Cloudinary
    format: async (req, file) => "png", // Change format if needed
    public_id: (req, file) => file.fieldname + "-" + Date.now(),
  },
});

const upload = multer({ storage });

export default upload;
