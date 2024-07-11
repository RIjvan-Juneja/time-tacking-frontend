import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Custom hook to get auth state

const ProtectedRoute = ({ requiredPermissions, children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const hasPermission = requiredPermissions.every(permission => user.permissions.includes(permission));

  if (!hasPermission) {
    return <Navigate to="/403" />; // Redirect to a "403 Forbidden" page
  }

  return children;
};

export default ProtectedRoute;
