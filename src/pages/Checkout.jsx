import React, { useEffect, useState } from "react";
import api from "../api/api.js";

export default function Checkout() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("checkoutItems")) || [];
    setCart(items);
  }, []);

  const handleCheckout = async () => {
    const lineItems = cart.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    const res = await api.post("/checkout/create-session", {
      products: lineItems,
      success_url: window.location.origin + "/",
      cancel_url: window.location.origin + "/cart"
    });

    window.location.href = res.data.url;
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Checkout</h1>
      {cart.map(item => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <p>${item.price} x {item.quantity}</p>
        </div>
      ))}
      <h2>Total: ${total}</h2>
      <button onClick={handleCheckout}>Pay Now</button>
    </div>
  );
}
