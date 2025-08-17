import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import useRole from '../../hook/useRole';
import AdminStats from '../../components/AdminStatus';
import useCount from '../../hook/useCount';
import AdminPieChart from '../../components/AdminPieChart';
import AddTagForm from '../../components/AddTagForm';
import Loading from '../../components/Loading';

const AdminProfile = () => {
    const { user } = useContext(AuthContext)
    const { isAdmin, isLoading } = useRole()
    const {count}=useCount()
   
    console.log(count);
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-4">Admin Profile</h2>

            {/* User Info */}
            <div className="flex items-center gap-6 bg-base-100 p-4 rounded-lg shadow mb-6">
                <img src={user?.photoURL || '/user.png'} alt="User" className="w-24 h-24 rounded-full border" />
                <div>
                    <h3 className="text-xl font-semibold">{user?.displayName}</h3>
                    <p className="text-gray-600">{user?.email}</p>

                    {/* Badges */}
                    <div className="mt-2 flex gap-2">

                        {isAdmin === "admin" && (
                            <span className="badge badge-warning uppercase">
                                {isAdmin}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Show Chart And Counting */}

            <AdminStats
           count={count}
            />

            {/* show charts */}

           <AdminPieChart></AdminPieChart>

           {/* tag form */}

           <div className='flex flex-col items-center'>
            <AddTagForm></AddTagForm>
           </div>
        </div>
    );
};

export default AdminProfile;
