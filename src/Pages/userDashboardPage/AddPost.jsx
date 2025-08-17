import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";

import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useIsMemberShip from "../../hook/useIsMemberShip";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const AddPost = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure()
    const { isMember } = useIsMemberShip();
    const { user } = useContext(AuthContext)
    const [postCount, setPostCount] = useState(0);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const navigate = useNavigate();
    const [loading,setLoading]=useState(false)

    const { data: postCountData,refetch,isLoading } = useQuery({
        queryKey: ["user-post-count", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/user-post-count?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    useEffect(() => {


   if (postCountData?.count !== undefined) {
            setPostCount(postCountData.count);
        }

        axiosSecure.get("/api/tags").then(res => {
            setTags(res.data.map(tag => ({ value: tag.name, label: tag.name })));
        });
    }, [user?.email,postCountData]);

    const onSubmit = async (data) => {
        if (!selectedTag) return toast.error("Tag is required");
        setLoading(true)
        const newPost = {
            author: {
                name: user?.displayName,
                email: user?.email,
                image: user?.photoURL
            },
            title: data.title,
            description: data.description,
            tag: selectedTag.value,
            upVote: 0,
            downVote: 0,
        };

        const res = await axiosSecure.post("/api/posts", newPost);
      
        if (res.data?.message==="Post created") {
            reset();
            setSelectedTag(null);
            toast.success("Post added successfully!");
              navigate("/dashboard/my-posts");
            setLoading(false)
            refetch()
        }
    };

    if (!isMember && postCount >= 5) {
        return (
            <div className="text-center py-20">
                <p className="text-xl font-semibold mb-4">
                    You've reached your post limit. Become a member to add more posts.
                </p>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/membership")}
                >
                    Become a Member
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-6">Add New Post</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block mb-1">Author</label>
                    <input
                        value={user?.displayName || ""}
                        readOnly
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="block mb-1">Email</label>
                    <input
                        value={user?.email || ""}
                        readOnly
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="block mb-1">Title</label>
                    <input
                        type="text"
                        {...register("title", { required: true })}
                        placeholder="Post Title"
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="block mb-1">Description</label>
                    <textarea
                        {...register("description", { required: true })}
                        className="textarea textarea-bordered w-full"
                        placeholder="Post Description"
                    ></textarea>
                </div>

                <div>
                    <label className="block mb-1">Tag</label>
                    <Select
                        options={tags}
                        value={selectedTag}
                        onChange={setSelectedTag}
                        placeholder="Select a tag"
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block mb-1">UpVote</label>
                        <input
                            value={0}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="flex-1">
                        <label className="block mb-1">DownVote</label>
                        <input
                            value={0}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                <button disabled={loading} type="submit" className="btn btn-success w-full mt-4">
                    Submit Post
                </button>
            </form>
        </div>
    );
};

export default AddPost;
