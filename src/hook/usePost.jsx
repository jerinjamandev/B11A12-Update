import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from '@tanstack/react-query';
export const usePosts = ({ page = 1, tag = "", sort = "latest" }) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ['posts', { page, tag, sort }],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/posts', {
        params: { page, tag, sort }
      });
      return res.data;
    },
    keepPreviousData: true
  });
};
