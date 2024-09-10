import React from "react";
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const { shippingAddress, paymentMethod } = location.state; 
  const handlePayment = () => {
    console.log("Processing payment with:", paymentMethod);

    // After successful payment, navigate to order summary or confirmation page
    // navigate("/order-summary", { state: { orderDetails: { ... } } });
  };

  return (
    <div>
      <h1>Payment</h1>
      <p>Shipping to: {shippingAddress.address}</p>
      <p>Payment Method: {paymentMethod}</p>

      <button onClick={handlePayment}>
        Pay Now with {paymentMethod === "stripe" ? "Stripe" : "PayPal"}
      </button>
    </div>
  );
};

export default PaymentPage;
