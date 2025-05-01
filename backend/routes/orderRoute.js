import express from 'express';
import { allOrders, placeOrder, placeOrderPaystack, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders, verifyPaystack, verifyStripe } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();
//admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

//payment features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe );
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);
orderRouter.post('/paystack', authUser, placeOrderPaystack);


//user features
orderRouter.post('/user-orders', authUser, userOrders);

//verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe);
orderRouter.post('/verifyPaystack', authUser, verifyPaystack);

export default orderRouter;