import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../hook/useAxiosSecure';
import Swal from 'sweetalert2'

const MyPosts = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: posts = [], refetch } = useQuery({
        queryKey: ['my-posts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/my-posts?email=${user.email}`);
            return res.data;
        }
    });

    const handleDelete = async (id) => {
     
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                   axiosSecure.delete(`/api/posts/${id}`)
                   .then(data=>{
                   if (data.data?.acknowledged===true) {
                      refetch()
                   }
                   })
       
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    };

    return (
        <div className="overflow-x-auto mt-6">
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Votes</th>
                        <th>Comments</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr key={post._id}>
                            <td>{post.title}</td>
                            <td>{(post.upVote || 0) - (post.downVote || 0)}</td>
                            <td>
                                <Link to={`/dashboard/comments/${post._id}`} className="btn btn-sm btn-info">
                                    Comments
                                </Link>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(post._id)} className="btn btn-sm btn-error">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyPosts;
