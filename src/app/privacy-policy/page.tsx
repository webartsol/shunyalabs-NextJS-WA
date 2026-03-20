import MainFooter from "@/app/Layouts/MainFooter";
import Navbar from "@/app/Layouts/Navbar";
import PolicyTabs from "@/app/Layouts/PolicyTabs";
import type { Metadata } from "next";

export default function Privacy() {
  return (
    <>
      <div className="min-h-screen bg-shunya-labs text-gray-200 pt-20">
        <Navbar />

        {/* Content Container */}
        <div className="max-w-5xl mx-auto px-3 md:px-10 pb-8 md:py-10">
          {/* Tabs Navigation */}
          <PolicyTabs />

          {/* Main Policy Section */}
          <div className="bg-black/40 p-6 md:p-10 rounded-2xl shadow-lg border border-gray-800 mt-0 md:mt-8">
            <h1 className="md:text-3xl text-2xl font-semibold mb-2 text-white">Privacy Policy</h1>
            <p className="text-sm text-gray-400 mb-8">Last updated: July 2025</p>

            <p className="text-gray-300 mb-6">
              Shunya Labs ("Shunya Labs," "we," "our," or "us") is committed to protecting your privacy,
              including your rights under the Health Insurance Portability and Accountability Act of 1996 (HIPAA),
              where applicable.
            </p>

            {/* Company Info Box */}
            <div className="bg-[#232328] p-4 rounded-xl border border-gray-700 mb-10">
              <p className="text-purple-400 font-medium mb-2">Company Information</p>
              <p><span className="font-semibold text-gray-300">Company:</span> Shunya Labs</p>
              <p><span className="font-semibold text-gray-300">Address:</span> 2810 N Church Street, Wilmington, Delaware 19802, USA</p>
              <p>
                <span className="font-semibold text-gray-300">Contact:</span>{" "}
                <a href="mailto:privacy@shunyalabs.com" className="text-blue-400 hover:underline">
                  privacy@shunyalabs.com
                </a>
              </p>
            </div>

            {/* Section 1 */}
            <h2 className="text-xl font-semibold mb-3 text-white">1. Information We Collect</h2>

            <h3 className="font-medium text-gray-300 mt-4 mb-2">a. Information You Provide</h3>
            <ul className="list-disc list-inside text-gray-400 mb-4 space-y-1">
              <li>Register for an account</li>
              <li>Contact us or request information</li>
              <li>Participate in surveys or research</li>
              <li>Apply for employment</li>
              <li>Sign up for newsletters or updates</li>
            </ul>

            <h3 className="font-medium text-gray-300 mt-4 mb-2">b. Automatically Collected Information</h3>
            <ul className="list-disc list-inside text-gray-400 mb-8 space-y-1">
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent, features used)</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Log files and analytics data</li>
            </ul>

            {/* Section 2 */}
            <h2 className="text-xl font-semibold mb-3 text-white">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-400 mb-8 space-y-1">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Personalize and improve your experience</li>
            </ul>

            {/* Section 3 */}
            <h2 className="text-xl font-semibold mb-3 text-white">3. Information Sharing and Disclosure</h2>
            <p className="text-gray-300 mb-3">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent,
              except as described in this policy.
            </p>
            <p className="text-gray-400 font-medium mb-2">We may share your information:</p>
            <ul className="list-disc list-inside text-gray-400 mb-8 space-y-1">
              <li>With service providers who assist us in operating our business</li>
              <li>To comply with legal obligations or respond to lawful requests</li>
              <li>To protect our rights, property, or safety, or that of others</li>
              <li>In connection with a merger, acquisition, or sale of assets</li>
            </ul>

            {/* Section 4 */}
            <h2 className="text-xl font-semibold mb-3 text-white">4. Data Security</h2>
            <p className="text-gray-300 mb-8">
              We implement appropriate technical and organizational security measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction.
            </p>

            {/* Section 5 */}
            <h2 className="text-xl font-semibold mb-3 text-white">5. Your Rights</h2>
            <ul className="list-disc list-inside text-gray-400 mb-8 space-y-1">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
            </ul>

            {/* Section 6 */}
            <h2 className="text-xl font-semibold mb-3 text-white">6. Contact Us</h2>
            <p className="text-gray-300 mb-3">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-[#232328] p-4 rounded-xl border border-gray-700">
              <p>
                <span className="font-semibold text-gray-300">Email:</span>{" "}
                <a href="mailto:privacy@shunyalabs.com" className="text-blue-400 hover:underline">
                  privacy@shunyalabs.com
                </a>
              </p>
              <p>
                <span className="font-semibold text-gray-300">Address:</span> 2810 N Church Street, Wilmington, Delaware
                19802, USA
              </p>
            </div>
          </div>
        </div>
        <MainFooter/>
      </div>
    </>
  );
}
