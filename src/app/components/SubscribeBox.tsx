"use client";

import { useState } from "react";

export default function SubscribeBox() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // ✅ NEW

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true); // ✅ START LOADING

      const res = await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Something went wrong.");
      } else {
        setSuccess("Subscribed successfully!");
        setEmail(""); // clear input
      }
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // ✅ STOP LOADING
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex justify-center py-12">
      <div className="w-[90%] md:w-full bg-[#1A1A1A] border border-gray-800 rounded-2xl px-6 py-10 text-center">
        <h2 className="text-white text-xl font-semibold mb-3">Subscribe</h2>

        {/* <p className="text-gray-300 mb-6">
          Sign up now to get notified of any updates or new articles.
        </p> */}

        {/* Input + Button */}
        <div className="flex justify-center">
          <div className="flex items-center bg-white rounded-2xl shadow-md overflow-hidden w-[320px] md:w-[400px]">
            <input
              type="email"
              placeholder="Enter email for updates*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 text-sm text-black outline-none"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-full m-[4px] flex items-center justify-center gap-2 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {/* 🔁 Loader + Text */}
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                  ></path>
                </svg>
              )}
              {loading ? "Sending..." : "Submit"}
            </button>
          </div>
        </div>

        {/* Error / Success Messages */}
        {error && <p className="text-red-400 mt-3 text-sm">{error}</p>}
        {success && <p className="text-green-400 mt-3 text-sm">{success}</p>}
      </div>
    </div>
  );
}
