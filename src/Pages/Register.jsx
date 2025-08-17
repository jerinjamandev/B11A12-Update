import { useForm } from "react-hook-form";
import SocialLogin from "../components/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import useAxiosSecure from "../hook/useAxiosSecure";

const Register = () => {
    const { createAccount,user,loading } = useContext(AuthContext)
    const location = useLocation();
   
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()

    const onSubmit = (data) => {
        console.log("Register Data:", data);

  
        createAccount(data.email, data.password, data.name, data.photoUrl)
            .then((user) => {

                axiosSecure.post('/api/users', {
                    email: data.email,
                    name: data.name,
                    image: data.photoUrl,
                }).then(data => {
                    console.log(data.data);
                    toast.success("User created successfully!");
                    console.log("User created:", user);
                })
                navigate('/');
            })
            .catch((error) => {
                console.error(error.message);
                toast.error(error.message);
            });
    };

      useEffect(()=>{
        if (user) {
          navigate('/')
          return
        }
      },[user,navigate,loading])

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200">
            <div className="card w-full max-w-sm shadow-lg bg-base-100">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center">Register</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Name */}
                        <div className="form-control">
                            <label className="label">Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="input input-bordered"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div className="form-control">
                            <label className="label">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div className="form-control">
                            <label className="label">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="input input-bordered"
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>

                        {/* Photo URL */}
                        <div className="form-control">
                            <label className="label">Photo URL</label>
                            <input
                                type="url"
                                placeholder="Enter your photo URL"
                                className="input input-bordered"
                                {...register("photoUrl", { required: "Photo URL is required" })}
                            />
                            {errors.photoUrl && <p className="text-red-500 text-sm">{errors.photoUrl.message}</p>}
                        </div>

                        {/* Submit */}
                        <div className="form-control mt-4">
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                    </form>

                    {/* Toggle */}
                    <p className="text-sm mt-3 text-center">
                        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                    </p>

                    {/* Optional: Social Login */}
                    <div className="divider">OR</div>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Register;
