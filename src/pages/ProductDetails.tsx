import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, ShoppingCart, Truck, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Card, CardContent, CardDescription,  CardTitle } from "../components/ui/Card";
import type { Product } from "../hooks/useProducts";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 flex items-center justify-center min-h-[600px]">
        <div className="space-y-4 w-full">
          <div className="h-96 bg-slate-200 rounded-lg animate-pulse" />
          <div className="h-8 bg-slate-200 rounded animate-pulse w-3/4" />
          <div className="h-6 bg-slate-200 rounded animate-pulse w-1/2" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto p-6 flex items-center justify-center min-h-[600px]">
        <Card className="text-center p-12">
          <CardTitle>Product not found</CardTitle>
          <CardDescription>The product you're looking for doesn't exist.</CardDescription>
        </Card>
      </div>
    );
  }

  const discountPercent = Math.floor(Math.random() * 20) + 5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="flex flex-col gap-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0 bg-white flex items-center justify-center" style={{ height: "500px" }}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-contain h-full w-full p-8"
                />
              </CardContent>
            </Card>
            <div className="flex gap-3">
              <Badge variant="secondary" className="bg-red-100 text-red-700">
                -{discountPercent}%
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                In Stock
              </Badge>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                    {product.title}
                  </h1>
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <span className="text-sm text-slate-600">(128 reviews)</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 rounded-full transition-all ${
                    isFavorite
                      ? "bg-red-100 text-red-600"
                      : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                  }`}
                >
                  <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Price Section */}
              <div className="space-y-3 py-6 border-y border-slate-200">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-slate-900">
                    ${(product.price * (1 - discountPercent / 100)).toFixed(2)}
                  </span>
                  <span className="text-lg text-slate-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-green-600 font-semibold">
                  Save ${(product.price * (discountPercent / 100)).toFixed(2)} ({discountPercent}%)
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900">About this product</h3>
              <p className="text-slate-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Truck className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-slate-900">Free Shipping</p>
                    <p className="text-sm text-slate-600">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-slate-900">30-Day Returns</p>
                    <p className="text-sm text-slate-600">Hassle-free returns available</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quantity and Action Buttons */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-slate-900 font-semibold">Quantity:</span>
                <div className="flex items-center border border-slate-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 transition"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 gap-2 py-6 text-lg"
                  onClick={() => alert(`Added ${quantity} items to cart!`)}
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 py-6 text-lg"
                  onClick={() => alert("Proceeding to checkout...")}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
