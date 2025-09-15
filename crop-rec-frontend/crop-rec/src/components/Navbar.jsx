import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo + Heading */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="AGRI.png"
            alt="AgriMantra Logo"
            className="h-8 w-8 object-contain"
          />
          <h1 className="text-xl font-bold text-green-600 cursor-pointer">
            AgriNexus
          </h1>
        </Link>

        {/* Hamburger Button for Mobile */}
        <button
          className="lg:hidden text-green-600 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Navbar Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } absolute top-full left-0 w-full bg-white lg:static lg:flex lg:items-center lg:gap-6 lg:w-auto lg:block`}
        >
          <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-0">
            {["/", "/crops", "/recommendation", "/soil-test", "/sustainable-farming"].map(
              (path, idx) => (
                <Link key={idx} to={path} className="relative" onClick={() => setIsOpen(false)}>
                  <span
                    className={`hover:text-green-600 font-medium ${
                      location.pathname === path ? "text-green-600" : ""
                    }`}
                  >
                    {path === "/"
                      ? "Home"
                      : path
                          .replace("/", "")
                          .replace("-", " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                  {location.pathname === path && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 right-0 -bottom-1 h-[2px] bg-green-600"
                    />
                  )}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
