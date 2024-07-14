import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./component/signup_login/Login";
import SignUp from "./component/signup_login/SignUp";
import Home from "./component/pages/Home";
import ViewBook from "./component/pages/ViewBook";
import AddBook from "./component/pages/AddBook";
import EditBook from "./component/pages/EditBook";
import DeleteBook from "./component/pages/DeleteBook";
import UserDashboard from "./component/UserDashboard";

const AuthRouteProvider = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      {user && user.role === "admin" && (
        <Route path="/home" element={<Home />} />
      )}
      {user && user.role === "admin" && (
        <Route path="/add" element={<AddBook />} />
      )}
      {user && user.role === "admin" && (
        <Route path="/edit/:id" element={<EditBook />} />
      )}
      {user && user.role === "admin" && (
        <Route path="/view/:id" element={<ViewBook />} />
      )}
      {user && user.role === "admin" && (
        <Route path="/delete/:id" element={<DeleteBook />} />
      )}
      {user && user.role === "user" && (
        <Route path="/user-dashboard" element={<UserDashboard />} />
      )}
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthRouteProvider />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
