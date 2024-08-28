import React from "react";
import { Route, Routes } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Admin from "../pages/admin/Admin";
import PlaceForm from "../components/admin/placeform/PlaceForm";
import PlaceList from "../components/admin/placelist/PlaceList";
import NotFound from "../components/notfound/NotFound";
import Login from "../components/user/Login";
import UserList from "../components/admin/userlist/UserList";
import UserRegister from "../components/user/UserRegister";
import '../Transition.css';

const AdminRoutes = () => {
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} timeout={1000} classNames="fade" >
        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/lst-place" element={<PlaceList />} />
          <Route path="/lst-users" element={<UserList />} />
          <Route path="/add-place" element={<PlaceForm />} />
          <Route path="/add-users" element={<UserRegister />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default AdminRoutes;
