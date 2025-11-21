import React from "react";
import { useNavigate } from "react-router-dom";
import Cart from "../components/Cart.jsx";

export default function CartPage() {
  const navigate = useNavigate();

  const handleCheckout = (cartItems) => {
    localStorage.setItem("checkoutItems", JSON.stringify(cartItems));
    navigate("/checkout");
  };

  return <Cart onCheckout={handleCheckout} />;
}
