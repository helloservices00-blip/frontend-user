import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={`https://backend-8xqn.onrender.com/${product.images[0]}`} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <Link to={`/product/${product._id}`}>View Details</Link>
    </div>
  );
}
