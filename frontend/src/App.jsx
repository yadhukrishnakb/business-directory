import { Routes, Route, Navigate } from "react-router-dom";
import Business from "./components/Business";
import About from "./components/About";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
//import Navbar from "./components/Navbar";

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Business />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  </>
);

export default App;
