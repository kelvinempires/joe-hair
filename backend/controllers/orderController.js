import orderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import Stripe from "stripe";
import paystackPkg from "paystack";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // Import UUID for generating unique references




const currency = "NGN";
// Set the delivery charge from environment variable or default to 10
const deliveryCharge = process.env.DELIVERY_CHARGE || 10;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const paystack = paystackPkg(process.env.PAYSTACK_SECRET_KEY);
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
      const reference = uuidv4();
      console.log("Generated reference:", reference);
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Cash on Delivery",
      payment: false,
      date: Date.now(),
      reference, 
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await UserModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Error placing order:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to place order. Please try again later.",
      });
  }
};

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;
    const baseUrl = origin || process.env.FRONTEND_URL;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      success_url: `${baseUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${baseUrl}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error placing Stripe order:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to place order. Please try again later.",
      });
  }
};

const verifyStripe = async (req, res) => {
  const { success, orderId, userId } = req.body;
  try {
    if (success === "true" || success === true) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await UserModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Order placed successfully" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error("Error verifying Stripe payment:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to verify payment. Please try again later.",
      });
  }
};

// const placeOrderPaystack = async (req, res) => {
//   try {
//     const { userId, items, amount, address } = req.body;
//     const email = address?.email;

//     // Validate email
//     if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       return res.status(400).json({
//         success: false,
//         message: "A valid email address is required.",
//       });
//     }

//     // Generate a unique reference for the order
//     const reference = uuidv4();
//     console.log("Generated reference:", reference); // Debugging log

//     // Include the reference in the order data
//     const orderData = {
//       userId,
//       items,
//       address,
//       amount,
//       paymentMethod: "Paystack",
//       payment: false,
//       date: Date.now(),
//       reference, // Save the generated reference
//     };

//     console.log("Order data being saved:", orderData); // Debugging log

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();
//     console.log("Order saved successfully:", newOrder);

//     // Initialize Paystack Transaction
//     const response = await axios.post(
//       "https://api.paystack.co/transaction/initialize",
//       {
//         email,
//         amount: amount * 100, // Convert amount to kobo
//         currency: "NGN",
//         callback_url: `${baseUrl}/payment-success?status=success&reference=${reference}&orderId=${newOrder._id}`,
//         metadata: {
//           orderId: newOrder._id,
//           custom_fields: [{ display_name: "Delivery Address", value: address }],
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("Paystack response:", response.data);

//     if (!response.data.status) {
//       throw new Error(response.data.message || "Paystack transaction failed.");
//     }

//     res.json({
//       success: true,
//       authorization_url: response.data.data.authorization_url,
//     });
//   } catch (error) {
//     console.error("Error placing Paystack order:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Failed to place order. Please try again later.",
//     });
//   }
// };

const placeOrderPaystack = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const email = address?.email; // Extract email from the address object
    const { origin } = req.headers;
    const adminOrigin = process.env.ADMIN_FRONTEND_URL;
    const baseUrl = origin === adminOrigin ? process.env.FRONTEND_URL : origin || process.env.FRONTEND_URL;

    // const baseUrl = origin || process.env.FRONTEND_URL;

    console.log("Request Body:", req.body); // Debugging
    console.log("Email received:", email); // Debugging

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "A valid email address is required.",
      });
    }
    const reference = uuidv4();
    console.log("Generated reference:", reference); // Debugging log
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Paystack",
      payment: false,
      date: Date.now(),
      reference, // Save the generated reference
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Initialize Paystack Transaction
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100, // Convert amount to kobo
        currency: "NGN",
        callback_url: `${baseUrl}/verify?success=true&orderId=${newOrder._id}`,
        metadata: {
          orderId: newOrder._id,
          custom_fields: [{ display_name: "Delivery Address", value: address }],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Paystack response:", response.data);

    if (!response.data.status) {
      throw new Error(response.data.message || "Paystack transaction failed.");
    }

    res.json({
      success: true,
      authorization_url: response.data.data.authorization_url,
    });
  } catch (error) {
    console.error("Error placing Paystack order:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to place order. Please try again later.",
    });
  }
};
// const verifyPaystack = async (req, res) => {
//   const { reference, orderId, userId } = req.body;
//   try {
//     console.log("Reference received in verifyPaystack:", reference); // Debugging log

//     // Debugging: Check if the reference exists in the database
//     const debugOrder = await orderModel.findOne({ reference });
//     console.log("Debugging: Order found in database:", debugOrder);

//      if (!debugOrder) {
//        console.error("Debugging: Reference not found in database:", reference);
//        return res.status(404).json({
//          success: false,
//          message: "Order not found for the provided reference.",
//        });
//      }

//     const response = await axios.get(
//       `https://api.paystack.co/transaction/verify/${reference}`,
//       {
//         headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
//       }
//     );

//     console.log("Paystack verification response:", response.data);

//     if (response.data.data.status === "success") {
//       const order = await orderModel.findOne({ reference });
//       if (!order) {
//         return res.status(404).json({
//           success: false,
//           message: "Order not found for the provided reference.",
//         });
//       }

//       await orderModel.findByIdAndUpdate(orderId, { payment: true });
//       await UserModel.findByIdAndUpdate(userId, { cartData: {} });

//       res.json({ success: true, message: "Order placed successfully" });
//     } else {
//       await orderModel.findByIdAndDelete(orderId);
//       res.json({ success: false, message: "Payment failed" });
//     }
//   } catch (error) {
//     if (error.response && error.response.status === 404) {
//       console.error("Transaction not found:", error.response.data);
//       return res.status(404).json({
//         success: false,
//         message: "Transaction not found. Please check the reference.",
//       });
//     }

//     console.error("Error verifying Paystack payment:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Failed to verify payment. Please try again later.",
//     });
//   }
// };

const verifyPaystack = async (req, res) => {
  const { reference, orderId, userId } = req.body;
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
      }
    );

    console.log("Paystack verification response:", response.data);

    if (response.data.data.status === "success") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await UserModel.findByIdAndUpdate(userId, { cartData: {} });

      res.json({ success: true, message: "Order placed successfully" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error("Error verifying Paystack payment:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to verify payment. Please try again later.",
    });
  }
};
const allOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const maxLimit = 100;
    const validatedLimit = Math.min(Number(limit), maxLimit);
    const orders = await orderModel
      .find({})
      .skip((page - 1) * validatedLimit)
      .limit(validatedLimit);
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching all orders:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch orders. Please try again later.",
      });
  }
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const { page = 1, limit = 10 } = req.query;
    const maxLimit = 100;
    const validatedLimit = Math.min(Number(limit), maxLimit);
    const orders = await orderModel
      .find({ userId })
      .skip((page - 1) * validatedLimit)
      .limit(validatedLimit);
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch orders. Please try again later.",
      });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update status. Please try again later.",
      });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  placeOrderRazorpay,
  placeOrderPaystack,
  verifyPaystack,
};
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await UserModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Error placing Razorpay order:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to place order. Please try again later.",
      });
  }
};

