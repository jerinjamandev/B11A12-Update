import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email");
    alert(`Subscribed successfully with ${email}`);
    setEmail("");
  };

  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 px-6 my-6 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
           Join Our Newsletter
        </h2>
        <p className="mt-2 text-blue-100">
          Subscribe to get the latest updates, posts, and community news.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="mt-6 flex flex-col md:flex-row gap-3 justify-center"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-lg text-gray-800 w-full md:w-2/3 outline-none bg-white"
          />
          <button
            type="submit"
            className="bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
