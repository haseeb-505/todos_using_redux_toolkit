import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black shadow-md">
      {/* Navbar */}
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="text-xl font-bold text-white">
            Todos App
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-blue-400">
            Home
          </Link>
          <Link to="/about" className="text-white hover:text-blue-400">
            About
          </Link>
          <Link to="/contact" className="text-white hover:text-blue-400">
            Contact Us
          </Link>
          <Link to="/login" className="text-white hover:text-blue-400">
            Sign In
          </Link>
          <Link to="/signup" className="text-white hover:text-blue-400">
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-gray-900 text-white space-y-4 p-4">
          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-400">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-400">
            Contact Us
          </Link>
          <Link to="/login" className="hover:text-blue-400">
            Sign In
          </Link>
          <Link to="/signup" className="hover:text-blue-400">
            Sign Up
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Create Your Todos here
        </h1>
      </div>
    </header>
  );
};

export default Header;