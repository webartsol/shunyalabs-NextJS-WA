
"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import MainFooter from "./MainFooter";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function EarlyAccessForm() {
    const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    revenue: "",
    newsletter: "",
  });

  const [loading, setLoading] = useState(false); // ✅ loading state

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Step 1: Validate fields
    if (!formData.name || !formData.email) {
      toast.error("Please fill all required fields.");
      return;
    }

    // ✅ Step 2: Ensure reCAPTCHA is ready
    if (!executeRecaptcha) {
      toast.error("reCAPTCHA not ready yet, please try again.");
      return;
    }

    try {
      setLoading(true);

      // ✅ Step 3: Invisible reCAPTCHA token (same action name approach)
      const token = await executeRecaptcha("early_access_submit");

      if (!token) {
        toast.error("Verification failed. Please refresh and try again.");
        setLoading(false);
        return;
      }

      // ✅ Step 4: Call your API with formData + token
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, token }),
      });

      const data = await res.json();
      setLoading(false);

      // ✅ Step 5: Handle responses same as contact form
      if (res.ok && data.success) {
        toast.success("Form submitted successfully.");

        // Reset Form
        setFormData({
          name: "",
          email: "",
          company: "",
          country: "",
          revenue: "",
          newsletter: "",
        });
      } else if (res.status === 403) {
        toast.error("reCAPTCHA verification failed. Please try again.");
      } else if (res.status === 429) {
        toast.error("Too many requests. Please wait a moment.");
      } else {
        toast.error("Submission failed. Please try again later.");
      }
    } catch (error) {
      console.error("❌ Early Access submission error:", error);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white w-[700px] group relative border bg-black/40 border-gray-700 rounded-2xl p-5 md:p-8 flex flex-col items-center justify-between transition-all duration-300 mb-20">
          <h1 className="text-3xl font-semibold text-center mb-6">
            Join Early Access
          </h1>
          <p className="text-lg text-center mb-8">
            Be among the first to experience CPU-first voice AI. Get free access
            to all four models during beta.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 w-full">
            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="block text-sm mb-2">
                What is your name?
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white/10 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="block text-sm mb-2">
                What is your email address?
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/10 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="company" className="block text-sm mb-2">
                What is your company name?
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-white/10 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="country" className="block text-sm mb-2">
                What country are you based in?
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full bg-white/10 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="revenue" className="block text-sm mb-2">
                What is your company’s annual revenue range?
              </label>
              <select
                id="revenue"
                name="revenue"
                value={formData.revenue}
                onChange={handleChange}
                className="w-full bg-white/10 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option className="bg-black text-white" value="">
                  Select
                </option>
                <option className="bg-black text-white" value="0-50k">
                  0 - $50,000
                </option>
                <option className="bg-black text-white" value="50k-100k">
                  $50,000 - $100,000
                </option>
                <option className="bg-black text-white" value="100k-500k">
                  $100,000 - $500,000
                </option>
                <option className="bg-black text-white" value="500k-1m">
                  $500,000 - $1,000,000
                </option>
                <option className="bg-black text-white" value="1m+">
                  $1,000,000+
                </option>
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="newsletter" className="block text-sm mb-2">
                Would you like to subscribe to our newsletter?
              </label>
              <select
                id="newsletter"
                name="newsletter"
                value={formData.newsletter}
                onChange={handleChange}
                className="w-full bg-white/10 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option className="bg-black text-white" value="">
                  Select
                </option>
                <option className="bg-black text-white" value="yes">
                  Yes
                </option>
                <option className="bg-black text-white" value="no">
                  No
                </option>
              </select>
            </div>

            {/* ✅ Submit Button with Loader */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full text-white font-medium transition ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
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
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
      <MainFooter />
    </div>
  );
}
