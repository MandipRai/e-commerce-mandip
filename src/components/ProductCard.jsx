import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  // Mock variant data - in a real app, this would come from the product data
  const variants = product.variants || [
    { id: "small", name: "Small", price: product.price },
    { id: "medium", name: "Medium", price: (parseFloat(product.price) * 1.1).toFixed(2) },
    { id: "large", name: "Large", price: (parseFloat(product.price) * 1.2).toFixed(2) }
  ];

  const isOutOfStock = product.stock === 0 || product.stock === false;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error("Product is out of stock!");
      return;
    }

    const productToAdd = {
      ...product,
      selectedVariant: selectedVariant || variants[0]?.id,
      quantity: quantity
    };

    dispatch(addCart(productToAdd));
    toast.success("Added to cart!");
  };

  const handleVariantChange = (e) => {
    setSelectedVariant(e.target.value);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (product.stock || 10)) {
      setQuantity(value);
    }
  };

  return (
    <div className="card h-100 border-0 shadow-sm hover-shadow-lg transition-all duration-300" style={{ borderRadius: '12px' }}>
      {/* Image Section */}
      <div className="position-relative" style={{ height: '200px' }}>
        <img
          src={product.image || product.imageUrl}
          alt={product.title}
          className="w-100 h-100"
          style={{ objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
          }}
        />
        
        {/* Badges */}
        {product.discount && (
          <div className="position-absolute top-0 end-0 m-2">
            <span className="badge bg-success fw-bold px-2 py-1" style={{ fontSize: '0.75rem' }}>
              -{product.discount}%
            </span>
          </div>
        )}
        
        {isOutOfStock && (
          <div className="position-absolute top-0 start-0 m-2">
            <span className="badge bg-danger fw-bold px-2 py-1" style={{ fontSize: '0.75rem' }}>
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="card-body p-3 d-flex flex-column h-100">
        {/* Title and Price */}
        <div className="mb-2">
          <h6 className="card-title fw-bold text-dark mb-1" style={{ 
            fontSize: '0.95rem',
            lineHeight: '1.3',
            display: '-webkit-box', 
            '-webkit-line-clamp': '2', 
            '-webkit-box-orient': 'vertical', 
            overflow: 'hidden',
            minHeight: '2.6rem'
          }}>
            {product.title}
          </h6>
          
          <div className="d-flex align-items-center gap-2">
            {product.originalPrice && product.originalPrice !== product.price && (
              <span className="text-muted text-decoration-line-through" style={{ fontSize: '0.85rem' }}>
                ${product.originalPrice}
              </span>
            )}
            <span className="fw-bold text-primary" style={{ fontSize: '1.1rem' }}>
              ${product.price}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted mb-2" style={{ 
          fontSize: '0.8rem',
          lineHeight: '1.4',
          display: '-webkit-box', 
          '-webkit-line-clamp': '2', 
          '-webkit-box-orient': 'vertical', 
          overflow: 'hidden',
          minHeight: '2.2rem'
        }}>
          {product.description?.substring(0, 60)}
          {product.description?.length > 60 && "..."}
        </p>

        {/* Form Fields */}
        <div className="mb-2">
          {variants.length > 1 && (
            <div className="mb-2">
              <label className="form-label fw-semibold text-uppercase" style={{ fontSize: '0.7rem', marginBottom: '0.25rem' }}>
                Size
              </label>
              <select
                value={selectedVariant}
                onChange={handleVariantChange}
                className="form-select form-select-sm"
                disabled={isOutOfStock}
                style={{ fontSize: '0.8rem' }}
              >
                {variants.map((variant) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.name} - ${variant.price}
                  </option>
                ))}
              </select>
            </div>
          )}

          {!isOutOfStock && (
            <div className="mb-2">
              <label className="form-label fw-semibold text-uppercase" style={{ fontSize: '0.7rem', marginBottom: '0.25rem' }}>
                Quantity
              </label>
              <input
                type="number"
                min="1"
                max={product.stock || 10}
                value={quantity}
                onChange={handleQuantityChange}
                className="form-control form-control-sm"
                style={{ fontSize: '0.8rem' }}
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="d-flex gap-2 mt-auto">
          <Link
            to={`/product/${product.id}`}
            className="btn btn-outline-secondary btn-sm flex-fill fw-semibold"
            style={{ fontSize: '0.75rem', padding: '0.375rem 0.5rem' }}
          >
            Details
          </Link>
          
          <button
            onClick={handleAddToCart}
            className={`btn btn-sm flex-fill fw-semibold ${
              isOutOfStock 
                ? "btn-secondary disabled" 
                : "btn-primary"
            }`}
            style={{ fontSize: '0.75rem', padding: '0.375rem 0.5rem' }}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? "Unavailable" : "Add to Cart"}
          </button>
        </div>

        {/* Stock Status */}
        {isOutOfStock ? (
          <div className="alert alert-danger py-2 px-2 mt-2 mb-0 text-center" style={{ fontSize: '0.7rem' }}>
            <small className="fw-semibold">Out of stock</small>
          </div>
        ) : (
          product.stock > 0 && (
            <div className="alert alert-success py-2 px-2 mt-2 mb-0 text-center" style={{ fontSize: '0.7rem' }}>
              <small className="fw-semibold">
                {product.stock} left
              </small>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProductCard; 