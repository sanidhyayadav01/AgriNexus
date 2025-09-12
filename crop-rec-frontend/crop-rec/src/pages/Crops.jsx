import { useState } from "react";
import { crops } from "../data/crops";
import SearchBar from "../components/SearchBar";
import CropCard from "../components/CropCard";
import CropDetail from "../components/CropDetail";

const CropPage = () => {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [filteredCrops, setFilteredCrops] = useState(crops);

  const handleSearch = (query) => {
    const result = crops.filter((crop) =>
      crop.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCrops(result);
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
        Crop Knowledge Center
      </h1>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCrops.map((crop) => (
          <CropCard key={crop.id} crop={crop} onSelect={setSelectedCrop} />
        ))}
      </div>
      {selectedCrop && (
        <CropDetail crop={selectedCrop} onClose={() => setSelectedCrop(null)} />
      )}
      <h1>Image source : https://www.vecteezy.com</h1>
    </div>
  );
};

export default CropPage;
