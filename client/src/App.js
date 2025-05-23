import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home.jsx";
import List from "./pages/list/list.jsx";
import Hotel from "./pages/hotel/Hotel.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register";
import BecomeSupplier from "./pages/becomeSupplier/BecomeSupplier.jsx";
import { CurrencyProvider } from "./context/CurrencyContext";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";

function App() {
  return (
    <CurrencyProvider>
      <BrowserRouter>
        <Routes>          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/become-supplier" element={<BecomeSupplier />} />
        </Routes>
        <ScrollToTop />
      </BrowserRouter>
    </CurrencyProvider>
  );
}

export default App;
