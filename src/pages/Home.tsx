import React from "react";
import { useProducts } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Card, CardContent } from "../components/ui/Card";

const Home: React.FC = () => {
  const { products, loading } = useProducts();
  const navigate = useNavigate();
  const [favorites, setFavorites] = React.useState<number[]>([]);

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">
            Featured Products
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4 animate-pulse">
                <div className="h-64 bg-slate-300 rounded-lg" />
                <div className="h-4 bg-slate-300 rounded w-3/4" />
                <div className="h-4 bg-slate-300 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                MegaMart
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover our amazing collection of premium products with unbeatable prices
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex gap-3 justify-center flex-wrap mb-8">
            <Badge variant="default" className="cursor-pointer">All Products</Badge>
            <Badge variant="outline" className="cursor-pointer">Electronics</Badge>
            <Badge variant="outline" className="cursor-pointer">Clothing</Badge>
            <Badge variant="outline" className="cursor-pointer">Books</Badge>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <CardContent className="p-0">
                {/* Image Container */}
                <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 h-64 overflow-hidden flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Badge */}
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-blue-800">
                    {Math.floor(Math.random() * 40) + 10}% OFF
                  </Badge>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => toggleFavorite(product.id, e)}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
                      favorites.includes(product.id)
                        ? "bg-red-100 text-red-600 scale-110"
                        : "bg-white text-slate-400 hover:text-red-600"
                    }`}
                  >
                    <Heart
                      size={18}
                      fill={favorites.includes(product.id) ? "currentColor" : "none"}
                    />
                  </button>

                  {/* Discount Banner */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      className="w-full gap-2 text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert("Added to cart!");
                      }}
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">
                        ★
                      </span>
                    ))}
                    <span className="text-xs text-slate-500 ml-2">
                      ({Math.floor(Math.random() * 500) + 50})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-slate-900">
                        ${(product.price * 0.8).toFixed(2)}
                      </span>
                      <span className="text-sm text-slate-400 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-green-600 font-semibold">
                      Free delivery
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
