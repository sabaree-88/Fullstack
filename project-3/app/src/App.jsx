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
  const { user } = useAuth();

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/home" /> : <SignUp />} />
          <Route path="/home" element={!user ? <Navigate to="/" /> : (
            user.role === "admin" ? <Home /> : <HomeUser />
          )} />
          <Route path="/edit/:id" element={user && user.role === "admin" ? <EditBook /> : <Navigate to="/" />} />
          <Route path="/delete/:id" element={user && user.role === "admin" ? <DeleteBook /> : <Navigate to="/" />} />
          <Route path="/view/:id" element={<ViewBook />} />
          <Route path="/add" element={user && user.role === "admin" ? <AddBook /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
