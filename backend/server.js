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
app.use(cors());

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       const allowedOrigins = [
//         "https://joel-hair.vercel.app",
//         "https://joel-admin.vercel.app",
//         "http://localhost:3000",
//         "http://localhost:5173",
//         "http://localhost:5174",
//       ];
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true, // Allow cookies or authentication headers
//   })
// );

// Debugging middleware

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log(`Origin: ${req.headers.origin}`);
  next();
});


//api end point

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cardRouter);
app.use("/api/order", orderRouter);


// Root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "App is running successfully" });
});



const startServer = async () => {
  try {
    await connectMongoDB();
    await connectCloudinary();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup error:", error);
    process.exit(1);
  }
};

startServer();

