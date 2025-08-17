import { useForm } from "react-hook-form";
import SocialLogin from "../components/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
  const { user,LoginUser,loading } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    LoginUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log("Logged in user:", loggedUser);

        toast.success("Login successful!");
        navigate('/');
      })
      .catch((error) => {
        console.error(error.message);
        toast.error("Login failed: " + error.message);
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
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
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

            {/* Submit */}
            <div className="form-control mt-4">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>

          {/* Toggle */}
          <p className="text-sm mt-3 text-center">
            New here? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
          </p>

          {/* Optional: Social Login */}
          <div className="divider">OR</div>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
