import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Layout from '../common/components/Layout/Layout';
import { useSelector } from 'react-redux';

const ProtectedWrapper = ({ role }) => {

  try {
    const getRole = useSelector((state) => state.user.role)

    console.log(role,getRole);

    if (!getRole) {
      return <Navigate to="/login" />;
    }

    console.log(role[0],getRole , role[0] !== getRole )

    if (role[0] !== getRole) {
      return <Navigate to="/pageNotFound" />;
    }

    return <Layout />

  } catch (error) {
    <Navigate to="/notFound" />
  }

};

export default ProtectedWrapper;
