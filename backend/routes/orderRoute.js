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
orderRouter.post("/paystack", placeOrderPaystack);



//user features
orderRouter.post('/user-orders', authUser, userOrders);

//verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe);
orderRouter.post('/verifyPaystack', authUser, verifyPaystack);
orderRouter.post("/webhook/paystack", authUser, handlePaystackWebhook);


export default orderRouter;