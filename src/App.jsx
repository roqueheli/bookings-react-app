import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Admin from "./pages/admin/Admin";
import PlaceForm from "./components/placeform/PlaceForm";
import PlaceCardDetail from "./components/placecard/PlaceCardDetail";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/place/:id" element={<PlaceCardDetail />} />
          <Route path="/admin/*" element={<Admin />}></Route>
          <Route path="/admin/add-place" element={<PlaceForm />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
