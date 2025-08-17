import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useWarnedStatus = (email) => {
  const axiosSecure = useAxiosSecure();

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["warnedStatus", email],
    queryFn: async () => {
      if (!email) return { warned: false };
      const res = await axiosSecure.get(`/api/users/is-warned/${email}`);
      return res.data;
    },
    enabled: !!email, // only run if email exists
  });

  return {
    warned: data?.warned || false,
    isLoading,
    isError,
  };
};

export default useWarnedStatus;
