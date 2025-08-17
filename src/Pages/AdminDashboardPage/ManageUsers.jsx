import { useState } from "react";
import {  useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useUserData from "../../hook/useUserData";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;
const {users:data,isLoading}=useUserData(page,search,limit)

  const makeAdminMutation = useMutation({
    mutationFn: async (email) => {
      return axiosSecure.patch(`/api/users/admin/${email}`);
    },
    onSuccess: () => {
      toast.success("User promoted to admin!");
      queryClient.invalidateQueries(["users"]);
    },
  });

  
  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl font-bold mb-4">👥 Manage Users</h2>

      <input
        type="text"
        placeholder="Search by name"
        className="input input-bordered mb-4 w-full max-w-xs"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Subscription</th>
            <th>Make Admin</th>
          </tr>
        </thead>
        <tbody>
          {data?.users?.map((user, idx) => (
            <tr key={user._id}>
              <td>{(page - 1) * limit + idx + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.isMember ? (
                  <span className="badge badge-success">Member</span>
                ) : (
                  <span className="badge">Free</span>
                )}
              </td>
              <td>
                {user.role === "admin" ? (
                  <span className="text-green-500 font-semibold">Admin</span>
                ) : (
                  <button
                    onClick={() => makeAdminMutation.mutate(user.email)}
                    className="btn btn-sm btn-outline btn-accent"
                  >
                    Make Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: Math.ceil(data?.total / limit) }, (_, i) => (
          <button
            key={i}
            className={`btn btn-sm mx-1 ${page === i + 1 ? "btn-primary" : "btn-outline"}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
