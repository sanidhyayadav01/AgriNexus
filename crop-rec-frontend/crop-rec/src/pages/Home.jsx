import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    { title: "Wide Crop Database", desc: "Access data for over 50+ crops to optimize your yield." },
    { title: "Smart Recommendations", desc: "Get crop suggestions based on soil and weather conditions." },
    { title: "Sustainable Farming", desc: "Learn methods that save water, fertilizer, and resources." },
  ];

  const stats = [
    { label: "Crops Available", value: 90 },
    { label: "Farmers and Institutes Helped", value: 1200 },
    { label: "Recommendations Made", value: 1500 },
  ];

  return (
    <div className="space-y-16">

      {/* Hero Section */}
      <motion.div
        className="text-center py-20 bg-green-50"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold text-green-600">Welcome to AgriNexus</h1>
        <p className="mt-4 text-lg text-gray-700">
          Smart crop recommendations for sustainable farming
        </p>
        <div className="mt-8 flex justify-center gap-6">
          <Link
            to="/crops"
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            View Crops
          </Link>
          <Link
            to="/recommendation"
            className="px-6 py-3 bg-gray-200 rounded-lg shadow hover:bg-gray-300 transition"
          >
            Get Recommendation
          </Link>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {features.map((f, i) => (
          <div
            key={i}
            className="relative p-6 bg-white rounded-lg overflow-hidden group hover:shadow-xl transition"
          >
            <span className="absolute inset-0 border-2 border-transparent rounded-lg 
                   group-hover:border-green-500 group-hover:shadow-lg transition-all pointer-events-none"></span>
            <h2 className="text-xl font-bold text-green-600 relative z-10">{f.title}</h2>
            <p className="mt-2 text-gray-600 relative z-10">{f.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* How It Works Section */}
      <motion.div className="bg-green-100 py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-green-700">How It Works</h2>
          <p className="text-gray-700">
            1. Input your soil nutrients and climate data <br />
            2. Get personalized crop recommendations <br />
            3. Follow suggested best practices to maximize yield
          </p>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {stats.map((s, i) => (
          <div key={i} className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-4xl font-bold text-green-600">{s.value}+</h3>
            <p className="mt-2 text-gray-700">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Final Call to Action */}
      <motion.div className="text-center py-16">
        <h2 className="text-3xl font-bold text-green-600">Start Your Smart Farming Journey</h2>
        <div className="mt-6 flex justify-center gap-6">
          <Link
            to="/recommendation"
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            Get Recommendation
          </Link>
          <Link
            to="/soil-test"
            className="px-6 py-3 bg-gray-200 rounded-lg shadow hover:bg-gray-300 transition"
          >
            Free Soil Test
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
