import React, { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useLatestMyPost = () => {
  const {user}=useContext(AuthContext)
  const email = user?.email;

  const axiosSecure=useAxiosSecure()

  // Fetch recent 3 posts by the user
  const { data: posts = [],isLoading } = useQuery({
    queryKey: ['my-recent-posts', email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/posts-by-user?email=${email}&limit=3`);
      return res.data;
    },
    enabled: !!email,
  });
return {posts,isLoading}
};

export default useLatestMyPost;