import React from 'react';
import { Link } from 'react-router-dom';
import useComment from '../hook/useComment';

const PostCard = ({post}) => {
  const {comments,refetch}=useComment()
  const totalcomment=comments?.filter(c=>c.postId===post._id)
  console.log(totalcomment);
    return (
        <div>
             <Link to={`/post/${post._id}`}>
              <div
                key={post._id}
                className="border rounded p-4 shadow hover:shadow-lg cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={post.author.image || "/user.png"}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    <p className="text-sm text-gray-600">{post.tag}</p>
                  </div>
                </div>
                <p>{post.description}</p>
                <div className="text-xs text-gray-500 flex justify-between mt-2">
                  <span>{new Date(post.createdAt).toLocaleString()}</span>
                  <span>Comments: {totalcomment.length || 0}</span>
                  <span>
                    Votes: {(post.upVote || 0) - (post.downVote || 0)}
                  </span>
                </div>
              </div> 
             </Link>
        </div>
    );
};

export default PostCard;