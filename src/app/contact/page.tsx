"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "../Layouts/Navbar";
import flagIndia from "../../../assets/images/IN.jpg";
import flagUSA from "../../../assets/images/US.png";
import flagSingapore from "../../../assets/images/SG.jpg";
import MainFooter from "../Layouts/MainFooter";
import toast from "react-hot-toast";
import type { Metadata } from "next";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    agreeMarketing: false,
    agreeTerms: false,
  });
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: "" }); // clear individual error on change
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email address.";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    // if (!form.agreeMarketing)
    //   newErrors.agreeMarketing = "Please agree to receive marketing communications.";
    if (!form.agreeTerms)
      newErrors.agreeTerms = "Please agree to our Privacy Policy and Terms.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // ✅ Step 1: Validate form first
    if (!validateForm()) return;

    // ✅ Step 2: Ensure reCAPTCHA is ready
    if (!executeRecaptcha) {
      toast.error("reCAPTCHA not ready yet, please try again.");
      return;
    }

    try {
      setLoading(true);

      // ✅ Step 3: Get invisible reCAPTCHA token
      const token = await executeRecaptcha("contact_form_submit");

      if (!token) {
        toast.error("Verification failed. Please refresh and try again.");
        setLoading(false);
        return;
      }

      // ✅ Step 4: Send form data + token to backend
      const res = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, token }),
      });

      const data = await res.json();
      setLoading(false);

      // ✅ Step 5: Handle backend response
      if (res.ok && data.success) {
        toast.success(
          "We have received your response. We’ll contact you shortly. Thank you!"
        );

        // Reset form after success
        setForm({
          name: "",
          email: "",
          phone: "",
          message: "",
          agreeMarketing: false,
          agreeTerms: false,
        });
        setErrors({});
      } else if (res.status === 403) {
        toast.error("reCAPTCHA verification failed. Please try again.");
      } else if (res.status === 429) {
        toast.error(
          "Too many requests. Please wait a moment before trying again."
        );
      } else {
        toast.error("Failed to send your message. Please try again later.");
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      setLoading(false);
      toast.error(
        "Something went wrong. Please check your connection and retry."
      );
    }
  };

  const offices = [

    {
      country: "Los Angeles (HQ)",
      flag: flagUSA,
      address: "Unit 303, 10645 Wilshire Blvd, Los Angeles, 90024",
    },
    {
      country: "Gurgaon, IN",
      flag: flagIndia,
      address:
        "5th Floor, DLF Two Horizon Centre, Sector 43, Gurugram, Haryana 122009",
      phoneNumber: "+91 99713 41448",
    },
    {
      country: "Singapore",
      flag: flagSingapore,
      address: "133 Cecil street #14-01 keck Seng Tower, Singapore - 069535",
    },
    {
      country: "USA",
      flag: flagUSA,
      address: "2810 N Church Street, Wilmington, Delaware 19802, USA",
    },
  ];

  return (
    <div className="bg-shunya-labs pt-20">
      <Navbar />
      <section className="min-h-screen text-white flex flex-col items-center justify-center md:px-6 px-3 py-16 md:py-24">
        <div className="text-center mb-10">
          <p className="text-gray-400 md:text-2xl text-base">Connect with us</p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight md:mb-12 mb-6">
            Speak with an expert
          </h1>
        </div>

        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-4 md:gap-8">
          {/* Left Column - Offices */}
          <div className="group relative bg-black/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 md:p-8 flex flex-col items-center justify-between transition-all duration-300">
            <h2 className="text-center font-semibold md:mb-6 mb-3">
              Our Offices
            </h2>
            <div className="md:space-y-6 space-y-4 w-full">
              {offices.map((office, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 p-5 rounded-xl text-center border border-gray-700 flex flex-col items-center"
                >
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-500 mb-3 flex items-center justify-center bg-white/10">
                    <Image
                      src={office.flag}
                      alt={`${office.country} flag`}
                      width={40}
                      height={40}
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-semibold text-lg">{office.country}</h3>
                  <p className="text-sm text-gray-400 mt-2">{office.address}</p>
                  <p className="text-sm text-gray-400 mt-2">{office.phoneNumber}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <form
            onSubmit={handleSubmit}
            className="group relative bg-black/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-5 md:p-8 flex flex-col items-center justify-between transition-all duration-300"
          >
            <div className="space-y-5 w-full">
              {/* Name */}
              <div>
                <label className="block text-sm mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full bg-white/10 rounded-full px-4 py-2 outline-none focus:ring-2 ${errors.name ? "ring-2 ring-red-500" : "focus:ring-blue-500"
                    }`}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full bg-white/10 rounded-full px-4 py-2 outline-none focus:ring-2 ${errors.email
                      ? "ring-2 ring-red-500"
                      : "focus:ring-blue-500"
                      }`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={`w-full bg-white/10 rounded-full px-4 py-2 outline-none focus:ring-2 ${errors.phone
                      ? "ring-2 ring-red-500"
                      : "focus:ring-blue-500"
                      }`}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full bg-white/10 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 ${errors.message
                    ? "ring-2 ring-red-500"
                    : "focus:ring-blue-500"
                    }`}
                ></textarea>
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              {/* Checkboxes */}
              <div className="space-y-4 text-sm text-gray-300">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative mt-1">
                    <input
                      type="checkbox"
                      name="agreeMarketing"
                      checked={form.agreeMarketing}
                      onChange={handleChange}
                      className="peer appearance-none w-4 h-4 border border-gray-500 rounded-[2px] bg-white/5 checked:border-blue-500 checked:bg-blue-600 transition-all duration-200"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute w-2.5 h-2.5 text-white top-[3px] left-[3px] hidden peer-checked:block"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="leading-tight">
                    I agree to receive marketing communications from Shunya
                    Labs.{" "}
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative mt-1">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={form.agreeTerms}
                      onChange={handleChange}
                      className="peer appearance-none w-4 h-4 border border-gray-500 rounded-[2px] bg-white/5 checked:border-blue-500 checked:bg-blue-600 transition-all duration-200"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute w-2.5 h-2.5 text-white top-[3px] left-[3px] hidden peer-checked:block"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="leading-tight">
                    I agree to the{" "}
                    <span className="text-white font-medium hover:text-blue-400 transition">
                      Privacy Policy
                    </span>{" "}
                    and{" "}
                    <span className="text-white font-medium hover:text-blue-400 transition">
                      Terms & Conditions
                    </span>
                    . <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="text-red-400 text-xs ml-6">
                    {errors.agreeTerms}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full text-white font-medium transition ${loading ? "opacity-60 cursor-not-allowed" : ""
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
                {loading ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </section>
      <MainFooter />
    </div>
  );
}
