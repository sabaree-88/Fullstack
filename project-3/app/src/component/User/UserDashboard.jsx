import React from "react";
import UserLayout from "./UserLayout";
import Collections from "./Collections";
import Banner from "./Banner";
import ProductSlider from "./ProductSlider";

const UserDashboard = () => {
  return (
    <>
      <UserLayout>
        <Banner />
        {/* <ProductSlider /> */}
        <Collections />
      </UserLayout>
    </>
  );
};

export default UserDashboard;
