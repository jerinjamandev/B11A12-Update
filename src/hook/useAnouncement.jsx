import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosSecure from './useAxiosSecure';

const useAnnouncement = () => {
    
    const axiosSecure=useAxiosSecure()
    const fetchAnnouncements = async () => {
        const { data } = await axiosSecure.get('/api/announcements');
        return data;
    };
    const {data:announcements=[],isLoading,refetch}= useQuery({
        queryKey: ['announcements'],
        queryFn: fetchAnnouncements,
    });

    return {announcements,isLoading,refetch}
};

export default useAnnouncement;