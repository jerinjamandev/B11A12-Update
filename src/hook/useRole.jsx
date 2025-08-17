import React, { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const {user}=useContext(AuthContext)
   const axiosSecure=useAxiosSecure()

   const {data:isAdmin='',isLoading}=useQuery({
    queryKey:['role',user?.email],
    queryFn:async()=>{
    const res= await axiosSecure.get(`/api/user/role?email=${user.email}`)
     return res.data?.role
    }
   })

   return {isAdmin,isLoading}
};

export default useRole;