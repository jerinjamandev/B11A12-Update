import React from "react";

const TagsSection = ({ tags, activeTag, onTagSelect }) => {
  return (
    <div className="my-6 flex flex-wrap gap-3 justify-center">
      {tags.map((tag) => (
        <button
          key={tag._id}
          onClick={() => onTagSelect(tag.name)}
          className={`btn btn-sm ${
            activeTag === tag.name ? "btn-primary" : "btn-outline"
          }`}
        >
          {tag.name}
        </button>
      ))}
      {activeTag && (
        <button
          onClick={() => onTagSelect("")}
          className="btn btn-sm btn-warning"
        >
          Clear Filter
        </button>
      )}
    </div>
  );
};

export default TagsSection;
