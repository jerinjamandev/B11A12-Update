import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import useRole from '../hook/useRole';
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading';

const AdminPrivate = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const {isAdmin,isLoading}=useRole()
  

    if (loading||isLoading) {
        return <Loading></Loading>
    }

        if (!user || isAdmin !== 'admin') {
        return <Navigate  to="*"></Navigate>
    }

    return children;
};

export default AdminPrivate;