import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosSecure from "../hook/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";

const AddTagForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const onSubmit = async (data) => {
    const tag = {
      name: data.name.trim(),
      createdAt: new Date(),
    };

    if (!tag.name) return toast.error("Tag name is required!");

    try {
      const res = await axiosSecure.post("/api/tags", tag);
        
      if (res.data.insertedId) {
        toast.success("Tag added successfully!");
        reset();
        queryClient.invalidateQueries(["tags"]);
      } else {
        toast.error(res.data?.message);
      
      }
    } catch (err) {
      toast.error("Error: " + err.message);
    }

    console.log(tag);
  };

  return (
    <div className="bg-base-100 shadow p-6 rounded-lg mt-10">
      <h2 className="text-xl font-semibold mb-4"> Add New Tag</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 items-center">
        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="Enter tag name (e.g. React)"
          className="input input-bordered w-full max-w-xs"
        />
        <button type="submit" className="btn btn-primary">Add Tag</button>
      </form>
    </div>
  );
};

export default AddTagForm;
