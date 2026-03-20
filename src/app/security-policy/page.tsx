import MainFooter from "@/app/Layouts/MainFooter";
import Navbar from "@/app/Layouts/Navbar";
import PolicyTabs from "@/app/Layouts/PolicyTabs";
import type { Metadata } from "next";


export default function Security() {
  return (
    <>
      <div className="min-h-screen bg-shunya-labs text-gray-200 pt-20">
        <Navbar />

        {/* Content Container */}
        <div className="max-w-5xl mx-auto px-3 md:px-10 pb-8 md:py-10">
          {/* Tabs Navigation */}
          <PolicyTabs />

          {/* Main Security Section */}
          <div className="bg-black/40 p-6 md:p-10 rounded-2xl shadow-lg border border-gray-800 mt-0 md:mt-8">
            <h1 className="md:text-3xl text-2xl font-semibold mb-2 text-white">Security Policy</h1>
            <p className="text-sm text-gray-400 mb-8">Last updated: July 2025</p>

            <p className="text-gray-300 mb-6">
              At Shunya Labs, we take the security of your data and our systems seriously. This Security Policy outlines
              the measures we take to protect your information and our commitment to maintaining the highest security
              standards.
            </p>

            {/* Section 1 */}
            <h2 className="text-xl font-semibold mb-3 text-white">1. Data Encryption</h2>
            <p className="text-gray-300 mb-3">
              We implement robust encryption practices:
            </p>
            <ul className="list-disc list-inside text-gray-400 mb-8 space-y-1">
              <li>
                <span className="font-semibold text-gray-200">Data in Transit:</span> All data transmitted between your
                device and our servers is encrypted using TLS 1.3
              </li>
              <li>
                <span className="font-semibold text-gray-200">Data at Rest:</span> All stored data is encrypted using
                AES-256 encryption
              </li>
              <li>
                <span className="font-semibold text-gray-200">Audio Processing:</span> Audio files are encrypted during
                processing and securely deleted after transcription
              </li>
              <li>
                <span className="font-semibold text-gray-200">Database Security:</span> All database connections use
                encrypted protocols
              </li>
            </ul>

            {/* Section 2 */}
            <h2 className="text-xl font-semibold mb-3 text-white">2. Infrastructure Security</h2>

            <h3 className="font-medium text-gray-300 mt-4 mb-2">Cloud Security</h3>
            <ul className="list-disc list-inside text-gray-400 mb-4 space-y-1">
              <li>Hosted on secure, SOC 2 compliant cloud infrastructure</li>
              <li>Regular security audits and penetration testing</li>
              <li>Automated security monitoring and threat detection</li>
              <li>Multi-factor authentication for all administrative access</li>
            </ul>

            <h3 className="font-medium text-gray-300 mt-4 mb-2">Network Security</h3>
            <ul className="list-disc list-inside text-gray-400 mb-8 space-y-1">
              <li>Firewall protection and intrusion detection systems</li>
              <li>Regular security patches and updates</li>
              <li>Network segmentation and access controls</li>
              <li>DDoS protection and rate limiting</li>
            </ul>

            {/* Section 3 */}
            <h2 className="text-xl font-semibold mb-3 text-white">3. Access Controls</h2>
            <p className="text-gray-300 mb-3">
              We maintain strict access controls:
            </p>
            <ul className="list-disc list-inside text-gray-400 mb-8 space-y-1">
              <li>Role-based access control (RBAC) for all systems</li>
              <li>Regular access reviews and privilege management</li>
              <li>Secure authentication mechanisms</li>
              <li>Audit logging of all system access</li>
            </ul>

            {/* Section 4 */}
            <h2 className="text-xl font-semibold mb-3 text-white">4. Data Privacy & Retention</h2>
            <div className="bg-green-900/30 border border-green-700 rounded-xl p-4 mb-6">
              <p className="text-green-400 font-semibold mb-2">Audio Data Handling</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Audio files are processed in real-time and not permanently stored</li>
                <li>Temporary processing files are securely deleted within 24 hours</li>
                <li>No audio content is retained after transcription is complete</li>
                <li>Only aggregated, non-identifiable usage statistics are retained</li>
              </ul>
            </div>

            <p className="text-gray-300 mb-3">Our data retention practices include:</p>
            <ul className="list-disc list-inside text-gray-400 mb-8 space-y-1">
              <li>Minimal data collection — only what's necessary for service delivery</li>
              <li>Automated data deletion policies</li>
              <li>Right to data deletion upon request</li>
              <li>Regular purging of expired information</li>
            </ul>

            {/* Section 5 */}
            <h2 className="text-xl font-semibold mb-3 text-white">5. Compliance & Certifications</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-blue-900/30 border border-blue-700 rounded-xl p-4">
                <p className="text-blue-400 font-semibold mb-2">Standards Compliance</p>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>SOC 2 Type II compliance</li>
                  <li>GDPR compliance for EU users</li>
                  <li>CCPA compliance for California users</li>
                  <li>ISO 27001 security framework</li>
                </ul>
              </div>
              <div className="bg-purple-900/30 border border-purple-700 rounded-xl p-4">
                <p className="text-purple-400 font-semibold mb-2">Healthcare Compliance</p>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>HIPAA compliance for healthcare clients</li>
                  <li>Business Associate Agreements (BAA)</li>
                  <li>Protected Health Information (PHI) safeguards</li>
                  <li>Audit trails for healthcare use cases</li>
                </ul>
              </div>
            </div>

            {/* Section 6 */}
            <h2 className="text-xl font-semibold mb-3 text-white">6. Incident Response</h2>
            <ul className="list-disc list-inside text-gray-400 mb-8 space-y-1">
              <li>24/7 security monitoring and alerting</li>
              <li>Rapid incident response team activation</li>
              <li>Immediate containment and mitigation procedures</li>
              <li>Transparent communication with affected users</li>
              <li>Post-incident analysis and improvement</li>
            </ul>

            {/* Section 7 */}
            <h2 className="text-xl font-semibold mb-3 text-white">7. Employee Security</h2>
            <p className="text-gray-300 mb-3">All team members undergo:</p>
            <ul className="list-disc list-inside text-gray-400 mb-8 space-y-1">
              <li>Background checks and security clearance</li>
              <li>Regular security training and awareness programs</li>
              <li>Signed confidentiality and security agreements</li>
              <li>Principle of least privilege access</li>
            </ul>

            {/* Section 8 */}
            <h2 className="text-xl font-semibold mb-3 text-white">8. Responsible Disclosure</h2>
            <p className="text-gray-300 mb-3">
              We welcome security researchers and the community to help us maintain the security of our platform.
              If you discover a vulnerability, please report it responsibly.
            </p>
            <div className="bg-red-900/30 border border-red-700 rounded-xl p-4 mb-8">
              <p className="text-red-400 font-semibold mb-2">Report Security Issues</p>
              <p className="text-gray-300 mb-2">
                Please report vulnerabilities to:{" "}
                <a href="mailto:security@shunyalabs.com" className="text-blue-400 hover:underline">
                  security@shunyalabs.com
                </a>
              </p>
              <p className="text-gray-400 text-sm">
                We commit to acknowledging your report within 24 hours and providing regular updates until resolution.
              </p>
            </div>

            {/* Section 9 */}
            <h2 className="text-xl font-semibold mb-3 text-white">9. Contact Us</h2>
            <p className="text-gray-300 mb-3">
              If you have questions about our security practices or policies, please contact us:
            </p>
            <div className="bg-[#232328] p-4 rounded-xl border border-gray-700">
              <p>
                <span className="font-semibold text-gray-300">Security Team:</span>{" "}
                <a href="mailto:security@shunyalabs.com" className="text-blue-400 hover:underline">
                  security@shunyalabs.com
                </a>
              </p>
              <p>
                <span className="font-semibold text-gray-300">General Inquiries:</span>{" "}
                <a href="mailto:privacy@shunyalabs.com" className="text-blue-400 hover:underline">
                  privacy@shunyalabs.com
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
