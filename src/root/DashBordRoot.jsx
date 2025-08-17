import { Link, Outlet, useNavigate } from "react-router-dom";
import { FiMenu } from 'react-icons/fi';
import { FaHome } from "react-icons/fa";
import useRole from "../hook/useRole";
import Loading from "../components/Loading";
import { useEffect } from "react";
const DashboardLayout = () => {
    const { isAdmin, isLoading } = useRole()
    console.log(isAdmin);






    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content  p-4">

                <div className="flex items-center gap-3">
                    <label htmlFor="my-drawer-2" className="btn  drawer-button lg:hidden">
                        <FiMenu></FiMenu>
                    </label>
                    <div className="text-lg mb-2  pb-2 lg:hidden block">
                        <span className="font-semibold">{isAdmin === 'admin' ? "Admin Dashboard" : "User Dashboard"}</span>
                    </div>
                </div>

                <Outlet />
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-1 font-semibold">
                    <li className="text-lg mb-2 border-b pb-2">
                        <span>{isAdmin === 'admin' ? "Admin Dashboard" : "User Dashboard"}</span>
                    </li>

                    {isAdmin === 'admin' ? (
                        <>
                            <li>
                                <Link to="/dashboard/admin-profile">Admin Profile</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/manage-users">Manage Users</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/reports">Reported Comments</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/announcement">Make Announcement</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/dashboard/my-profile">My Profile</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/add-post">Add Post</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/my-posts">My Posts</Link>
                            </li>
                        </>
                    )}
                    <li className="mt-4 border-t pt-2">
                        <Link to="/"><FaHome></FaHome> Back to Home</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;
