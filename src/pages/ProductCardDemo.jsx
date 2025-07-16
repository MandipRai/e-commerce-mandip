import React from "react";
import ProductCard from "../components/ProductCard";

const ProductCardDemo = () => {
  // Test data with various scenarios
  const testProducts = [
    {
      id: "1",
      title: "Premium Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
      price: "199.99",
      originalPrice: "249.99",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      stock: 15,
      discount: 20,
      variants: [
        { id: "black", name: "Black", price: "199.99" },
        { id: "white", name: "White", price: "199.99" },
        { id: "blue", name: "Blue", price: "219.99" }
      ]
    },
    {
      id: "2",
      title: "Smart Fitness Watch",
      description: "Advanced fitness tracking with heart rate monitoring, GPS, and 7-day battery life. Water-resistant design.",
      price: "299.99",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      stock: 0,
      variants: [
        { id: "42mm", name: "42mm", price: "299.99" },
        { id: "46mm", name: "46mm", price: "329.99" }
      ]
    },
    {
      id: "3",
      title: "Organic Cotton T-Shirt",
      description: "Comfortable and breathable organic cotton t-shirt. Available in multiple sizes and colors.",
      price: "29.99",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      stock: 8,
      variants: [
        { id: "s", name: "Small", price: "29.99" },
        { id: "m", name: "Medium", price: "29.99" },
        { id: "l", name: "Large", price: "29.99" },
        { id: "xl", name: "X-Large", price: "32.99" }
      ]
    },
    {
      id: "4",
      title: "Professional Camera Lens",
      description: "High-quality 50mm f/1.8 prime lens perfect for portrait photography and low-light situations.",
      price: "399.99",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
      stock: 3,
      variants: [
        { id: "canon", name: "Canon Mount", price: "399.99" },
        { id: "nikon", name: "Nikon Mount", price: "419.99" },
        { id: "sony", name: "Sony Mount", price: "439.99" }
      ]
    },
    {
      id: "5",
      title: "Wireless Gaming Mouse",
      description: "High-precision gaming mouse with customizable RGB lighting and programmable buttons.",
      price: "79.99",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      stock: 25,
      discount: 15
    },
    {
      id: "6",
      title: "Premium Coffee Maker",
      description: "Automatic coffee maker with programmable timer and built-in grinder. Perfect for coffee enthusiasts.",
      price: "149.99",
      image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
      stock: 0
    }
  ];

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">Product Card Component Demo</h1>
          <p className="text-center text-muted mb-5">
            Showcasing responsive product cards with various states and features
          </p>
        </div>
      </div>
      
      <div className="row">
        {testProducts.map((product) => (
          <div key={product.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default ProductCardDemo; 