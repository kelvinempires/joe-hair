import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const VerifyPayment = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const reference = searchParams.get("reference"); // Paystack uses `reference`

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }

      let verificationUrl = "";
      let requestData = { success, orderId };

      if (reference) {
        // Paystack verification
        verificationUrl = `${backendUrl}/api/order/verifyPaystack`;
        requestData = { reference, orderId };
      } else {
        // Stripe verification
        verificationUrl = `${backendUrl}/api/order/verifyStripe`;
      }

      const response = await axios.post(verificationUrl, requestData, {
        headers: { token },
      });

      if (response.data.success) {
        setCartItems({});
        toast.success("Payment verified successfully!");
        navigate("/orders");
      } else {
        toast.error("Payment failed.");
        navigate("/cart");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      toast.error("Error verifying payment. Please try again.");
      navigate("/cart");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div>Verifying payment...</div>;
};

export default VerifyPayment;
