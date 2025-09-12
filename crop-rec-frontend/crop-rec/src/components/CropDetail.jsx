const CropDetail = ({ crop, onClose }) => {
  if (!crop) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-3/4 max-h-[90vh] overflow-y-auto animate-fadeIn">
        <button
          onClick={onClose}
          className="text-red-500 font-bold mb-4 hover:underline"
        >
          Close
        </button>
        <div className="flex gap-6">
          <img src={crop.image} alt={crop.name} className="w-60 h-60 rounded-xl object-cover" />
          <div>
            <h2 className="text-2xl font-bold mb-2">{crop.name}</h2>
            <p><strong>NPK:</strong> {crop.npk}</p>
            <p><strong>Temperature:</strong> {crop.temperature}</p>
            <p><strong>Rainfall:</strong> {crop.rainfall}</p>
            <p><strong>pH:</strong> {crop.pH}</p>
            <p><strong>Humidity:</strong> {crop.humidity}</p>
            <p><strong>Diseases:</strong> {crop.diseases.join(", ")}</p>
            <p><strong>Fertilizers:</strong> Chemical: {crop.fertilizers.chemical.join(", ")} | Organic: {crop.fertilizers.organic.join(", ")}</p>
            <p><strong>Input Type:</strong> {crop.input_type}</p>
            <p><strong>Soil:</strong> {crop.soil}</p>
            <p><strong>Price:</strong> {crop.price}</p>
            <p><strong>Crop Rotation:</strong> {crop.crop_rotation.join(", ")}</p>
            <p><strong>Uses:</strong> {crop.uses.join(", ")}</p>
            <p><strong>Sustainable Practices:</strong> {crop.sustainable.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropDetail;
