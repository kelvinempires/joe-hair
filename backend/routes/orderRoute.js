import express from 'express';
import { allOrders, handlePaystackWebhook, placeOrder, placeOrderPaystack, placeOrderStripe, updateStatus, userOrders, verifyPaystack, verifyStripe } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();
//admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

//payment features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe );
// orderRouter.post("/paystack", authUser, placeOrderPaystack);
// orderRouter.post("/paystack-webhook", handlePaystackWebhook )
orderRouter.post(
  "/paystack",
  (req, res, next) => {
    console.log("Request received at /paystack");
    next();
  },
  authUser,
  placeOrderPaystack
);

orderRouter.post(
  "/paystack-webhook",
  (req, res, next) => {
    console.log("Request received at /paystack-webhook");
    next();
  },
  handlePaystackWebhook
);

//user features
orderRouter.post('/user-orders', authUser, userOrders);

//verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe);
orderRouter.post('/verifyPaystack', authUser, verifyPaystack);


export default orderRouter;