import { useForm } from "react-hook-form";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAnnouncement from "../../hook/useAnouncement";

const MakeAnnouncement = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const {refetch}=useAnnouncement()

  const onSubmit = async (data) => {
    const announcement = {
      title: data.title,
      description: data.description,
      author: {
        name: user?.displayName || "Admin",
        image: user?.photoURL || "/user.png",
      },
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/api/announcements", announcement);
      if (res.data.insertedId) {
        toast.success("Announcement added successfully!");
        reset();
        refetch()
      } else {
        toast.error("Failed to add announcement");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6"> Make Announcement</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Author</label>
          <input
            value={user?.displayName || "Admin"}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Author Image</label>
          <input
            value={user?.photoURL || "/user.png"}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="Enter announcement title"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
            placeholder="Write the announcement..."
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit Announcement
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
