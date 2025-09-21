import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen pt-20">
        <Outlet />
      </div>
    </>
  );
};

export default PrivateRoute;