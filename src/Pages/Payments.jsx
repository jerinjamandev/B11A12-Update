import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hook/useAxiosSecure";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import useIsMemberShip from "../hook/useIsMemberShip";
import Loading from "../components/Loading";

const MembershipDetails = () => {
  const stripePromise = loadStripe("pk_test_51NrHklD5Wdzsp3Yv0Pu1egUNOgwqMIyEPdG4Da7J7KwZHrPntRSnLPsyLLLY5pebotkczy2ZENIlwzZwB0rmn1kr00FQYHxViG");
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext)
  const { isMember,refetch } = useIsMemberShip();
  const navigate = useNavigate();

  const { data: membership, isLoading, error } = useQuery({
    queryKey: ["membership", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/memberships/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;
  if (error) return <div className="text-red-500 text-center">Error loading membership</div>;


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
    <div className="max-w-2xl mx-auto py-10 px-4 bg-white shadow rounded">
      <h2 className="text-3xl font-bold mb-4">{membership.title || "Gold Membership"}</h2>
      <p className="text-lg mb-2">Price: ${membership.price}</p>
      <div className='flex flex-col items-left'>
        <ul className="text-left list-disc list-inside text-gray-700 mb-6">
          {membership?.features?.map((feature, i) => (
            <li key={i} className="mb-1">{feature}</li>
          ))}
        </ul>
      </div>
      {/* payment */}

      <Elements stripe={stripePromise}>
        <CheckoutForm membership={membership} user={user} refetch={refetch}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default MembershipDetails;
