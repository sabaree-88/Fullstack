import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./component/UserLogin/Login";
import SignUp from "./component/UserLogin/SignUp";
import ViewBook from "./component/Admin/ViewBook";
import AddBook from "./component/Admin/AddBook";
import EditBook from "./component/Admin/EditBook";
import DeleteBook from "./component/Admin/DeleteBook";
import UserDashboard from "./component/User/UserDashboard";
import AdminDashboard from "./component/Admin/AdminDashboard";
import Users from "./component/Admin/Users";
import AllBooks from "./component/Admin/AllBooks";

const AuthRouteProvider = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Crud operation for admin */}
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

      {user && user.role === "admin" && (
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      )}
      {user && user.role === "admin" && (
        <Route path="/all-books" element={<AllBooks />} />
      )}
      {user && user.role === "admin" && (
        <Route path="/user" element={<Users />} />
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
