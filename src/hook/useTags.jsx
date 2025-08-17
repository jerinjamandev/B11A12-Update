import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosSecure from './useAxiosSecure';


const useTags = () => {
    const axiosSecure=useAxiosSecure()
    const fetchTags = async () => {
        const res = await axiosSecure.get('/api/tags');
        return res.data;
    };
    return useQuery({
        queryKey: ['tags'],
        queryFn: fetchTags,
    });
};

export default useTags;
