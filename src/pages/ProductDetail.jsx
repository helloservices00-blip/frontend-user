import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../api/api.js";
import { AuthContext } from "../context/AuthContext.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
    navigate("/cart");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={`https://backend-8xqn.onrender.com/${product.images[0]}`} alt={product.name} />
      <p>{product.description}</p>
      <p>${product.price}</p>
      {user ? <button onClick={addToCart}>Add to Cart</button> : <p>Please login to purchase</p>}
    </div>
  );
}
