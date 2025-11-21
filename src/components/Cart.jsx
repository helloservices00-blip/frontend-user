import React, { useState, useEffect } from "react";

export default function Cart({ onCheckout }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const removeItem = id => {
    const updated = cart.filter(item => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Cart</h1>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        <>
          {cart.map(item => (
            <div key={item._id}>
              <h3>{item.name}</h3>
              <p>${item.price} x {item.quantity}</p>
              <button onClick={() => removeItem(item._id)}>Remove</button>
            </div>
          ))}
          <h2>Total: ${total}</h2>
          <button onClick={() => onCheckout(cart)}>Checkout</button>
        </>
      )}
    </div>
  );
}
