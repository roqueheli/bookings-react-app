import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomeRoutes from "./routes/HomeRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import NotFound from "./components/notfound/NotFound";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import UserRoutes from "./routes/UserRoutes";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/*" element={<HomeRoutes />} />
          <Route path="/admin/*" element={<ProtectedRoute><AdminRoutes /></ProtectedRoute>} />
          <Route path="/user/*" element={<UserRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </AuthProvider>
  );
}

export default App;
