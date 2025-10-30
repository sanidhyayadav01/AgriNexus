const ShimmerCard = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 animate-pulse">
      <div className="rounded-xl h-40 w-full bg-gray-300 mb-3"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
};

export default ShimmerCard;