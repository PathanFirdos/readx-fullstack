// src/ProfileLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';

const ProfileLayout = () => {
  return (
    <div>
      <h1>Your Profile</h1>
      <Outlet />
    </div>
  );
};

export default ProfileLayout;
