import MainFooter from "@/app/Layouts/MainFooter";
import Navbar from "@/app/Layouts/Navbar";
import PolicyTabs from "@/app/Layouts/PolicyTabs";
import type { Metadata } from "next";

export default function Terms() {
  return (
    <>
      <div className="min-h-screen bg-shunya-labs text-gray-200 pt-20">
        <Navbar />

        {/* Content Container */}
        <div className="max-w-5xl mx-auto px-3 md:px-10 pb-8 md:py-10">
          {/* Tabs Navigation */}
          <PolicyTabs />

          {/* Main Terms Section */}
          <div className="bg-black/40 p-6 md:p-10 rounded-2xl shadow-lg border border-gray-800 mt-0 md:mt-8">
            <h1 className="md:text-3xl text-2xl font-semibold mb-2 text-white">Terms & Conditions</h1>
            <p className="text-sm text-gray-400 mb-8">Last updated: July 2025</p>

            <p className="text-gray-300 mb-6">
              These Terms and Conditions ("Terms") govern your use of the Shunya Labs website and services.
              By accessing or using our services, you agree to be bound by these Terms.
            </p>

            {/* Section 1 */}
            <h2 className="text-xl font-semibold mb-3 text-white">1. Acceptance of Terms</h2>
            <p className="text-gray-300 mb-6">
              By accessing and using our services, you accept and agree to be bound by these Terms and provisions.
              If you do not agree with these Terms, please discontinue use of our website or services immediately.
            </p>

            {/* Section 2 */}
            <h2 className="text-xl font-semibold mb-3 text-white">2. Use License</h2>
            <p className="text-gray-300 mb-3">
              Permission is granted to temporarily download one copy of the materials on Shunya Labs' website for
              personal, non-commercial transitory viewing only. This is a license grant, not a transfer of title, and
              under this license you may not:
            </p>
            <ul className="list-disc list-inside text-gray-400 mb-6 space-y-1">
              <li>Modify or copy the materials.</li>
              <li>Use the materials for any commercial purpose or public display.</li>
              <li>Attempt to reverse engineer any software on Shunya Labs’ website.</li>
              <li>Remove any copyright or proprietary notations from the materials.</li>
            </ul>

            {/* Section 3 */}
            <h2 className="text-xl font-semibold mb-3 text-white">3. Disclaimer</h2>
            <p className="text-gray-300 mb-6">
              The materials on Shunya Labs’ website are provided on an "as is" basis. Shunya Labs makes no warranties,
              expressed or implied, and hereby disclaims and negates all other warranties including, without limitation,
              implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement
              of intellectual property or other violation of rights.
            </p>

            {/* Section 4 */}
            <h2 className="text-xl font-semibold mb-3 text-white">4. Limitations</h2>
            <p className="text-gray-300 mb-6">
              In no event shall Shunya Labs or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability
              to use the materials on Shunya Labs’ website, even if Shunya Labs or a representative has been notified
              of the possibility of such damage.
            </p>

            {/* Section 5 */}
            <h2 className="text-xl font-semibold mb-3 text-white">5. Accuracy of Materials</h2>
            <p className="text-gray-300 mb-6">
              The materials appearing on Shunya Labs’ website could include technical, typographical, or photographic
              errors. Shunya Labs does not warrant that any of the materials on its website are accurate, complete,
              or current. Shunya Labs may make changes to the materials contained on its website at any time without
              notice but does not make any commitment to update them.
            </p>

            {/* Section 6 */}
            <h2 className="text-xl font-semibold mb-3 text-white">6. Links</h2>
            <p className="text-gray-300 mb-6">
              Shunya Labs has not reviewed all of the sites linked to its website and is not responsible for the
              contents of any such linked site. The inclusion of any link does not imply endorsement by Shunya Labs.
              Use of any such linked website is at the user’s own risk.
            </p>

            {/* Section 7 */}
            <h2 className="text-xl font-semibold mb-3 text-white">7. Modifications</h2>
            <p className="text-gray-300 mb-6">
              Shunya Labs may revise these Terms at any time without notice. By using this website, you are agreeing
              to be bound by the then-current version of these Terms and Conditions.
            </p>

            {/* Section 8 */}
            <h2 className="text-xl font-semibold mb-3 text-white">8. Governing Law</h2>
            <p className="text-gray-300 mb-6">
              These Terms are governed by and construed in accordance with the laws of Delaware, USA, and you
              irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
            </p>

            {/* Section 9 */}
            <h2 className="text-xl font-semibold mb-3 text-white">9. Contact Information</h2>
            <p className="text-gray-300 mb-3">
              If you have any questions about these Terms & Conditions, please contact us at:
            </p>
            <div className="bg-[#232328] p-4 rounded-xl border border-gray-700">
              <p>
                <span className="font-semibold text-gray-300">Email:</span>{" "}
                <a href="mailto:legal@shunyalabs.com" className="text-blue-400 hover:underline">
                  legal@shunyalabs.com
                </a>
              </p>
              <p>
                <span className="font-semibold text-gray-300">Address:</span>{" "}
                2810 N Church Street, Wilmington, Delaware 19802, USA
              </p>
            </div>
          </div>
        </div>
        <MainFooter/>
      </div>
    </>
  );
}
