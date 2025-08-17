import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "https://final-server-11.vercel.app",

});

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);

  axiosSecure.interceptors.request.use(config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('jwt-token')}`
    return config;
  });


  axiosSecure.interceptors.response.use(response => {
    return response;
  }, error => {
    console.log(error)
    if (error.status === 401 || error.status === 403) {
      logOut()
        .then(() => {
          console.log('sign out user for 401 status code')
        })
        .catch(err => {
          console.log(err)
        })
    }
    return Promise.reject(error)
  })

  return axiosSecure;
};

export default useAxiosSecure;
