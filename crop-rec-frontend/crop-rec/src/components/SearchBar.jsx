import { useState } from "react";

export default function SearchBar({ placeholder, onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(query);
      console.log("Searching for:", query);
    }
  };

  return (
    <div className="w-full flex justify-center my-6">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full max-w-lg px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}
