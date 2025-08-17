import React, { useState } from "react";
import { usePosts } from "../hook/usePost";
import useTags from "../hook/useTags";
import TagsSection from "../components/Tags";
import PostCard from "../components/PostCard";
import Loading from "../components/Loading";

const AllPost = () => {
  const [activeTag, setActiveTag] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("latest");
  const [searchTag, setSearchTag] = useState("");
  const tagToUse = searchTag || activeTag;

  const { data: posts = [], isLoading, isError } = usePosts({
    page,
    tag: tagToUse,
    sort: sortBy,
  });

  const { data: tags = [] } = useTags();

  const totalPosts = 50; // replace with backend total count
  const totalPages = Math.ceil(totalPosts / 5);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 md:px-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mt-10"> All Posts</h2>
        <p className="text-gray-500 text-sm">
          Explore all posts with filters, tags, and sorting options
        </p>
      </div>

      {/* Tags Section */}
      <div className="flex flex-col md:flex-row justify-around items-center mb-6 gap-4">
        <TagsSection
          tags={tags}
          activeTag={activeTag}
          onTagSelect={(tag) => {
            setActiveTag(tag);
            setSearchTag("");
            setPage(1);
          }}
        />

        {/* Sort Button */}
        <button
          className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition"
          onClick={() => {
            setSortBy(sortBy === "latest" ? "popular" : "latest");
            setPage(1);
          }}
        >
          Sort by: {sortBy === "latest" ? "Latest" : "Popularity"}
        </button>
      </div>

      {/* Posts Section */}
      <div className="container mx-auto max-w-5xl">
        {isLoading && <Loading />}
        {isError && (
          <p className="text-center text-red-500">
            ❌ Failed to load posts. Please try again.
          </p>
        )}

        {!isLoading && !isError && posts.length === 0 && (
          <p className="text-center text-gray-500">No posts found 🚫</p>
        )}

        {!isLoading && !isError && posts.length > 0 && (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-10 gap-2 flex-wrap">
          <button
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-lg ${
                page === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllPost;
