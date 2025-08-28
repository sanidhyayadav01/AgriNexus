import { useState, useEffect } from "react"; 
import axios from "axios";
import SearchBar from "../components/SearchBar";
import { motion, AnimatePresence } from "framer-motion";

export default function Crops() {
  const [crops, setCrops] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await axios.get("http://localhost:5000/seed-crops");
        const data = Array.isArray(res.data) ? res.data : [];
        setCrops(data);
        setFiltered(data);
      } catch (err) {
        console.error("Error fetching crops:", err);
        setCrops([]);
        setFiltered([]);
      }
    };
    fetchCrops();
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFiltered(crops);
    } else {
      const lowerQuery = query.toLowerCase();
      setFiltered(
        crops.filter(
          (crop) => crop?.label && crop.label.toLowerCase().includes(lowerQuery)
        )
      );
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="px-4 py-8 bg-green-50 min-h-screen">
      <SearchBar placeholder="Search crops..." onSearch={handleSearch} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {filtered.length > 0 ? (
          filtered.map((crop, index) => (
            <motion.div
              key={crop._id || index}
              layout
              className="p-5 bg-white rounded-2xl shadow-md cursor-pointer relative overflow-hidden border-2 border-transparent transition-all duration-300 hover:border-green-400 hover:shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => toggleExpand(crop._id || index)}
            >
              {/* Glowing line on hover */}
              <span className="absolute inset-0 border-2 border-green-400 rounded-2xl opacity-0 pointer-events-none hover:opacity-100 transition-all duration-300"></span>


              <h2 className="text-xl font-bold text-green-700">{crop?.label || "Unnamed Crop"}</h2>

              <AnimatePresence>
                {expandedId === (crop._id || index) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 text-sm text-gray-700"
                  >
                    {/* respective crop image */}
                    <div className="w-full h-36 mb-3 flex items-center justify-center">
                      <img
                        src={`/${crop.label.toLowerCase()}.jpg`}
                        alt={crop.label}
                        className="w-full h-full object-cover rounded-lg"
                        //onError={(e) => (e.target.src = "altimage.jpg")}
                      />
                    </div>

                    <p><strong>NPK:</strong> {crop.N}, {crop.P}, {crop.K}</p>
                    <p><strong>Temp:</strong> {crop.temperature}°C, <strong>Humidity:</strong> {crop.humidity}%</p>
                    <p><strong>pH:</strong> {crop.ph}, <strong>Rainfall:</strong> {crop.rainfall} mm</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4 col-span-3">No crops found.</p>
        )}
      </div>
    </div>
  );
}
