import React, { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useIsMemberShip = () => {
  const {user}=useContext(AuthContext)
  const email = user?.email;

  const axiosSecure=useAxiosSecure()

  // Fetch recent 3 posts by the user
  const { data: isMember,isLoading,refetch } = useQuery({
    queryKey: ['isMember', email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/membership?email=${email}`);
      return res.data;
    },
    enabled: !!email,
  });
return {isMember,isLoading,refetch}
};

export default useIsMemberShip;