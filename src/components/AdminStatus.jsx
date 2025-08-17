const AdminStats = ({count }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
      
      {/* 🟦 Post Count */}
      <div className="stat bg-blue-100 shadow-md rounded-lg text-center p-6">
        <div className="stat-title text-blue-600 font-medium">Total Posts</div>
        <div className="stat-value text-blue-900 text-4xl font-bold">{count?.postCount||0}</div>
        <div className="stat-desc text-sm text-gray-600">All posts by users</div>
      </div>

      {/* 🟩 User Count */}
      <div className="stat bg-green-100 shadow-md rounded-lg text-center p-6">
        <div className="stat-title text-green-600 font-medium">Total Users</div>
        <div className="stat-value text-green-900 text-4xl font-bold">{count?.userCount||0}</div>
        <div className="stat-desc text-sm text-gray-600">Registered forum members</div>
      </div>

      {/* 🟨 Comment Count */}
      <div className="stat bg-yellow-100 shadow-md rounded-lg text-center p-6">
        <div className="stat-title text-yellow-600 font-medium">Total Comments</div>
        <div className="stat-value text-yellow-900 text-4xl font-bold">{count?.commentCount||0}</div>
        <div className="stat-desc text-sm text-gray-600">All comments on posts</div>
      </div>

    </div>
  );
};

export default AdminStats;
