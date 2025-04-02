import express from "express";
import cors from "cors";
import "dotenv/config";
import connectMongoDB from "./config/conn.js";
import connectCloudinary from "./config/cloudinary.js";


//app config
const app = express();
const PORT = process.env.PORT || 4000;

// middleware

app.use(express.json());
app.use(cors());

//api end point

app.get("/", (req, res) => {
  res.send("app working");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  connectMongoDB();
  connectCloudinary()
});
