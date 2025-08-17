import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCount = () => {
    const axiosSecure=useAxiosSecure()

    const {data:count,isLoading,isError}=useQuery({
        queryKey:['count'],
        queryFn:async()=>{
          const res=await axiosSecure.get('/api/counting')
          return res.data
        }
    })

    return {count,isLoading}
};

export default useCount;