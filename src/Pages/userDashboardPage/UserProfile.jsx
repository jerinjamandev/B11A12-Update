import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

import axios from 'axios';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';
import useLatestMyPost from '../../hook/useLatestMyPost';
import useIsMemberShip from '../../hook/useIsMemberShip';
import useWarnedStatus from '../../hook/useWarnedStatus';
import Loading from '../../components/Loading';

const MyProfile = () => {
    const { user } = useContext(AuthContext)
    const { posts, isLoading } = useLatestMyPost()

    const { isMember } = useIsMemberShip()
    const { warned } = useWarnedStatus(user.email);
    console.log(warned);

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-4">My Profile</h2>

            {/* User Info */}
            <div className="flex items-center gap-6 bg-base-100 p-4 rounded-lg shadow mb-6">
                <img src={user?.photoURL || '/user.png'} alt="User" className="w-24 h-24 rounded-full border" />
                <div>
                    <h3 className="text-xl font-semibold">{user?.displayName}</h3>
                    <p className="text-gray-600">{user?.email}</p>

                    {/* Badges */}
                    <div className="mt-2 flex gap-2">
                        {isMember === false && (

                            <span className="badge badge-bronze">
                                🥉 Bronze Badge
                            </span>
                        )


                        }
                        {isMember === true && (
                            <span className="badge badge-warning">
                                🥇 Gold Badge
                            </span>
                        )}
                    </div>

                    {warned===true && (
                        <div className="alert  mt-4">
                            ⚠️ Warning: You have been warned by the Admin due to inappropriate activities.
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Posts */}
            <div>
                <h3 className="text-2xl font-semibold mb-3">My Recent Posts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {posts.map((post) => (
                        <div key={post._id} className="card bg-base-100 shadow-md border">
                            <div className="card-body">
                                <h2 className="card-title text-lg">{post.title}</h2>
                                <p className="text-sm text-gray-600">Tag: {post.tag}</p>
                                <div className="flex justify-between items-center text-sm mt-3">
                                    <span>🗓 {new Date(post.createdAt).toLocaleDateString()}</span>
                                    <span>👍 {post.upVote || 0} | 👎 {post.downVote || 0}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {posts.length === 0 && <p className="text-gray-500">No posts available.</p>}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
