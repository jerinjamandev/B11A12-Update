import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useCount from '../hook/useCount';
import Loading from './Loading';
const COLORS = ['#4F46E5', '#16A34A', '#F59E0B']; // Blue, Green, Yellow

const AdminPieChart = () => {
const {count,isLoading}=useCount()
  const charts = [
    { name: 'Posts', value: count?.postCount },
    { name: 'Users', value: count?.userCount },
    { name: 'Comments', value: count?.commentCount },
  ];

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="bg-white shadow rounded p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Platform Overview</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={charts}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            outerRadius={100}
            dataKey="value"
          >
            {charts.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminPieChart;
