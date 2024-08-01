import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import AuthRouteProvider from "./AuthRouteProvider";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <AuthRouteProvider />
          <ToastContainer />
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
