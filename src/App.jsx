import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomeRoutes from "./routes/HomeRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import NotFound from "./components/notfound/NotFound";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/*" element={<HomeRoutes />} />
          <Route path="/admin/*" element={<ProtectedRoute><AdminRoutes /></ProtectedRoute>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
