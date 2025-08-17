import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useComment = () => {
    const axiosSecure=useAxiosSecure()
      const { data: comments = [],isLoading ,refetch } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/comments`);
            return res.data;
        }
    });

    return {comments,isLoading,refetch}
};

export default useComment;