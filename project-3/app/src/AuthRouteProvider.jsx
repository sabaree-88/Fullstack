import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
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
import UpdateUser from "./component/Admin/UpdateUser";
import ForgotPassword from "./component/UserLogin/ForgotPassword";
import ResetPassword from "./component/UserLogin/ResetPassword";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

const AuthRouteProvider = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "user") {
        navigate("/user-dashboard");
      }
    }
  }, [user, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      {user && user.role === "admin" && (
        <>
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute role="admin">
                <AddBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute role="admin">
                <EditBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view/:id"
            element={
              <ProtectedRoute role="admin">
                <ViewBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/delete/:id"
            element={
              <ProtectedRoute role="admin">
                <DeleteBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-books"
            element={
              <ProtectedRoute role="admin">
                <AllBooks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute role="admin">
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-user/:id"
            element={
              <ProtectedRoute role="admin">
                <UpdateUser />
              </ProtectedRoute>
            }
          />
        </>
      )}

      {user && user.role === "user" && (
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      )}
    </Routes>
  );
};

export default AuthRouteProvider;
