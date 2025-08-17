import React from "react";
import useAnnouncement from "../hook/useAnouncement";

const AnnouncementPage = () => {
    const {announcements}=useAnnouncement()

  if (!announcements || announcements.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 text-lg">No announcements available yet 📭</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 md:px-8">
      {/* Header */}
      <div className="text-center my-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          📢 Announcements
        </h1>
        <p className="text-gray-500 mt-2">
          Stay up-to-date with the latest updates and news
        </p>
      </div>

      {/* Announcements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {announcements.map((item) => (
          <div
            key={item._id}
            className="bg-white border rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col justify-between"
          >
            {/* Title */}
            <h3 className="font-semibold text-xl text-gray-800 mb-2">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4">{item.description}</p>

            {/* Author & Date */}
            <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-3">
              <div className="flex items-center gap-2">
                <img
                  src={item.author?.image || "/user.png"}
                  alt={item.author?.name || "Author"}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-medium">{item.author?.name}</span>
              </div>
              <span className="text-xs">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementPage;
