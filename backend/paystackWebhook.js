// import nodemailer from "nodemailer"; // For sending confirmation emails
// import crypto from "crypto"; // For validating Paystack webhook signature
// import orderModel from "./models/order.model.js";

// // 📌 Paystack Webhook Handler Function
// const paystackWebhookHandler = async (req, res) => {
//   try {
//     // Validate Paystack webhook signature
//     const secret = process.env.PAYSTACK_SECRET_KEY;
//     const hash = crypto
//       .createHmac("sha512", secret)
//       .update(req.body)
//       .digest("hex");

//     const signature = req.headers["x-paystack-signature"];
//     if (hash !== signature) {
//       console.error("❌ Invalid Paystack signature");
//       return res.status(400).json({
//         success: false,
//         message: "Invalid Paystack signature.",
//       });
//     }

//     // Parse the raw body to JSON
//     const event = JSON.parse(req.body);
//     console.log("📩 Received Paystack webhook event:", event);

//     if (event.event === "charge.success") {
//       const transactionRef = event.data.reference;
//       const customerEmail = event.data.customer.email;

//       if (!transactionRef || !customerEmail) {
//         console.error("❌ Missing transaction reference or customer email");
//         return res.status(400).json({
//           success: false,
//           message: "Missing transaction reference or customer email.",
//         });
//       }

//       console.log(
//         `✅ Payment successful! Transaction Reference: ${transactionRef}`
//       );

//       // 📌 Update order status in the database
//       const updatedOrder = await orderModel.findOneAndUpdate(
//         { reference: transactionRef },
//         { status: "Paid", payment: true },
//         { new: true }
//       );

//       if (!updatedOrder) {
//         console.error(
//           "❌ Order not found for transaction reference:",
//           transactionRef
//         );
//         return res.status(404).json({
//           success: false,
//           message: "Order not found for the provided transaction reference.",
//         });
//       }

//       console.log(
//         `✅ Order updated successfully for transaction reference ${transactionRef}`
//       );

//       // 📩 Send Payment Confirmation Email
//       await sendPaymentConfirmation(customerEmail, transactionRef);

//       return res.status(200).json({
//         success: true,
//         message: "Payment processed successfully.",
//         transactionReference: transactionRef,
//         email: customerEmail,
//       });
//     } else {
//       console.log(`ℹ️ Other event received: ${event.event}`);
//       return res.status(200).json({
//         success: true,
//         message: `Event received: ${event.event}`,
//       });
//     }
//   } catch (error) {
//     console.error("❌ Error processing webhook:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Webhook processing failed.",
//       error: error.message,
//     });
//   }
// };

// // 📩 Function to Send Payment Confirmation Email
// async function sendPaymentConfirmation(email, reference) {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.SENDER_EMAIL,
//         pass: process.env.SMTP_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: process.env.SENDER_EMAIL,
//       to: email,
//       subject: "Payment Successful!",
//       text: `Your payment was successful! Transaction Reference: ${reference}`,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("✅ Payment confirmation email sent to:", email);
//   } catch (error) {
//     console.error("❌ Error sending email:", error);
//     throw new Error("Failed to send payment confirmation email.");
//   }
// }

// // ✅ Export the webhook handler function
// export default paystackWebhookHandler;
