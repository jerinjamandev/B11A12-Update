import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { useContext, useState } from 'react';
import useComment from '../../hook/useComment';
import { AuthContext } from '../../provider/AuthProvider';

const feedbackOptions = [
    "Inappropriate Language",
    "Irrelevant Comment",
    "Spam or Advertisement"
];

const Comments = () => {
const {user}=useContext(AuthContext)
    const { postId } = useParams();
    const axiosSecure = useAxiosSecure();
    const {comments,refetch,isLoading}=useComment()
    const [feedbackState, setFeedbackState] = useState({});

    const [modalComment, setModalComment] = useState(null);




    const handleFeedbackChange = (commentId, feedback) => {
        setFeedbackState((prev) => ({
            ...prev,
            [commentId]: { feedback, canReport: true }
        }));
    };

    const handleReport = async (commentId) => {
        const feedback = feedbackState[commentId]?.feedback;
        if (!feedback) return;

        await axiosSecure.patch(`/api/comments/report/${commentId}`, {
            feedback,
            reporterEmail: user?.email
        });

        setFeedbackState((prev) => ({
            ...prev,
            [commentId]: { ...prev[commentId], canReport: false }
        }));
        refetch();
    };

    if(isLoading){
        return <>loading</>
    }

    return (
        <div className="overflow-x-auto mt-6">
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Comment</th>
                        <th>Feedback</th>
                        <th>Report</th>
                    </tr>
                </thead>
                <tbody>
                    {comments?.filter(c=>c.postId===postId).map(comment => (
                        <tr key={comment._id}>
                            <td>{comment.email}</td>
                            {comment.text.length > 20 ? (
                                <>
                                    {comment.text.slice(0, 20)}...
                                    <button onClick={() => setModalComment(comment.text)} className="text-blue-500 underline ml-1">
                                        Read More
                                    </button>
                                </>
                            ) : (
                                comment.text
                            )}
                            <td>
                                <select
                                    className="select select-bordered select-sm"
                                    onChange={(e) => handleFeedbackChange(comment._id, e.target.value)}
                                    defaultValue=""
                                    disabled={comment.isReported}
                                >
                                    <option disabled value="">Select Feedback</option>
                                    {feedbackOptions.map(option => (
                                        <option key={option}>{option}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <button
                                    className="btn btn-sm btn-warning"
                                    onClick={() => handleReport(comment._id)}
                                    disabled={!feedbackState[comment._id]?.canReport || comment.isReported}
                                >
                                    {comment.isReported ? "Reported" : "Report"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalComment && (
                <dialog id="my_modal" className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Full Comment</h3>
                        <p className="py-4">{modalComment}</p>
                        <div className="modal-action">
                            <button onClick={() => setModalComment(null)} className="btn">
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}

        </div>
    );
};

export default Comments;
