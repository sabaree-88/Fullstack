import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import AuthRouteProvider from "./AuthRouteProvider";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <AuthRouteProvider />
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
