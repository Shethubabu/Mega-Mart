import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Heart, Menu, X } from "lucide-react";
import { Button } from "./ui/Button";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount] = useState(0);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div
            className="cursor-pointer flex items-center"
            onClick={() => navigate("/")}
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-2 rounded-lg mr-3">
              <div className="text-xl font-bold">MM</div>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 hidden sm:block">
              MegaMart
            </h1>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-4 pr-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <Search
                size={18}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Icon - Only show on mobile */}
            <button className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition">
              <Search size={20} className="text-slate-600" />
            </button>

            {/* Wishlist */}
            <button className="hidden sm:flex p-2 hover:bg-slate-100 rounded-lg transition relative group">
              <Heart size={20} className="text-slate-600 group-hover:text-red-600 transition" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center text-xs">
                0
              </span>
            </button>

            {/* Cart */}
            <button className="p-2 hover:bg-slate-100 rounded-lg transition relative group">
              <ShoppingCart size={20} className="text-slate-600 group-hover:text-blue-600 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X size={20} className="text-slate-600" />
              ) : (
                <Menu size={20} className="text-slate-600" />
              )}
            </button>

            {/* Sign In Button */}
            <Button variant="outline" size="sm" className="hidden sm:flex">
              Sign In
            </Button>
          </div>
        </div>

        {/* Mobile Search - Shown when menu opens */}
        {isOpen && (
          <div className="mt-4 md:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-4 pr-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search
                size={18}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              />
            </div>
            <Button className="w-full mt-3">Sign In</Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
