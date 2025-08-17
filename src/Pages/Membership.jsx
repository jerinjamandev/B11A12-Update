import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hook/useAxiosSecure';
import { Link, useNavigate } from 'react-router-dom';
import useIsMemberShip from '../hook/useIsMemberShip';
import Loading from '../components/Loading';

const MembershipPage = () => {
  const axiosSecure = useAxiosSecure()
  const { isMember } = useIsMemberShip();
  const navigate = useNavigate();
  const { data: membership, isLoading, error } = useQuery({
    queryKey: ['goldMembership'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/memberships');
      return res.data;
    },
  });


  if (isLoading) return <Loading></Loading>;
  if (error) return <div className="text-center text-red-500 py-10">Something went wrong.</div>;

   if (isMember===true&&!isLoading) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          🎉 You are already subscribed to our Gold Membership!
        </h2>
        <button onClick={() => navigate("/dashboard/my-profile")} className="btn btn-outline btn-success">
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div>
      {
        membership.map(m => (
          <div key={m._id} className="max-w-2xl mx-auto px-4 py-12">
            <div className="bg-white shadow-md rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold text-primary mb-4">
                {m?.name} Membership
              </h2>

              <p className="text-2xl font-semibold text-gray-800 mb-2">
                ${m?.price} <span className="text-sm font-normal text-gray-500">/ one time</span>
              </p>

              <div className='flex flex-col items-center'>
                <ul className="text-left list-disc list-inside text-gray-700 mb-6">
                  {m?.features?.map((feature, i) => (
                    <li key={i} className="mb-1">{feature}</li>
                  ))}
                </ul>
              </div>

              <Link to={`/payment/${m._id}`}>
                <button className="btn btn-primary btn-wide">
                  Become a Member
                </button>
              </Link>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default MembershipPage;
