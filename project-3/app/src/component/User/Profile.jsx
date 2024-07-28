import React from "react";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p className="mt-2">
        <strong>Name:</strong> {user.name}
      </p>
      <p className="mt-2">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="mt-2">
        <strong>Role:</strong> {user.role}
      </p>
    </div>
  );
};

export default Profile;
