const CropCard = ({ crop, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(crop)}
      className="bg-white shadow-lg rounded-2xl p-4 cursor-pointer hover:scale-105 transform transition duration-300"
    >
      <img
        src={crop.image}
        alt={crop.name}
        className="rounded-xl h-40 w-full object-cover mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-800">{crop.name}</h3>
      <p className="text-gray-500 text-sm">{crop.soil}</p>
    </div>
  );
};

export default CropCard;
