import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, isAdmin, isDoctor } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole === 'ROLE_ADMIN' && !isAdmin()) {
    return <Navigate to="/home" replace />;
  }

  if (requiredRole === 'ROLE_DOCTOR' && !isDoctor() && !isAdmin()) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PrivateRoute; 