import React from "react";
import { Leaf, Droplet, Sprout, Building2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SustainableFarming() {
  const sections = [
    {
      title: "💧 Water Conservation Techniques",
      icon: <Droplet className="w-8 h-8 text-blue-600" />,
      points: [
        "🌱 Drip Irrigation – Delivers water directly to roots, reducing wastage by 30-50%.",
        "🌾 Rainwater Harvesting – Collects and stores rainwater for later use in dry seasons.",
        "☀️ Solar-powered Pumps – Reduce energy costs while ensuring efficient irrigation.",
        "🌿 Mulching – Covering soil with organic material to reduce evaporation.",
        "🚜 Laser Land Leveling – Ensures even distribution of water and reduces runoff."
      ],
    },
    {
      title: "🌿 Organic Fertilizers",
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      points: [
        "🐄 Cow Dung Manure – Enhances soil fertility and microbial activity.",
        "🌻 Compost – Recycled crop residues and kitchen waste improve soil structure.",
        "🌱 Green Manuring – Nitrogen-fixing plants (like dhaincha, sunn hemp) enrich soil.",
        "🍌 Vermicomposting – Earthworms convert organic waste into nutrient-rich compost.",
        "🪱 Biofertilizers – Microorganisms like Rhizobium & Azospirillum improve absorption."
      ],
    },
    {
      title: "⚗️ Chemical Fertilizers (Use Wisely)",
      icon: <Sprout className="w-8 h-8 text-yellow-600" />,
      points: [
        "💡 Use balanced NPK (Nitrogen, Phosphorus, Potassium) fertilizers.",
        "🧪 Soil Testing before application prevents soil degradation.",
        "♻️ Integrated Nutrient Management (INM) – Mix organic & inorganic fertilizers.",
        "🌍 Use slow-release fertilizers to reduce leaching and groundwater pollution.",
        "📊 Follow government guidelines (ICAR, Krishi Vigyan Kendras)."
      ],
    },
    {
      title: "🏢 Govt-Aided Agricultural Support",
      icon: <Building2 className="w-8 h-8 text-purple-600" />,
      points: [
        "📌 Krishi Vigyan Kendras (KVKs) – Free training, soil testing, demo farming.",
        "🌾 ICAR Research Centers – New crop varieties & modern technologies.",
        "💰 Subsidy Schemes – PM-Kisan, PMFBY, Soil Health Card, PMKSY irrigation.",
        "🤝 Farmer Producer Organizations (FPOs) – Collective bargaining for better prices.",
        "📱 Digital Apps like ‘Kisan Suvidha’, ‘AgriApp’ for weather & market rates."
      ],
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <motion.h1
        className="text-3xl font-bold text-center mb-6 text-green-700"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🌍 Sustainable Farming Practices
      </motion.h1>

      <motion.p
        className="text-center text-gray-600 mb-10 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Learn how to farm smarter, save resources, and increase productivity while 
        protecting the environment. Explore water-saving techniques, fertilizers, 
        resource optimization, and government support programs designed to help farmers.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.2 }}
            className="relative bg-white rounded-2xl shadow-md hover:shadow-xl p-6 border border-gray-200 transition group overflow-hidden"
          >
            {/* border effect on hover */}
            <span className="absolute inset-0 border-2 border-transparent rounded-2xl group-hover:border-green-500 pointer-events-none transition-all"></span>

            <div className="flex items-center mb-4 space-x-3 relative z-10">
              {section.icon}
              <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 relative z-10">
              {section.points.map((point, i) => (
                <li key={i} className="leading-relaxed">{point}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
