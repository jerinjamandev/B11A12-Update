import React, { useState } from "react";

const Banner = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput.trim());
    setSearchInput('')
  };

  return (
    <div
      className="hero min-h-[350px] mt-16"
      style={{
        backgroundImage:
          "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className=" text-center text-neutral-content max-w-lg px-4">
        <h1 className="mb-4 text-5xl font-bold">Welcome to TalkNest</h1>
        <p className="mb-6">
          Search posts by tags and explore popular discussions.
        </p>
        <form onSubmit={handleSubmit} className=" flex gap-2 mx-auto w-[95%]">
          <input
            type="text"
            placeholder="Search by tag..."
            className="input input-bordered flex-grow text-black"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Banner;
