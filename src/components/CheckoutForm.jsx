import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import useAxiosSecure from '../hook/useAxiosSecure';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const CheckoutForm = ({ membership, user,refetch }) => {
    const stripe = useStripe();
    const elements = useElements()
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;
        try {
            const { data } = await axiosSecure.post("/api/create-payment-intent", {
                price: membership.price,
            });

            const { clientSecret } = data;

            console.log(clientSecret);

            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: membership.title,
                        email: user?.email,
                        
                    },
                },
            });

            if (error) {
                toast.error(error.message);
                setLoading(false);
                return;
            }

            if (paymentIntent.status === "succeeded") {
                toast.success("Payment Successful!");
                await axiosSecure.put(`/api/users/membership/${user?.email}`);
                toast.success("Payment successful! You are now a Gold Member.");
                navigate("/dashboard/my-profile");
                refetch()
            }

        } catch (error) {
            console.error(err);
            toast.error("Payment failed.");
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mt-6">
                <CardElement className="p-2  rounded bg-white" />
                <button className="btn btn-primary mt-4 w-full" type="submit" disabled={!stripe || loading}>
                    {loading ? "Processing..." : `Pay $${membership.price}`}
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;