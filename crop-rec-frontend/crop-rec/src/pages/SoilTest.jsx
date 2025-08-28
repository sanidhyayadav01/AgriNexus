import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function SoilTest() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    soilNotes: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.post("http://localhost:5000/soil-test", form);
      setSuccess("Your soil test request has been sent successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        soilNotes: ""
      });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-lg mx-auto bg-white shadow-md p-6 rounded-lg my-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-2xl font-bold text-green-600 mb-4">Free Soil Test Request</h1>
      <p className="text-gray-700 mb-4">
        Fill out your details below and we will contact you to schedule your soil test.
      </p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {[
          { name: "name", placeholder: "Full Name" },
          { name: "email", placeholder: "Email" },
          { name: "phone", placeholder: "Phone Number" },
          { name: "address", placeholder: "Full Address" },
          { name: "city", placeholder: "City" },
          { name: "state", placeholder: "State" },
          { name: "zip", placeholder: "ZIP/Postal Code" },
          { name: "soilNotes", placeholder: "Additional Notes / Soil Observations" }
        ].map((field, idx) => (
          <input
            key={idx}
            type={field.name === "email" ? "email" : "text"}
            name={field.name}
            placeholder={field.placeholder}
            value={form[field.name]}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            required={field.name !== "soilNotes"}
          />
        ))}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white rounded-lg transition ${loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
        >
          {loading ? "Sending..." : "Submit Request"}
        </button>
      </form>
      {success && <p className="text-green-600 mt-3">{success}</p>}
      {error && <p className="text-red-600 mt-3">{error}</p>}
    </motion.div>
  );
}
