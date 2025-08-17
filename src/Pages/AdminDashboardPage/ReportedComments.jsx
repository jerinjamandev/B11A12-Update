import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";


const ReportedComments = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();


    const { data: comments = [], isLoading } = useQuery({
        queryKey: ["reported-comments"],
        queryFn: async () => {
            const res = await axiosSecure.get("/api/comments");
            return res.data?.filter((comment) => comment.feedback); // show only reported
        },
    });




    const deleteComment = useMutation({
        mutationFn: async (id) => {
            return axiosSecure.delete(`/api/comments/${id}`);
        },
        onSuccess: () => {
            toast.success("Comment deleted");
            queryClient.invalidateQueries(["reported-comments"]);
        },
    });


    const ignoreReport = useMutation({
        mutationFn: async (id) => {
            return axiosSecure.patch(`/api/comments/${id}/ignore`);
        },
        onSuccess: () => {
            toast.success("Report ignored");
            queryClient.invalidateQueries(["reported-comments"]);
        },
    });


    // Warn mutation
    const warnUser = useMutation({
        mutationFn: async (email) => {
            const res = await axiosSecure.get(`/api/users/is-warned/${email}`);
            if (res.data.warned) {
                toast.warning("User already warned");
                return null;
            }

            return axiosSecure.patch(`/api/users/warn/${email}`);

        },
        onSuccess: (res) => {
            if (!res) return;
            toast.success("User warned");
            queryClient.invalidateQueries(["reported-comments"]);
            queryClient.invalidateQueries(["warnedStatus"]);

        },
    });


    if (isLoading) return <Loading></Loading>;

    return (
        <div className=" overflow-x-auto table table-xs table-pin-rows table-pin-cols ">
            <h2 className="text-2xl font-bold mb-6"> Reported Comments</h2>

            {comments.length === 0 ? (
                <p>No reported comments found.</p>
            ) : (
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Comment</th>
                            <th>Commenter Email</th>
                            <th>Reporter Email</th>
                            <th>Feedback</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map((c, i) => (
                            <tr key={c._id}>
                                <td>{i + 1}</td>
                                <td>
                                    {c.text?.length > 20 ? (
                                        <details className="dropdown">
                                            <summary className="cursor-pointer">
                                                {c.text.slice(0, 20)}...
                                            </summary>
                                            <span className="dropdown-content p-2 bg-base-200 rounded">
                                                {c.text}
                                            </span>
                                        </details>
                                    ) : (
                                        c.text
                                    )}
                                </td>
                                <td>{c.email}</td>
                                <td>{c.reporterEmail}</td>
                                <td>
                                    <span className="badge badge-warning">{c.feedback}</span>
                                </td>
                                <td className="space-x-2">
                                    <button
                                        onClick={() => deleteComment.mutate(c._id)}
                                        className="btn btn-sm btn-error"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => ignoreReport.mutate(c._id)}
                                        className="btn btn-sm btn-outline"
                                    >
                                        Ignore
                                    </button>
                                    <button

                                        onClick={() => warnUser.mutate(c.email)}
                                        className="btn btn-sm btn-warning"
                                    >
                                        Warn
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ReportedComments;
