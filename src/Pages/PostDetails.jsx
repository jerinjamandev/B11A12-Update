import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useContext, useMemo, useState } from "react";

import {
  FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon, LinkedinShareButton,
  LinkedinIcon
} from "react-share";
import { toast } from "react-toastify";
import useAxiosSecure from "../hook/useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";
import useComment from "../hook/useComment";
import Loading from "../components/Loading";

const PostDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");
  const { comments, refetch } = useComment()




  // Fetch post details
  const { data: post, isLoading } = useQuery({
    queryKey: ["post-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/posts/${id}`);
      return res.data;
    },
  });

  const hasVoted = useMemo(() => {
    return post?.votes?.some(v => v.email === user?.email);
  }, [post, user]);



  console.log(comments);

  // Vote
  const voteMutation = useMutation({
    mutationFn: async (type) => {
      return axiosSecure.patch(`/api/posts/${id}/vote`, {
        email: user.email,
        type,
      });
    },
    onSuccess: () => {
      toast.success("Voted!");
      queryClient.invalidateQueries(["post-details", id]);
    },
    onError: () => {
      toast.error("Already voted!");
    },
  });

  const handleVote = (type) => {
    if (!user) return toast.error("Please login to vote");
    voteMutation.mutate(type);
  };

  // Comment Submit
  const commentMutation = useMutation({
    mutationFn: async () => {
      return axiosSecure.post("/api/comments", {
        postId: id,
        email: user.email,
        text: commentText,
      });
    },
    onSuccess: () => {
      toast.success("Comment added!");
      queryClient.invalidateQueries(["comments", id]);
      setCommentText("");
      refetch()
    },
    onError: () => {
      toast.error("Failed to add comment");
    },
  });

  const handleComment = (e) => {
    e.preventDefault();
    if (!user) return toast.error("Login to comment");
    if (!commentText.trim()) return toast.error("Comment cannot be empty");
    commentMutation.mutate();
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="max-w-3xl mx-auto my-10 px-4 space-y-6">
      <div className="bg-white shadow-md rounded p-6">
        <div className="flex items-center gap-4">
          <img src={post.author.image} className="w-12 h-12 rounded-full" />
          <div>
            <h4 className="text-lg font-semibold">{post.author.name}</h4>
            <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-4">{post.title}</h2>
        <p className="my-3 text-gray-700">{post.description}</p>
        <span className="badge badge-info">{post.tag}</span>

        <div className="flex items-center gap-4 mt-4">
          {
            user ? <>
              <button disabled={hasVoted} className="btn btn-outline btn-success" onClick={() => handleVote("up")}>👍 {post.upVote || 0}</button>
              <button disabled={hasVoted} className="btn btn-outline btn-error" onClick={() => handleVote("down")}>👎 {post.downVote || 0}</button>
            </> : <p className="text-gray-500 mb-2">Login to Vote</p>
          }
          <FacebookShareButton url={window.location.href}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <WhatsappShareButton url={window.location.href}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>

          <LinkedinShareButton url={window.location.href}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>
      </div>

      {/* Comments */}
      <div className="bg-base-100 p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-4">Comments</h3>

        {user ? (
          <form onSubmit={handleComment} className="mb-4 flex gap-2">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              type="text"
              placeholder="Write a comment..."
              className="input input-bordered w-full"
            />
            <button className="btn btn-primary" type="submit">Post</button>
          </form>
        ) : (
          <p className="text-gray-500 mb-2">Login to comment</p>
        )}

        {comments?.filter(c => c.postId === id).map((c, i) => (
          <div key={i} className="border-t pt-3 mt-3">
            <div className="flex items-center gap-2">
              <img src={c.image} className="w-8 h-8 rounded-full" />
              <strong>{c.name}</strong>
              <span className="text-xs text-gray-500 ml-auto">{new Date(c.createdAt).toLocaleTimeString()}</span>
            </div>
            <p className="mt-2">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetails;
