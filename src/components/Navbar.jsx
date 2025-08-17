
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import useAnnouncement from '../hook/useAnouncement';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import useRole from '../hook/useRole';
import logo from '../assets/image/logo.png';

const Navbar = () => {
    const { announcements } = useAnnouncement()
    const { isAdmin } = useRole()

    console.log(isAdmin);

    const { user, logOut } = useContext(AuthContext)

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">

                <div className="dropdown lg:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost">
                        <FiMenu className="text-2xl" />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu gap-4 menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/all-post">All Post</Link></li>
                        {user&&<li><Link to="/membership">Membership</Link></li>}
                        {
                            user && <li><Link to={`${isAdmin == 'user' ? '/dashboard/my-profile' : '/dashboard/admin-profile'}`}>Dashboard</Link></li>
                        }
                       {
                        user&&  <li>
                        <Link to={"/announcement"}>
                            <div className="indicator">
                                <FaBell className="text-[22px]" />
                                {announcements.length > 0 && (
                                    <span className="indicator-item badge badge-secondary text-white">
                                        {announcements.length}
                                    </span>
                                )}
                            </div>
                        </Link>
                        </li>
                       }
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl font-bold">
                    <img src={logo} width={150} height={250} alt="" />
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-semibold">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/all-post">All Post</Link></li>

                    {user&&<li><Link to="/membership">Membership</Link></li>}
                    {
                        user && <li><Link to={`${isAdmin == 'user' ? '/dashboard/my-profile' : '/dashboard/admin-profile'}`}>Dashboard</Link></li>
                    }
                   {
                        user&&  <li>
                        <Link to={"/announcement"}>
                            <div className="indicator">
                                <FaBell className="text-[22px]" />
                                {announcements.length > 0 && (
                                    <span className="indicator-item badge badge-secondary text-white">
                                        {announcements.length}
                                    </span>
                                )}
                            </div>
                        </Link>
                        </li>
                       }
                </ul>
            </div>

            <div className="navbar-end">
                {!user ? (
                    <Link to="/login" className="btn btn-primary btn-sm">
                        Join Us
                    </Link>
                ) : (
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0} role="button"
                            className="btn btn-ghost btn-circle avatar"

                        >
                            <div className="w-10 rounded-full">
                                <img alt="User Avatar" src={user.photoURL || "/user.png"} />
                            </div>
                        </div>

                        <ul
                            tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                        >
                            <li><span className="font-bold">{user?.displayName}</span></li>

                            <li><button onClick={logOut}>Logout</button></li>
                        </ul>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
