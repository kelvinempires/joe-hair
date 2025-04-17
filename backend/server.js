import express from "express";
import cors from "cors";
import "dotenv/config";
import connectMongoDB from "./config/conn.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cardRouter from "./routes/cardRoute.js";
import orderRouter from "./routes/orderRoute.js";


//app config
const app = express();
const PORT = process.env.PORT || 4000;

// middleware

app.use(express.json());
app.use(cors({origin: 'https://foo.com'}));

//api end point

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cardRouter);
app.use("/api/order", orderRouter);


app.get("/", (req, res) => {
  res.json("app working");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  connectMongoDB();
  connectCloudinary()
});
