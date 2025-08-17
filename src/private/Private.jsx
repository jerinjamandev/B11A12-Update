import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import Loading from '../components/Loading';


const Private = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
  

    if (loading) {
        return <Loading></Loading>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default Private;