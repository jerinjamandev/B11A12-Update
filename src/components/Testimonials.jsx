import React from "react";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      image: "https://i.pravatar.cc/100?img=1",
      review:
        "This platform helped me connect with developers worldwide. The UI is clean and the experience is amazing!",
      designation: "Software Engineer",
    },
    {
      id: 2,
      name: "Sarah Williams",
      image: "https://i.pravatar.cc/100?img=2",
      review:
        "Absolutely love the features and how easy it is to use. Highly recommend to anyone who wants to learn and grow.",
      designation: "Frontend Developer",
    },
    {
      id: 3,
      name: "Michael Smith",
      image: "https://i.pravatar.cc/100?img=3",
      review:
        "The best community platform I’ve used so far. Lots of helpful content and discussions.",
      designation: "Backend Developer",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="w-[90%] mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          💬 What Our Users Say
        </h2>
        <p className="text-gray-500 mt-2 mb-10">
          Hear from our happy members and contributors
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="text-left">
                  <h4 className="font-semibold">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.designation}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
