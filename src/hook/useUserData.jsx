import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const useUserData = (page,search,limit) => {
     const axiosSecure = useAxiosSecure();
    const { data:users=[], isLoading } = useQuery({
    queryKey: ["users", page, search,limit],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/users?page=${page}&limit=${limit}&search=${search}`);
      return res.data;
    },
  });

  return {users,isLoading}

};

export default useUserData;