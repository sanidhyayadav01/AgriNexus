import { useState } from "react";
import ShimmerCard from "./ShimmerCard";

const CropCard = ({ crop, onSelect }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      onClick={() => onSelect(crop)}
      tabIndex={0}
      className="bg-white shadow-lg rounded-2xl p-4 cursor-pointer hover:scale-105 transform transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      {!loaded && <ShimmerCard />}

      <img
        src={crop.image}
        alt={crop.name}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`rounded-xl h-40 w-full object-cover mb-3 transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {loaded && (
        <>
          <h3 className="text-lg font-semibold text-gray-800">{crop.name}</h3>
          <p className="text-gray-500 text-sm">{crop.soil}</p>
        </>
      )}
    </div>
  );
};

export default CropCard;