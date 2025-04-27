// import React from "react";
// import { PaystackButton } from "react-paystack";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const PaystackPayment = ({ email, amount }) => {
//   const publicKey = import.meta.env.VITE_PAYSTACK_LIVE_PUBLIC_KEY;

//   // Initialize toast notifications
//   toast.configure();

//   const componentProps = {
//     email,
//     amount: amount * 100, // Convert amount to kobo
//     currency: "NGN",
//     publicKey,
//     text: "Pay Now",
//     onSuccess: (reference) => {
//       toast.success(`Payment Successful! Reference: ${reference.transaction}`, {
//         position: "top-right",
//         autoClose: 5000,
//       });
//     },
//     onClose: () => {
//       toast.info("Payment window closed.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     },
//   };

//   return <PaystackButton {...componentProps} />;
// };

// export default PaystackPayment;
