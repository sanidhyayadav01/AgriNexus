import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function Recommendation() {
  const [form, setForm] = useState({
    N: "",
    P: "",
    K: "",
    rainfall: "",
    temperature: "",
    humidity: "",
    ph: ""
  });
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult([]);
    setLoading(true);

    try {
      const payload = {
        N: Number(form.N),
        P: Number(form.P),
        K: Number(form.K),
        rainfall: Number(form.rainfall),
        temperature: Number(form.temperature),
        humidity: Number(form.humidity),
        ph: Number(form.ph),
      };

      const res = await axios.post("http://localhost:5000/recommend-crop", payload);
      setResult(res.data.recommended_crops || []);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (idx) => {
    setExpandedId(expandedId === idx ? null : idx);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-green-600 mb-4 text-center">Crop Recommendation</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6 bg-white shadow-md p-6 rounded-lg">
        {["Nitrogen (N, kg/ha)", "Phosphorus (P₂O₅, kg/ha)", "Potassium ((K₂O, kg/ha)", "Rainfall (in mm)", "temperature (°C)", "Humidity (%)", "pH"].map((field, id) => (
          <input
            key={id}
            type="number"
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field}
            min="0"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
        ))}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white rounded-lg transition ${
            loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Recommending..." : "Recommend"}
        </button>
      </form>

      {error && (
        <motion.div
          className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {result.map((item, idx) => (
            <motion.div
              key={idx}
              layout
              onClick={() => toggleExpand(idx)}
              className="p-4 bg-white rounded-lg shadow-md cursor-pointer border border-transparent hover:border-green-400 hover:shadow-lg transition relative overflow-hidden"
              whileHover={{ scale: 1.03 }}
            >
              <h2 className="text-lg font-bold text-green-600">{item.crop}</h2>
              <p className="text-gray-600 text-sm mt-1">Distance: {item.distance}</p>

              <AnimatePresence>
                {expandedId === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 text-gray-700 text-sm space-y-1"
                  >
                    <p>N: {item.details.N}, P: {item.details.P}, K: {item.details.K}</p>
                    <p>Temp: {item.details.temperature}°C, Humidity: {item.details.humidity}%</p>
                    <p>pH: {item.details.ph}, Rainfall: {item.details.rainfall} mm</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hover glow border */}
              <div className="absolute inset-0 border-2 border-green-400 rounded-lg pointer-events-none opacity-0 hover:opacity-100 transition duration-300"></div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
