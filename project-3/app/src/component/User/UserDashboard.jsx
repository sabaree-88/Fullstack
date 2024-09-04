import React from "react";
import UserLayout from "../AssetCopm/UserLayout/UserLayout";
import Collections from "./Collections";
import Banner from "./Banner";
// import ShopByCategory from "./blocks/ShopByCategory";
// import PromoSection from "./blocks/PromoSection";
const UserDashboard = () => {
  return (
    <>
      <UserLayout>
        {/* <PromoSection /> */}
        <Banner />
        {/* <ShopByCategory /> */}
        <Collections />
      </UserLayout>
    </>
  );
};

export default UserDashboard;
