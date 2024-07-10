import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EditBook from "./component/pages/EditBook";
import DeleteBook from "./component/pages/DeleteBook";
import ViewBook from "./component/pages/ViewBook";
import Home from "./component/pages/Home";
import AddBook from "./component/pages/AddBook";
import Login from "./component/signup_login/Login";
import SignUp from "./component/signup_login/SignUp";
import { AuthProvider, useAuth } from "./context/AuthContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

const AppRoutes = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={!user ? <Login /> : <Navigate to="/home" />} />
      <Route
        path="/signup"
        element={!user ? <SignUp /> : <Navigate to="/home" />}
      />
      <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
      <Route path="/edit/:id" element={<EditBook />} />
      <Route path="/delete/:id" element={<DeleteBook />} />
      <Route path="/view/:id" element={<ViewBook />} />
      <Route path="/add" element={<AddBook />} />
    </Routes>
  );
};

export default App;
