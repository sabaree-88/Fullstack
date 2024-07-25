import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { RiLogoutBoxLine } from "react-icons/ri";
import Spinner from "../AssetCopm/Spinner";
import UserLayout from "./UserLayout";
import Products from "./Products";

const UserDashboard = () => {
  return (
    <>
      <UserLayout>
        <Products />
      </UserLayout>
    </>
  );
};

export default UserDashboard;
