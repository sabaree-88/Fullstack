import React from "react";
import UserLayout from "../AssetCopm/UserLayout/UserLayout";
import Collections from "./Collections";
import Banner from "./Banner";
const UserDashboard = () => {
  return (
    <>
      <UserLayout>
        <Banner />
        <Collections />
      </UserLayout>
    </>
  );
};

export default UserDashboard;
