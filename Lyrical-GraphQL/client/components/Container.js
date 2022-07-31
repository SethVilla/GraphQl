import React from 'react';
import { Outlet } from 'react-router-dom';

export const Container = () => (
  <div className="container">
    <Outlet />
  </div>
);
