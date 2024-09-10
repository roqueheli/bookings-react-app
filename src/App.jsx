import { Route, Routes } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomeRoutes from "./routes/HomeRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import UserRoutes from "./routes/UserRoutes";
import "./Transition.css";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Header />
      <div className="content">
        <TransitionGroup>
          <CSSTransition key={location.key} timeout={1000} classNames="fade" >
            <Routes>
              <Route path="/*" element={<HomeRoutes />} />
              <Route path="/admin/*" element={<ProtectedRoute> <AdminRoutes /> </ProtectedRoute>} />
              <Route path="/user/*" element={<UserRoutes />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>
      <Footer />
    </AuthProvider>
  );
}

export default App;
