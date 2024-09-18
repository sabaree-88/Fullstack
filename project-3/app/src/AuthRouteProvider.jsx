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
import UpdateUser from "./component/Profile/UpdateUser";
import ForgotPassword from "./component/UserLogin/ForgotPassword";
import ResetPassword from "./component/UserLogin/ResetPassword";
import ProductOverview from "./component/User/utils/ProductOverview";
import Profile from "./component/Profile/Profile";
import Error from "./component/AssetCopm/utils/Error";
import ProtectedRoute from "./ProtectedRoute";
import FavouritesPage from "./component/User/utils/FavouritesPage";
import Cart from "./component/User/utils/Cart";
import CategoryList from "./component/Categories/CategoryList";
import AddCategory from "./component/Categories/AddCategory";
import EditCategory from "./component/Categories/EditCategory";
import DeleteCategory from "./component/Categories/DeleteCategory";
import Category from "./component/User/utils/Category";
import ProductCollections from "./component/User/ProductCollections";
import ContactUs from "./component/User/ContactUs";
import SearchBar from "./component/Search";
import Message from "./component/Admin/Message";
import CheckoutPage from "./component/Order/CheckoutPage";
import OrderSummaryPage from "./component/Order/OrderSummaryPage";
import OrderHistoryPage from "./component/Order/OrderHistoryPage";
import PaymentPage from "./component/Order/PaymentPage";
import TrackOrder from "./component/Order/TrackOrder";
import AdminOrderTable from "./component/Admin/ManageOrders/AdminOrderTable";

const AuthRouteProvider = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/search" element={<SearchBar />}></Route>

      <Route path="/checkout" element={<CheckoutPage />} />
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
          <Route
            path="/categories"
            element={
              <ProtectedRoute role="admin">
                <CategoryList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-categories"
            element={
              <ProtectedRoute role="admin">
                <AddCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-categories/:id"
            element={
              <ProtectedRoute role="admin">
                <EditCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/delete-categories/:id"
            element={
              <ProtectedRoute role="admin">
                <DeleteCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/message"
            element={
              <ProtectedRoute role="admin">
                <Message />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-table"
            element={
              <ProtectedRoute role="admin">
                <AdminOrderTable />
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

          <Route
            path="/favourites"
            element={
              <ProtectedRoute role="user">
                <FavouritesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute role="user">
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category"
            element={
              <ProtectedRoute role="user">
                <Category />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product-collection"
            element={
              <ProtectedRoute role="user">
                <ProductCollections />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact-us"
            element={
              <ProtectedRoute role="user">
                <ContactUs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-summary"
            element={
              <ProtectedRoute role="user">
                <OrderSummaryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-history"
            element={
              <ProtectedRoute role="user">
                <OrderHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/track-order/:orderId"
            element={
              <ProtectedRoute role="user">
                <TrackOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-success"
            element={
              <ProtectedRoute role="user">
                <PaymentPage />
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
