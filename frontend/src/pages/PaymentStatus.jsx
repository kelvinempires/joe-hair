import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PaymentStatus = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const reference = queryParams.get("reference");

  useEffect(() => {
    if (status === "success") {
      console.log("Payment successful! Reference:", reference);
    } else {
      console.log("Payment failed or canceled.");
    }
  }, [status, reference]);

  return (
    <div>
      <h1>Payment Status</h1>
      {status === "success" ? (
        <p>Payment was successful! Reference: {reference}</p>
      ) : (
        <p>Payment failed or was canceled.</p>
      )}
    </div>
  );
};

export default PaymentStatus;
