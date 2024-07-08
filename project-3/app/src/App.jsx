// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditBook from "./component/pages/EditBook";
import DeleteBook from "./component/pages/DeleteBook";
import ViewBook from "./component/pages/ViewBook";
import Home from "./component/pages/Home";
import AddBook from "./component/pages/AddBook";
import Login from "./component/signup_login/Login";
import SignUp from "./component/signup_login/SignUp";
import { AuthProvider } from "./context/AuthContext.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/edit/:id" element={<EditBook />} />
          <Route path="/delete/:id" element={<DeleteBook />} />
          <Route path="/view/:id" element={<ViewBook />} />
          <Route path="/add" element={<AddBook />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
