import React from "react";
import { Routes, Route } from "react-router-dom";
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
import UpdateUser from "./component/AssetCopm/UpdateUser";
import ForgotPassword from "./component/UserLogin/ForgotPassword";
import ResetPassword from "./component/UserLogin/ResetPassword";
import ProductOverview from "./component/User/ProductOverview";
import Profile from "./component/AssetCopm/Profile";
import Error from "./component/AssetCopm/utils/Error";
import ProtectedRoute from "./ProtectedRoute";

const AuthRouteProvider = () => {
  const { user } = useAuth();

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
          <Route
            path="/profile"
            element={
              <ProtectedRoute role="admin">
                <Profile />
              </ProtectedRoute>
            }
          />
        </>
      )}

      {user && user.role === "user" && (
        <>
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-user/:id"
            element={
              <ProtectedRoute role="user">
                <UpdateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute role="user">
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-details/:id"
            element={
              <ProtectedRoute role="user">
                <ProductOverview />
              </ProtectedRoute>
            }
          />
        </>
      )}

      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default AuthRouteProvider;
