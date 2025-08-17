import React, { useState } from "react";
import { usePosts } from "../hook/usePost";
import Banner from "../components/Banner";
import TagsSection from "../components/Tags";
import PostCard from "../components/PostCard";
import useTags from "../hook/useTags";
import useAnnouncement from "../hook/useAnouncement";
import AnnouncementSection from "../components/AnnouncementSection";
import Loading from "../components/Loading";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";


const HomePage = () => {
  const [searchTag, setSearchTag] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("latest");

  const tagToUse = searchTag || activeTag;

  const { data: posts = [], isLoading, isError } = usePosts({
    page,
    tag: tagToUse,
    sort: sortBy,
  });



  const {data:tags=[]}=useTags()


  const totalPosts = 50; 
  const totalPages = Math.ceil(totalPosts / 5);

  return (
    <div>
      <Banner
        onSearch={(val) => {
          setSearchTag(val);
          setActiveTag("");
          setPage(1);
        }}
      />

      <TagsSection
        tags={tags}
        activeTag={activeTag}
        onTagSelect={(tag) => {
          setActiveTag(tag);
          setSearchTag("");
          setPage(1);
        }}
      />

      <div className="text-center mb-4">
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => {
            setSortBy(sortBy === "latest" ? "popular" : "latest");
            setPage(1);
          }}
        >
          Sort by: {sortBy === "latest" ? "Latest" : "Popularity"}
        </button>
      </div>

      <div className="container mx-auto max-w-4xl px-4">
        {isLoading && <Loading></Loading>}
        {isError && <p className="text-center text-red-500">Failed to load posts</p>}

        {!isLoading && !isError && posts.length === 0 && (
          <p className="text-center">No posts found.</p>
        )}

        {!isLoading && !isError && posts.length > 0 && (
          <div className="space-y-4">
            {posts.map((post) => (
             <PostCard key={post._id} post={post}></PostCard>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="btn-group mt-8 flex justify-center flex-wrap gap-2">
          <button
            className="btn btn-sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`btn btn-sm ${page === i + 1 ? "btn-active" : ""}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="btn btn-sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          >
            Next
          </button>
        </div>

<Testimonials></Testimonials>
<Newsletter></Newsletter>
      </div>
    </div>
  );
};

export default HomePage;
