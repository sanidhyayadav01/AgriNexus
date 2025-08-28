import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Crops from "./pages/Crops";
import Recommendation from "./pages/Recommendation";
import SoilTest from "./pages/SoilTest";
import SustainableFarming from "./pages/SustainableFarming";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crops" element={<Crops />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/soil-test" element={<SoilTest />} />
          <Route path="/sustainable-farming" element={<SustainableFarming />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
