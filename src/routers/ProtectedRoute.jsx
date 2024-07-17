import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Layout from '../common/components/Layout/Layout';
// import { useAuth } from '../hooks/useAuth'; // Custom hook to get auth state

const ProtectedRoute = ({ role }) => {
  // const { user } = useAuth();
  // console.log(children);
  console.log(role,'roleSS');
  const isAllowed = true;
  
  if (!isAllowed) {
    return <Navigate to="/notFound" />;
  } 

  // const hasPermission = requiredPermissions.every(permission => user.permissions.includes(permission));

  // if (!hasPermission) {
  //   return <Navigate to="/404" />; 
  // }

  return <Layout />
};

export default ProtectedRoute;
