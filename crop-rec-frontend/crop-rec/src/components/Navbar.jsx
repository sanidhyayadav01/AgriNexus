import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo + Heading */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/AGRI.png"  
            alt="AgriMantra Logo"
            className="h-8 w-8 object-contain"
          />
          <h1 className="text-xl font-bold text-green-600 cursor-pointer">
            AgriNexus
          </h1>
        </Link>

        {/* Navbar Links */}
        <div className="flex gap-6">
          {["/", "/crops", "/recommendation", "/soil-test", "/sustainable-farming"].map((path, idx) => (
            <Link key={idx} to={path} className="relative">
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
          ))}
        </div>
      </div>
    </nav>
  );
}
