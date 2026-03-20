import MainFooter from "@/app/Layouts/MainFooter";
import Navbar from "@/app/Layouts/Navbar";
import PolicyTabs from "@/app/Layouts/PolicyTabs";

export default function CustomModelRailMLicense() {
  return (
    <>
      <div className="min-h-screen bg-shunya-labs text-gray-200 pt-20">
        <Navbar />

        {/* Content Container */}
        <div className="max-w-5xl mx-auto px-3 md:px-10 pb-8 md:py-10">
          {/* Tabs Navigation */}
          <PolicyTabs />

          {/* Main Custom License Section */}
          <div className="bg-black/40 p-6 md:p-10 rounded-2xl shadow-lg border border-gray-800 mt-0 md:mt-8 legal-content">
            
            <h1>Shunya Labs Custom Model RAIL-M License</h1>
            <p>Licensor: Shunya Labs</p>
            <p>Contact: 0@shunyalabs.ai</p>

            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">CUSTOM MODEL LICENSE AGREEMENT</h2>
              <p className="mb-6 text-gray-300">
                This Custom Model RAIL-M License ("License") is entered into between <strong>Shunya Labs Inc.</strong> ("Licensor") 
                and the entity identified in the accompanying commercial agreement ("Licensee" or "You"). 
                This License governs Your use of custom-developed AI models, fine-tuned systems, and bespoke artifacts 
                created specifically for Your organization.
              </p>

              <h2 className="text-2xl font-semibold mb-6 text-white">Terms and Conditions for Use, Reproduction, and Distribution</h2>

              {/* SECTION 1 */}
              <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">1. Definitions</h3>
              <ul className="legal-list space-y-4">
                <li>
                  <strong>1.1. "License"</strong> shall mean the terms and conditions for use, reproduction, and distribution as defined by this document.
                </li>
                <li>
                  <strong>1.2. "Licensor"</strong> shall mean <strong>Shunya Labs Inc.</strong>, the developer and owner of the Custom Model.
                </li>
                <li>
                  <strong>1.3. "Licensee" (or "You" or "Your")</strong> shall mean the specific Legal Entity identified in the Commercial Agreement who has paid for the development and/or licensing of the Custom Model.
                </li>
                <li>
                  <strong>1.4. "Legal Entity"</strong> shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control with that entity. For purposes of this definition, "control" means (i) the power, direct or indirect, to cause the direction or management of such entity, whether by contract or otherwise, or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial ownership of such entity.
                </li>
                <li>
                  <strong>1.5. "Authorized Users"</strong> shall mean employees, contractors, and consultants of Licensee who: (a) have a legitimate business need to access the Custom Model; (b) are bound by confidentiality obligations no less restrictive than those in this License; and (c) have been registered with Licensor if required under the Commercial Agreement.
                </li>
                <li>
                  <strong>1.6. "Custom Model"</strong> shall mean the proprietary AI model, including all weights, parameters, algorithms, fine-tuned layers, training data derivatives, and associated software, that has been specifically developed, customized, or fine-tuned by Licensor for Licensee pursuant to a Commercial Agreement. Custom Models include but are not limited to:
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>1.6.1. Bespoke Large Language Models (LLMs)</li>
                    <li>1.6.2. Domain-specific ASR/STT models</li>
                    <li>1.6.3. Custom TTS voices and synthesis models</li>
                    <li>1.6.4. Specialized NER and classification models</li>
                    <li>1.6.5. Custom audio enhancement pipelines</li>
                    <li>1.6.6. Speaker identification and diarization systems trained on client data</li>
                  </ul>
                </li>
                <li>
                  <strong>1.7. "Commercial Agreement"</strong> shall mean the separate written agreement between Licensor and Licensee that specifies: (a) the Custom Model being licensed; (b) fees and payment terms; (c) usage limits or quotas; (d) term and renewal; and (e) any additional terms specific to the deployment.
                </li>
                <li>
                  <strong>1.8. "Artifact"</strong> shall mean the Custom Model and all accompanying documentation, APIs, integration code, and support materials delivered by Licensor.
                </li>
                <li>
                  <strong>1.9. "Output"</strong> shall mean the results generated by operating the Custom Model, including but not limited to transcriptions, translations, synthesized audio, text generations, classifications, predictions, and metadata.
                </li>
                <li>
                  <strong>1.10. "Personal Data"</strong> shall mean any information relating to an identified or identifiable natural person as defined under applicable data protection laws including GDPR, CCPA, and DPDPA.
                </li>
                <li>
                  <strong>1.11. "Confidential Information"</strong> shall mean the Custom Model itself (including architecture, weights, parameters, training methodologies), all technical documentation, performance benchmarks, and any information marked as confidential or that would reasonably be understood to be confidential.
                </li>
                <li>
                  <strong>1.12. "Internal Use"</strong> shall mean use of the Custom Model solely within Licensee's own business operations, by Authorized Users, for the specific use cases defined in the Commercial Agreement. Internal Use expressly excludes:
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>1.12.1. Providing access to affiliates, subsidiaries, or parent companies (unless specifically licensed)</li>
                    <li>1.12.2. Offering the Custom Model as a service to third parties</li>
                    <li>1.12.3. Embedding the Custom Model in products sold or distributed to customers</li>
                    <li>1.12.4. Any use that allows third parties to benefit from the Custom Model's capabilities</li>
                  </ul>
                </li>
                <li>
                  <strong>1.13. "Deployment Environment"</strong> shall mean the specific technical infrastructure (on-premises servers, cloud instances, edge devices) authorized under the Commercial Agreement where the Custom Model may be installed and executed.
                </li>
              </ul>

              {/* SECTION 2 */}
              <h3 className="text-lg font-semibold mt-8 mb-3 text-purple-400">2. Grant of License</h3>
              <p className="mb-4">Subject to the terms of this License and the Commercial Agreement:</p>
              <ul className="legal-list space-y-4">
                <li>
                  <strong>2.1. Limited License Grant</strong>
                  <p className="mt-2 text-gray-300">Licensor grants to Licensee a <strong>non-exclusive, non-transferable, non-sublicensable, revocable</strong> license to:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>2.1.1. Install and execute the Custom Model in the authorized Deployment Environment;</li>
                    <li>2.1.2. Use the Custom Model for Internal Use only, as defined in Section 1.12;</li>
                    <li>2.1.3. Generate Output using the Custom Model in accordance with the usage quotas specified in the Commercial Agreement;</li>
                    <li>2.1.4. Access technical documentation and support materials provided with the Custom Model.</li>
                  </ul>
                </li>
                <li>
                  <strong>2.2. Scope Limitations</strong>
                  <p className="mt-2 text-gray-300">This license is strictly limited to:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>2.2.1. The specific Custom Model version(s) identified in the Commercial Agreement</li>
                    <li>2.2.2. The authorized number of Authorized Users or concurrent instances</li>
                    <li>2.2.3. The geographic regions specified in the Commercial Agreement (if any)</li>
                    <li>2.2.4. The use cases and deployment scenarios explicitly approved in writing by Licensor</li>
                  </ul>
                </li>
                <li>
                  <strong>2.3. Reservation of Rights</strong>
                  <p className="mt-2 text-gray-300">All rights not expressly granted herein are reserved by Licensor. Licensor retains all ownership, title, and intellectual property rights in and to the Custom Model, including all improvements, modifications, and derivatives created by Licensor.</p>
                </li>
              </ul>

              {/* SECTION 3 */}
              <h3 className="text-lg font-semibold mt-8 mb-3 text-purple-400">3. Prohibited Activities</h3>
              <p className="mb-4">You are expressly <strong>prohibited</strong> from:</p>
              <ul className="legal-list space-y-4">
                <li>
                  <strong>3.1. Distribution and Sharing</strong>
                  <p className="mt-2 text-gray-300">Distributing, sharing, sublicensing, selling, leasing, or otherwise providing access to the Custom Model to any third party, including:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>3.1.1. Affiliates, subsidiaries, or parent companies (unless separately licensed)</li>
                    <li>3.1.2. Customers, partners, or contractors who are not Authorized Users</li>
                    <li>3.1.3. Making the Custom Model available via API, web service, or any access mechanism to external parties</li>
                  </ul>
                </li>
                <li>
                  <strong>3.2. Reverse Engineering</strong>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>3.2.1. Reverse engineering, decompiling, disassembling, or attempting to derive the source code, architecture, weights, or training data of the Custom Model</li>
                    <li>3.2.2. Using the Custom Model to train, improve, or develop competing models</li>
                    <li>3.2.3. Extracting knowledge distillation or creating derivative models based on the Custom Model's outputs</li>
                  </ul>
                </li>
                <li>
                  <strong>3.3. Modification and Derivatives</strong>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>3.3.1. Modifying, adapting, fine-tuning, or creating derivative works of the Custom Model without express written permission from Licensor</li>
                    <li>3.3.2. Merging or combining the Custom Model with other models or systems in a manner that would compromise Licensor's intellectual property</li>
                  </ul>
                </li>
                <li>
                  <strong>3.4. Unauthorized Deployment</strong>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>3.4.1. Deploying the Custom Model outside the authorized Deployment Environment</li>
                    <li>3.4.2. Exceeding the usage quotas, user limits, or transaction volumes specified in the Commercial Agreement</li>
                    <li>3.4.3. Using the Custom Model for any purpose not explicitly authorized in the Commercial Agreement</li>
                  </ul>
                </li>
                <li>
                  <strong>3.5. Competitive Use</strong>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>3.5.1. Using the Custom Model to provide services competitive with Shunya Labs' offerings</li>
                    <li>3.5.2. Benchmarking the Custom Model against other models for public comparison without written consent</li>
                    <li>3.5.3. Using insights gained from the Custom Model to develop competing products or services</li>
                  </ul>
                </li>
                <li>
                  <strong>3.6. Unauthorized Transfer</strong>
                  <p className="mt-2 text-gray-300">Transferring this License or the Custom Model to any third party, including in connection with a merger, acquisition, or asset sale, without prior written consent from Licensor</p>
                </li>
              </ul>

              {/* SECTION 4 */}
              <h3 className="text-lg font-semibold mt-8 mb-3 text-purple-400">4. Use-Based Restrictions</h3>
              <p className="text-gray-300">
                In addition to the prohibitions in Section 3, You must comply with all restrictions set forth in <strong>Attachment A (Prohibited Uses)</strong>. These restrictions apply regardless of whether the use is Internal Use or otherwise. Violation of any restriction in Attachment A constitutes material breach and grounds for immediate termination.
              </p>

              {/* SECTION 5 */}
              <h3 className="text-lg font-semibold mt-8 mb-3 text-purple-400">5. Voice Cloning and Biometric Data Requirements</h3>
              <p className="mb-4">If the Custom Model includes Text-to-Speech (TTS), Voice Conversion, Speaker Identification, or Diarization capabilities:</p>
              <ul className="legal-list space-y-4">
                <li>
                  <strong>5.1. Consent Mandate</strong>
                  <p className="mt-2 text-gray-300">You shall not use the Custom Model to:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>5.1.1. Clone, synthesize, or replicate any natural person's voice without their explicit, written, informed consent</li>
                    <li>5.1.2. Identify speakers in audio recordings without appropriate legal basis (consent, legitimate interest, or legal obligation under applicable privacy laws)</li>
                    <li>5.1.3. Process biometric voice data in violation of GDPR Article 9, BIPA (Illinois), or equivalent biometric privacy laws</li>
                  </ul>
                </li>
                <li>
                  <strong>5.2. Consent Documentation</strong>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>5.2.1. <strong>Pre-Processing Requirement:</strong> Before processing any individual's voice data for cloning or identification, You must obtain and maintain written consent documentation</li>
                    <li>5.2.2. <strong>Consent Elements:</strong> Each consent must include:
                      <ol className="list-none pl-6 mt-2 space-y-1">
                        <li>5.2.2.1. Clear identity verification of the consenting individual</li>
                        <li>5.2.2.2. Specific description of how their voice data will be used</li>
                        <li>5.2.2.3. Duration of consent and retention period for voice data</li>
                        <li>5.2.2.4. Right to withdraw consent and procedure for doing so</li>
                        <li>5.2.2.5. Acknowledgment that synthetic voice outputs may be generated</li>
                      </ol>
                    </li>
                    <li>5.2.3. <strong>Retention:</strong> Consent records must be maintained for the longer of:
                      <ol className="list-none pl-6 mt-2 space-y-1">
                        <li>5.2.3.1. (i) five (5) years, OR</li>
                        <li>5.2.3.2. (ii) the period required by applicable law</li>
                      </ol>
                    </li>
                    <li>5.2.4. <strong>Audit Access:</strong> Upon request, You shall provide consent documentation to Licensor within ten (10) business days</li>
                  </ul>
                </li>
                <li>
                  <strong>5.3. Public Figures and Deceased Individuals</strong>
                  <ul className="list-none pl-6 mt-2 space-y-2 text-gray-400">
                    <li>5.3.1. Voice cloning of public figures (celebrities, politicians, public officials) requires legal authorization demonstrating:
                      <ol className="list-none pl-6 mt-2 space-y-1">
                        <li>5.3.1.1. Licensing from the individual or their authorized representatives, OR</li>
                        <li>5.3.1.2. Use falls within fair use/fair dealing (criticism, commentary, parody, education) AND Output is clearly labeled as AI-generated</li>
                      </ol>
                    </li>
                    <li>5.3.2. Voice cloning of deceased individuals requires authorization from the estate, legal heirs, or beneficiaries</li>
                  </ul>
                </li>
                <li>
                  <strong>5.4. Labeling Requirement</strong>
                  <p className="mt-2 text-gray-300">All synthetic voice Output distributed beyond Licensee's organization must include clear, conspicuous disclosure that the audio is AI-generated, either:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>5.4.1. Through audio watermarking (if supported by the Custom Model), OR</li>
                    <li>5.4.2. Through accompanying text/visual disclosure stating "This audio contains AI-generated voice synthesis"</li>
                  </ul>
                </li>
              </ul>

              {/* SECTION 6 */}
              <h3 className="text-lg font-semibold mt-8 mb-3 text-purple-400">6. Data Protection and Privacy</h3>
              <ul className="legal-list space-y-4">
                <li>
                  <strong>6.1. Data Processing Role</strong>
                  <p className="mt-2 text-gray-300">Where the Custom Model processes Personal Data:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>6.1.1. Licensee acts as the <strong>Data Controller</strong> and Licensor acts as <strong>Data Processor</strong> (or equivalent under applicable law)</li>
                    <li>6.1.2. A separate Data Processing Agreement (DPA) may be required and shall be incorporated by reference if executed</li>
                  </ul>
                </li>
                <li>
                  <strong>6.2. Licensee Obligations</strong>
                  <p className="mt-2 text-gray-300">You shall:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>6.2.1. Process Personal Data only for lawful purposes with appropriate legal basis</li>
                    <li>6.2.2. Implement appropriate technical and organizational measures to protect Personal Data, including:
                      <ul className="legal-list pl-6 mt-2 space-y-1">
                        <li>6.2.2.1. Encryption of data at rest and in transit</li>
                        <li>6.2.2.2. Access controls limiting Custom Model access to Authorized Users</li>
                        <li>6.2.2.3. Audit logging of all Custom Model usage</li>
                        <li>6.2.2.4. Incident response procedures for data breaches</li>
                      </ul>
                    </li>
                    <li>6.2.3. Comply with all applicable data protection laws including GDPR, CCPA, PIPEDA, and India DPDPA</li>
                    <li>6.2.4. Respect data subject rights (access, rectification, erasure, portability, objection)</li>
                    <li>6.2.5. Notify Licensor within 24 hours of any data breach involving the Custom Model</li>
                  </ul>
                </li>
                <li>
                  <strong>6.3. Data Residency and Transfer</strong>
                  <p className="mt-2 text-gray-300">If the Commercial Agreement specifies data residency requirements:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>6.3.1. You shall not transfer Personal Data processed by the Custom Model outside authorized geographic regions</li>
                    <li>6.3.2. Any cross-border data transfers must comply with applicable mechanisms (Standard Contractual Clauses, adequacy decisions, etc.)</li>
                  </ul>
                </li>
                <li>
                  <strong>6.4. Training Data Prohibition</strong>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>6.4.1. You shall not use the Custom Model's Output or any data processed by the Custom Model to train, improve, or develop other AI models without express written permission from Licensor.</li>
                  </ul>
                </li>
              </ul>
              {/* SECTION 7 */}
              <h3 className="text-lg font-semibold mt-8 mb-3 text-purple-400">7. Confidentiality</h3>
              <ul className="legal-list space-y-4">
                <li>
                  <strong>7.1. Confidential Information</strong>
                  <p className="mt-2 text-gray-300">You acknowledge that the Custom Model constitutes Confidential Information and trade secrets of Licensor. You agree to:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>7.1.1. Maintain the confidentiality of the Custom Model using at least the same degree of care as You use for Your own confidential information, but no less than reasonable care</li>
                    <li>7.1.2. Not disclose the Custom Model or any technical details about it to any third party</li>
                    <li>7.1.3. Restrict access to the Custom Model to Authorized Users on a need-to-know basis</li>
                    <li>7.1.4. Not publish benchmarks, performance metrics, or technical evaluations of the Custom Model without prior written consent</li>
                  </ul>
                </li>
                <li>
                  <strong>7.2. Security Measures</strong>
                  <p className="mt-2 text-gray-300">You shall implement and maintain:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>7.2.1. Physical security controls preventing unauthorized physical access to systems containing the Custom Model</li>
                    <li>7.2.2. Logical access controls (authentication, authorization, audit logging)</li>
                    <li>7.2.3. Network security measures (firewalls, intrusion detection, encryption)</li>
                    <li>7.2.4. Secure backup and disaster recovery procedures</li>
                    <li>7.2.5. Employee/contractor training on handling Confidential Information</li>
                  </ul>
                </li>
                <li>
                  <strong>7.3. Disclosure Exceptions</strong>
                  <p className="mt-2 text-gray-300">Confidentiality obligations do not apply to information that:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>7.3.1. Was publicly known prior to disclosure by Licensor</li>
                    <li>7.3.2. Becomes publicly known through no breach by Licensee</li>
                    <li>7.3.3. Was rightfully in Licensee's possession prior to disclosure</li>
                    <li>7.3.4. Is independently developed by Licensee without use of Confidential Information</li>
                    <li>7.3.5. Must be disclosed pursuant to law or court order (with prior notice to Licensor if legally permissible)</li>
                  </ul>
                </li>
              </ul>

              {/* SECTION 8 */}
              <h3 className="text-lg font-semibold mt-8 mb-3 text-purple-400">8. Output Ownership and Usage</h3>
              <ul className="legal-list space-y-4">
                <li>
                  <strong>8.1. Output Rights</strong>
                  <p className="mt-2 text-gray-300">Except as set forth herein, Licensor claims no ownership rights in Output You generate using the Custom Model, subject to the following conditions:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>
                      <strong>8.1.1. Output Restrictions</strong>
                      <p className="mt-1">You are fully responsible and liable for all Output generated using the Custom Model. You shall ensure that:</p>
                      <ul className="legal-list pl-6 mt-1 space-y-1">
                        <li>8.1.1.1. Output does not violate any third-party intellectual property rights</li>
                        <li>8.1.1.2. Output complies with all applicable laws and regulations</li>
                        <li>8.1.1.3. Output does not contravene any provision of this License or Attachment A</li>
                        <li>8.1.1.4. Output used publicly or shared with third parties includes appropriate attribution (see Section 9)</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>8.2. Quality Assurance</strong>
                  <p className="mt-2 text-gray-300">For high-stakes use cases (medical, legal, financial, safety-critical), You shall:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>8.2.1. Implement human review procedures for Output before it is acted upon</li>
                    <li>8.2.2. Clearly label Output as machine-generated where required by law or industry standards</li>
                    <li>8.2.3. Maintain audit trails of Output generation and review processes</li>
                  </ul>
                </li>
              </ul>

              {/* SECTION 9 */}
              <h3 className="text-lg font-semibold mt-8 mb-3 text-purple-400">9. Attribution and Branding</h3>
              <ul className="legal-list space-y-4">
                <li>
                  <strong>9.1. Attribution Requirement</strong>
                  <p className="mt-2 text-gray-300">Where technically and commercially feasible, You should provide attribution to Shunya Labs:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>9.1.1. <strong>Internal Use:</strong> No attribution required for purely internal Output</li>
                    <li>9.1.2. <strong>External Distribution:</strong> If Output is shared with customers, partners, or the public, include: "Powered by Shunya Labs AI (https://www.shunyalabs.ai)" in documentation, terms of service, or user interfaces</li>
                  </ul>
                </li>
                <li>
                  <strong>9.2. Trademark Usage</strong>
                  <p className="mt-2 text-gray-300">You may use Shunya Labs trademarks only as required for attribution in Section 9.1. You shall not:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>9.2.1. Use Shunya Labs trademarks in a manner suggesting endorsement of Your products/services</li>
                    <li>9.2.2. Register domain names, social media handles, or trademarks confusingly similar to Shunya Labs marks</li>
                    <li>9.2.3. Modify or alter Shunya Labs logos or trademarks</li>
                  </ul>
                </li>
              </ul>

              {/* SECTION 10 */}
              <h3 className="text-lg font-semibold mt-8 mb-3 text-purple-400">10. Commercial Terms and Payment</h3>
              <ul className="legal-list space-y-4">
                <li>
                  <strong>10.1. Fees</strong>
                  <p className="mt-2 text-gray-300">All fees, payment terms, and invoicing procedures are specified in the Commercial Agreement. Use of the Custom Model is contingent upon timely payment.</p>
                </li>
                <li>
                  <strong>10.2. Usage Quotas</strong>
                  <p className="mt-2 text-gray-300">If the Commercial Agreement specifies usage quotas (e.g., hours of audio processing, API calls, transactions):</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>10.2.1. You shall implement usage tracking and monitoring</li>
                    <li>10.2.2. Exceeding quotas requires either: (i) upgrade to a higher-tier license, OR (ii) overage fees as specified in the Commercial Agreement</li>
                    <li>10.2.3. Licensor reserves the right to suspend access if quotas are materially exceeded without authorization</li>
                  </ul>
                </li>
                <li>
                  <strong>10.3. Renewal and Pricing</strong>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>10.3.1. License terms and renewal procedures are specified in the Commercial Agreement.</li>
                    <li>10.3.2. Licensor reserves the right to adjust pricing upon renewal with sixty (60) days' notice.</li>
                    <li>10.3.3. Failure to renew results in termination of this License and all access to the Custom Model.</li>
                  </ul>
                </li>
              </ul>

              {/* SECTION 11 */}
              <h3 className="text-lg font-semibold mt-8 mb-3 text-purple-400">11. Support and Maintenance</h3>
              <ul className="legal-list space-y-4">
                <li>
                  <strong>11.1. Support Services</strong>
                  <p className="mt-2 text-gray-300">Support levels (if any) are specified in the Commercial Agreement and may include:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>11.1.1. Technical support (email, phone, ticketing system)</li>
                    <li>11.1.2. Bug fixes and security patches</li>
                    <li>11.1.3. Model performance optimization</li>
                    <li>11.1.4. Integration assistance</li>
                  </ul>
                </li>
                <li>
                  <strong>11.2. Updates and Upgrades</strong>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>11.2.1. <strong>Updates:</strong> Minor updates, bug fixes, and security patches are included within the license term</li>
                    <li>11.2.2. <strong>Upgrades:</strong> Major version upgrades or new Custom Model variants may require separate licensing or upgrade fees</li>
                    <li>11.2.3. Licensor will notify You of available updates and recommended deployment schedules</li>
                  </ul>
                </li>
                <li>
                  <strong>11.3. Service Level Agreements (SLAs)</strong>
                  <p className="mt-2 text-gray-300">If the Commercial Agreement includes SLAs, they shall be incorporated by reference. In the absence of specific SLAs, the Custom Model is provided on an "AS IS" basis (see Section 13).</p>
                </li>
              </ul>

              {/* SECTION 12 */}
              <h3 className="text-lg font-semibold mt-8 mb-3 text-purple-400">12. Audit Rights</h3>
              <ul className="legal-list space-y-4">
                <li>
                  <strong>12.1. Audit Procedures</strong>
                  <p className="mt-2 text-gray-300">Licensor may audit Your compliance with this License upon reasonable notice:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>12.1.1. <strong>Frequency:</strong> No more than once per calendar year, unless breach is suspected</li>
                    <li>12.1.2. <strong>Notice:</strong> Thirty (30) days' written notice specifying scope and timing</li>
                    <li>12.1.3. <strong>Timing:</strong> During normal business hours to minimize disruption</li>
                    <li>12.1.4. <strong>Scope:</strong> Access to usage logs, consent documentation (for voice cloning), deployment configurations, and user access records</li>
                  </ul>
                </li>
                <li>
                  <strong>12.2. Audit Cooperation</strong>
                  <p className="mt-2 text-gray-300">You shall:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>12.2.1. Provide requested information within thirty (30) days of request</li>
                    <li>12.2.2. Grant Licensor (or its authorized auditors) reasonable access to systems and documentation</li>
                    <li>12.2.3. Cooperate in good faith with audit procedures</li>
                  </ul>
                </li>
                <li>
                  <strong>12.3. Remediation</strong>
                  <p className="mt-2 text-gray-300">If an audit reveals non-compliance:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>12.3.1. You shall cure the non-compliance within thirty (30) days (or ten (10) days for payment/quota issues)</li>
                    <li>12.3.2. If non-compliance involves material underpayment (&gt;10% of fees owed), You shall reimburse Licensor for audit costs</li>
                    <li>12.3.3. Material non-compliance may result in immediate termination (see Section 14)</li>
                  </ul>
                </li>
                <li>
                  <strong>12.4. Confidentiality</strong>
                  <p className="mt-2 text-gray-300">Licensor shall treat all audit information as confidential and use it solely for compliance verification purposes.</p>
                </li>
              </ul>

              {/* SECTION 13 */}
              <h3 className="text-lg font-semibold mt-8 mb-3 text-purple-400">13. Disclaimer of Warranties</h3>
              <ul className="legal-list space-y-4">
                <li>
                  <strong>13.1. "AS IS" Provision</strong>
                  <p className="mt-2 text-gray-300 uppercase font-bold text-sm">
                    EXCEPT AS EXPRESSLY SET FORTH IN THE COMMERCIAL AGREEMENT, THE CUSTOM MODEL IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. LICENSOR MAKES NO WARRANTIES, EXPRESS, IMPLIED, OR STATUTORY, INCLUDING BUT NOT LIMITED TO:
                  </p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>13.1.1. <strong>Merchantability</strong> or fitness for a particular purpose</li>
                    <li>13.1.2. <strong>Accuracy, completeness, or reliability</strong> of Output</li>
                    <li>13.1.3. <strong>Uninterrupted or error-free operation</strong></li>
                    <li>13.1.4. <strong>Security</strong> or that the Custom Model is free from vulnerabilities or malicious code</li>
                    <li>13.1.5. <strong>Non-infringement</strong> of third-party rights</li>
                    <li>13.1.6. <strong>Compliance</strong> with any specific regulatory requirements (e.g., FDA, HIPAA, SOC 2)</li>
                  </ul>
                </li>
                <li>
                  <strong>13.2. Output Accuracy</strong>
                  <p className="mt-2 text-gray-300">You acknowledge that:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>13.2.1. AI models are probabilistic and may produce incorrect, biased, or nonsensical Output</li>
                    <li>13.2.2. Output should not be relied upon without appropriate validation and human oversight</li>
                    <li>13.2.3. Licensor is not responsible for decisions made based on Output</li>
                  </ul>
                </li>
                <li>
                  <strong>13.3. Regulatory Compliance</strong>
                  <p className="mt-2 text-gray-300">If You use the Custom Model in regulated industries (healthcare, finance, legal):</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>13.3.1. You are solely responsible for ensuring compliance with applicable regulations (HIPAA, GDPR, SEC, FDA, etc.)</li>
                    <li>13.3.2. Licensor makes no representation that the Custom Model meets regulatory requirements</li>
                    <li>13.3.3. You shall implement all necessary safeguards, validations, and human oversight</li>
                  </ul>
                </li>
              </ul>

              {/* SECTION 14 */}
              <h3 className="text-lg font-semibold mt-8 mb-3 text-purple-400">14. Limitation of Liability</h3>
              <ul className="legal-list space-y-4">
                <li>
                  <strong>14.1. Consequential Damages Waiver</strong>
                  <p className="mt-2 text-gray-300 uppercase font-bold text-sm">
                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL LICENSOR BE LIABLE FOR:
                  </p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>14.1.1. Indirect, incidental, special, punitive, or consequential damages</li>
                    <li>14.1.2. Loss of profits, revenue, data, or business opportunities</li>
                    <li>14.1.3. Cost of procurement of substitute goods or services</li>
                    <li>14.1.4. Business interruption or system downtime</li>
                  </ul>
                  <p className="mt-2 text-gray-300 text-sm uppercase">
                    ARISING OUT OF OR RELATED TO THIS LICENSE OR USE OF THE CUSTOM MODEL, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                  </p>
                </li>
                <li>
                  <strong>14.2. Liability Cap</strong>
                  <p className="mt-2 text-gray-300 uppercase font-bold text-sm">
                    LICENSOR'S TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING FROM THIS LICENSE SHALL NOT EXCEED THE FEES PAID BY LICENSEE IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO LIABILITY.
                  </p>
                </li>
                <li>
                  <strong>14.3. Exceptions</strong>
                  <p className="mt-2 text-gray-300">The limitations in this Section 14 do not apply to:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>14.3.1. Licensee's breach of confidentiality obligations (Section 7)</li>
                    <li>14.3.2. Licensee's infringement of Licensor's intellectual property rights</li>
                    <li>14.3.3. Licensee's indemnification obligations (Section 15)</li>
                    <li>14.3.4. Liability that cannot be excluded under applicable law (e.g., gross negligence, willful misconduct)</li>
                  </ul>
                </li>
              </ul>

              {/* SECTION 15 */}
              <h3 className="text-lg font-semibold mt-8 mb-3 text-purple-400">15. Indemnification</h3>
              <ul className="legal-list space-y-4">
                <li>
                  <strong>15.1. Licensee Indemnification</strong>
                  <p className="mt-2 text-gray-300">
                    You agree to indemnify, defend, and hold harmless Licensor, its affiliates, and their respective officers, directors, employees, and agents from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from or related to:
                  </p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>15.1.1. Your use or misuse of the Custom Model</li>
                    <li>15.1.2. Your violation of this License or the Commercial Agreement</li>
                    <li>15.1.3. Your violation of applicable laws or regulations</li>
                    <li>15.1.4. Output You generate and distribute to third parties</li>
                    <li>15.1.5. Your infringement of third-party intellectual property, privacy, or other rights</li>
                    <li>15.1.6. Claims by Your employees, contractors, customers, or other third parties related to the Custom Model</li>
                    <li>15.1.7. Your breach of confidentiality obligations</li>
                  </ul>
                </li>
                <li>
                  <strong>15.2. Indemnification Procedures</strong>
                  <p className="mt-2 text-gray-300">Licensor shall:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>15.2.1. Promptly notify You of any claim subject to indemnification</li>
                    <li>15.2.2. Cooperate reasonably with You in the defense</li>
                    <li>15.2.3. Grant You sole control over defense and settlement (provided settlement does not impose obligations on Licensor or admit fault without Licensor's consent)</li>
                  </ul>
                </li>
              </ul>

              {/* SECTION 16 */}
              <h3 className="text-lg font-semibold mt-8 mb-3 text-purple-400">16. Term and Termination</h3>
              <ul className="legal-list space-y-4">
                <li>
                  <strong>16.1. Term</strong>
                  <p className="mt-2 text-gray-300">
                    This License commences on the Effective Date specified in the Commercial Agreement and continues for the Initial Term specified therein, unless earlier terminated under this Section 16.
                  </p>
                </li>
                <li>
                  <strong>16.2. Termination for Convenience</strong>
                  <p className="mt-2 text-gray-300">Either party may terminate this License:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>16.2.1. Upon expiration of the then-current term by providing written notice per the Commercial Agreement's renewal terms</li>
                    <li>16.2.2. By mutual written agreement</li>
                  </ul>
                </li>
                <li>
                  <strong>16.3. Termination for Breach</strong>
                  <p className="mt-2 text-gray-300">Licensor may terminate this License immediately upon written notice if Licensee:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>16.3.1. Breaches Section 3 (Prohibited Activities), Section 5 (Voice Cloning), Section 7 (Confidentiality), or Attachment A (Prohibited Uses)</li>
                    <li>16.3.2. Fails to pay fees within ten (10) days of written notice of non-payment</li>
                    <li>16.3.3. Exceeds usage quotas by more than 50% without authorization for more than thirty (30) days</li>
                    <li>16.3.4. For other material breaches, Licensor shall provide thirty (30) days' written notice specifying the breach. If Licensee fails to cure within the cure period, Licensor may terminate immediately thereafter.</li>
                  </ul>
                </li>
                <li>
                  <strong>16.4. Termination by Licensee</strong>
                  <p className="mt-2 text-gray-300">
                    Licensee may terminate for Licensor's material breach by providing thirty (30) days' written notice specifying the breach. If Licensor fails to cure, Licensee may terminate and receive a pro-rata refund of prepaid fees.
                  </p>
                </li>
                <li>
                  <strong>16.5. Effect of Termination</strong>
                  <p className="mt-2 text-gray-300">Upon termination or expiration:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>16.5.1. All licenses granted herein immediately terminate</li>
                    <li>16.5.2. Licensee shall immediately cease all use of the Custom Model</li>
                    <li>16.5.3. Licensee shall delete or destroy all copies of the Custom Model, including backups, within ten (10) business days</li>
                    <li>16.5.4. Licensee shall certify in writing that all copies have been deleted</li>
                    <li>16.5.5. Licensor may remotely disable access to the Custom Model</li>
                    <li>16.5.6. Fees paid are non-refundable except as provided in Section 16.4</li>
                    <li>16.5.7. Licensee may retain Output generated prior to termination, subject to ongoing compliance with Sections 4, 5, and Attachment A</li>
                  </ul>
                </li>
                <li>
                  <strong>16.6. Survival</strong>
                  <p className="mt-2 text-gray-300">
                    The following sections survive termination: 1 (Definitions), 3 (Prohibited Activities to the extent related to pre-termination use), 5 (Voice Cloning consent obligations), 6 (Data Protection), 7 (Confidentiality), 8 (Output Ownership), 13 (Disclaimer), 14 (Limitation of Liability), 15 (Indemnification), 16.5 (Effect of Termination), 16.6 (Survival), 17 (Governing Law), 19 (Export Control), and 20 (General Provisions).
                  </p>
                </li>
              </ul>

              {/* SECTION 17 */}
              <h3 className="text-lg font-semibold mt-8 mb-3 text-purple-400">17. Governing Law and Dispute Resolution</h3>
              <ul className="legal-list space-y-4">
                <li>
                  <strong>17.1. Governing Law</strong>
                  <p className="mt-2 text-gray-300">
                    This License shall be governed by and construed in accordance with the laws of the <strong>State of Delaware, USA</strong>, without regard to its conflict of law principles.
                  </p>
                </li>
                <li>
                  <strong>17.2. Jurisdiction</strong>
                  <p className="mt-2 text-gray-300">
                    Any disputes arising from this License shall be subject to the exclusive jurisdiction of the courts located in <strong>Wilmington, Delaware</strong>.
                  </p>
                </li>
              </ul>

              {/* SECTION 18 */}
              <h3 className="text-lg font-semibold mt-8 mb-3 text-purple-400">18. Data Protection Addendum</h3>
              <p className="mb-4 text-gray-300">
                If the Custom Model processes Personal Data and a separate Data Processing Agreement (DPA) has been executed, the DPA is incorporated into this License by reference and shall take precedence over conflicting terms in Section 6.
              </p>

              {/* SECTION 19 */}
              <h3 className="text-lg font-semibold mt-8 mb-3 text-purple-400">19. Export Control and Sanctions Compliance</h3>
              <ul className="legal-list space-y-4">
                <li>
                  <strong>19.1. Export Control</strong>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>19.1.1. You shall comply with all applicable export control laws and regulations, including:</li>
                    <li>19.1.2. Export controls of India, the United States (EAR, ITAR), and the European Union</li>
                    <li>19.1.3. Sanctions programs administered by OFAC, UN, EU, and other authorities</li>
                  </ul>
                </li>
                <li>
                  <strong>19.2. Representations</strong>
                  <p className="mt-2 text-gray-300">You represent and warrant that:</p>
                  <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                    <li>19.2.1. You are not located in, or a national of, any country subject to comprehensive embargo (currently: Cuba, Iran, North Korea, Syria, Crimea region)</li>
                    <li>19.2.2. You are not listed on any restricted party list (e.g., SDN List, Entity List, Denied Persons List)</li>
                    <li>19.2.3. You will not use the Custom Model in violation of export controls or sanctions</li>
                  </ul>
                </li>
                <li>
                  <strong>19.3. Prohibited Destinations</strong>
                  <p className="mt-2 text-gray-300">
                    You shall not export, re-export, or transfer the Custom Model or any Output to prohibited destinations or parties without appropriate licenses.
                  </p>
                </li>
              </ul>

              {/* SECTION 20 */}
              <h3 className="text-lg font-semibold mt-8 mb-3 text-purple-400">20. General Provisions</h3>
              <ul className="legal-list space-y-4">
                <li>
                  <strong>20.1. Entire Agreement</strong>
                  <p className="mt-2 text-gray-300">
                    This License, together with the Commercial Agreement and any referenced DPA, constitutes the entire agreement between the parties regarding the Custom Model and supersedes all prior agreements, understandings, and communications.
                  </p>
                </li>
                <li>
                  <strong>20.2. Amendments</strong>
                  <p className="mt-2 text-gray-300">This License may only be amended by written agreement signed by both parties. Licensor may update Attachment A (Prohibited Uses) upon thirty (30) days' notice to reflect evolving legal or ethical standards.</p>
                </li>
                <li>
                  <strong>20.3. Severability</strong>
                  <p className="mt-2 text-gray-300">If any provision is held unenforceable, it shall be reformed to the minimum extent necessary to make it enforceable, and all other provisions remain in full force and effect.</p>
                </li>
                <li>
                  <strong>20.4. Waiver</strong>
                  <p className="mt-2 text-gray-300">Failure to enforce any provision does not constitute a waiver of future enforcement. Waivers must be in writing and signed by the waiving party.</p>
                </li>
                <li>
                  <strong>20.5. Assignment</strong>
                  <p className="mt-2 text-gray-300">You may not assign or transfer this License without prior written consent from Licensor. Any attempted assignment in violation is void. Licensor may assign this License in connection with a merger, acquisition, or sale of substantially all assets.</p>
                </li>
                <li>
                  <strong>20.6. Independent Contractors</strong>
                  <p className="mt-2 text-gray-300">The parties are independent contractors. This License does not create a partnership, joint venture, employment, or agency relationship.</p>
                </li>
                <li>
                  <strong>20.7. Force Majeure</strong>
                  <p className="mt-2 text-gray-300">Neither party is liable for delays or failures due to causes beyond reasonable control (natural disasters, war, terrorism, pandemics, government actions, utility failures), provided the affected party notifies the other promptly and uses reasonable efforts to mitigate.</p>
                </li>
                <li>
                  <strong>20.8. Notices</strong>
                  <p className="mt-2 text-gray-300">All notices must be in writing and sent to the addresses in the Commercial Agreement via:</p>
                  <ol className="list-none pl-6 mt-2 space-y-2 text-gray-400">
                    <li>20.8.1. Email (with read receipt)</li>
                    <li>20.8.2. Registered mail or courier service</li>
                    <li>20.8.3. Notices are deemed received:
                      <ol className="list-none pl-6 mt-2 space-y-1">
                        <li>20.8.3.1. if by email, upon read receipt;</li>
                        <li>20.8.3.2. if by mail/courier, upon delivery or five (5) days after sending.</li>
                      </ol>
                    </li>
                  </ol>
                </li>
                <li>
                  <strong>20.9. Publicity</strong>
                  <p className="mt-2 text-gray-300">Neither party may use the other's name, logo, or trademarks in marketing materials without prior written consent, except that Licensor may list Licensee as a customer in general client lists unless Licensee opts out in writing.</p>
                </li>
              </ul>

              {/* ATTACHMENT A HEADER */}
              <div className="mt-12 border-t border-gray-700 pt-8">
                <h2 className="text-2xl font-bold text-white mb-2">Attachment A: Prohibited Uses</h2>
                <h3 className="text-lg font-semibold text-gray-300 mb-6">PROHIBITED USE POLICY</h3>
                
                <p className="mb-6 text-gray-300">
                  You agree not to use the Custom Model or any Output in furtherance of the following activities. These restrictions apply in addition to the Prohibited Activities in Section 3 and are mandatory regardless of whether use is Internal or external.
                </p>
              </div>

              {/* ATTACHMENT A CONTENT */}
              <div className="space-y-8">

                {/* A.1 Legal Compliance */}
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">1. Legal Compliance and Fundamental Rights</h3>
                  <p className="mb-2 text-gray-300">You may not use the Custom Model:</p>
                  <ul className="legal-list space-y-4">
                    <li>
                      <strong>1.1. Violation of Law:</strong> In any manner that violates applicable laws, regulations, or ordinances at the national, state, local, or international level.
                    </li>
                    <li>
                      <strong>1.2. Obstruction of Justice:</strong> To obstruct justice, interfere with law enforcement, tamper with evidence, or defeat authentication mechanisms. This includes using audio enhancement to deceptively alter recordings used in legal proceedings.
                    </li>
                    <li>
                      <strong>1.3. Rights Violations:</strong> To infringe upon fundamental rights including privacy, freedom of expression, freedom of association, or freedom from discrimination.
                    </li>
                  </ul>
                </div>

                {/* A.2 Surveillance */}
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">2. Surveillance, Privacy, and Biometric Profiling</h3>
                  <p className="mb-2 text-gray-300">Given the Custom Model's capabilities for voice analysis and data extraction:</p>
                  <ul className="legal-list space-y-4">
                    <li>
                      <strong>2.1. Mass Surveillance:</strong> For real-time or retroactive mass surveillance of public or private spaces without appropriate legal authorization (warrant, consent, statutory basis).
                    </li>
                    <li>
                      <strong>2.2. Deanonymization:</strong> To identify anonymous speakers (whistleblowers, protesters, anonymous helpline callers, confidential sources) or link voice biometric data to real-world identities without consent.
                    </li>
                    <li>
                      <strong>2.3. Discriminatory Profiling:</strong> To infer sensitive attributes (race, ethnicity, political opinions, religious beliefs, union membership, health status, sexual orientation) from voice or text for purposes of discrimination, profiling, or denial of services. Accessibility features (e.g., accent-adaptive transcription) provided with informed consent are permitted.
                    </li>
                    <li>
                      <strong>2.4. Unauthorized Data Harvesting:</strong> To extract Personally Identifiable Information (PII) from datasets using NER or other techniques for purposes of data brokerage, identity theft, harassment, or stalking.
                    </li>
                    <li>
                      <strong>2.5. Social Scoring:</strong> To create social credit systems, behavioral scoring, or reputation systems that evaluate individuals without their knowledge or consent.
                    </li>
                  </ul>
                </div>

                {/* A.3 Deception */}
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">3. Deception, Impersonation, and Disinformation</h3>
                  <p className="mb-2 text-gray-300">Regarding TTS, voice conversion, LLM generation, and synthetic media:</p>
                  <ul className="legal-list space-y-4">
                    <li>
                      <strong>3.1. Non-Consensual Impersonation:</strong> To synthesize the voice, likeness, or writing style of any natural person (living or deceased) without explicit written consent as required by Section 5.
                    </li>
                    <li>
                      <strong>3.2. Political Manipulation:</strong> To generate or disseminate verifiably false information about elections, candidates, voting procedures, or political processes with intent to manipulate public opinion or suppress voter turnout.
                    </li>
                    <li>
                      <strong>3.3. Fraud and Social Engineering:</strong> To create content for vishing (voice phishing), romance scams, investment fraud, tech support scams, or any automated fraud system designed to deceive individuals into revealing sensitive information or transferring funds.
                    </li>
                    <li>
                      <strong>3.4. Forgery and Authentication Defeat:</strong> To create synthetic audio or text designed to defeat voice biometric authentication, signature verification, or other security mechanisms.
                    </li>
                    <li>
                      <strong>3.5. Misinformation at Scale:</strong> To generate and disseminate false or misleading content at scale (bot networks, fake review campaigns, astroturfing).
                    </li>
                  </ul>
                </div>

                {/* A.4 Severe Harm */}
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">4. Severe Harm, Violence, and Hate Speech</h3>
                  <p className="mb-2 text-gray-300">You may not use the Custom Model:</p>
                  <ul className="legal-list space-y-4">
                    <li>
                      <strong>4.1. Violence and Terrorism:</strong> To incite, promote, plan, or coordinate violence, terrorism, armed conflict, or violent extremism.
                    </li>
                    <li>
                      <strong>4.2. Self-Harm:</strong> To promote, encourage, or provide instructions for suicide, self-injury, or eating disorders.
                    </li>
                    <li>
                      <strong>4.3. Hate Speech:</strong> To generate, amplify, or disseminate content that demeans, vilifies, dehumanizes, or promotes violence or discrimination against individuals or groups based on protected characteristics (race, ethnicity, national origin, religion, caste, gender, sexual orientation, disability, age, etc.).
                    </li>
                    <li>
                      <strong>4.4. Harassment and Bullying:</strong> To create content for targeted harassment, cyberbullying, doxing, swatting, or coordinated attacks on individuals.
                    </li>
                    <li>
                      <strong>4.5. Sexual Abuse Material:</strong> To generate, analyze, distribute, or process:
                      <ol className="list-none pl-6 mt-2 space-y-1 text-gray-400">
                        <li>4.5.1. Child Sexual Abuse Material (CSAM)</li>
                        <li>4.5.2. Non-Consensual Intimate Imagery (NCII, "revenge porn")</li>
                        <li>4.5.3. Deepfake pornography without consent of all depicted individuals</li>
                        <li>4.5.4. Any sexually explicit content involving minors</li>
                      </ol>
                    </li>
                  </ul>
                </div>

                {/* A.5 High Stakes */}
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">5. High-Stakes Automated Decision-Making</h3>
                  <p className="mb-2 text-gray-300">You may not use the Custom Model for fully automated decision-making without meaningful human oversight in the following critical domains:</p>
                  <ul className="legal-list space-y-4">
                    <li>
                      <strong>5.1. Essential Services:</strong> Making determinations that grant or deny access to:
                      <ul className="legal-list pl-6 mt-2 space-y-1 text-gray-400">
                        <li>5.1.1. Employment (hiring, firing, promotions, performance evaluations)</li>
                        <li>5.1.2. Housing (rental applications, mortgage approvals, tenant screening)</li>
                        <li>5.1.3. Insurance (underwriting, claims denials, premium setting)</li>
                        <li>5.1.4. Credit and financial services (loan approvals, credit scoring)</li>
                        <li>5.1.5. Education (admissions, scholarship awards, academic evaluations)</li>
                      </ul>
                    </li>
                    <li>
                      <strong>5.2. Medical Decision-Making:</strong> To provide autonomous medical diagnoses, treatment recommendations, prescriptions, or triage decisions without supervision and final approval by licensed healthcare professionals. Administrative uses (transcription, scheduling, medical coding, documentation) are permitted provided Output is clearly marked as machine-generated and subject to professional review.
                    </li>
                    <li>
                      <strong>5.3. Legal Determinations:</strong> To generate legal advice, draft binding contracts, make sentencing recommendations, determine parole eligibility, or assess legal culpability without review by qualified legal counsel.
                    </li>
                    <li>
                      <strong>5.4. Critical Infrastructure:</strong> In the autonomous operation or control of critical infrastructure (power grids, water supply, transportation systems, emergency services dispatch, air traffic control) where system failure could result in loss of life, serious injury, or catastrophic property damage.
                    </li>
                    <li>
                      <strong>5.5. Law Enforcement:</strong> For predictive policing, recidivism risk assessment, or criminal sentencing without human review and consideration of fairness, bias, and due process concerns.
                    </li>
                  </ul>
                </div>

                {/* A.6 Child Safety */}
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">6. Child Safety</h3>
                  <p className="mb-2 text-gray-300">You may not use the Custom Model:</p>
                  <ul className="legal-list space-y-4">
                    <li>
                      <strong>6.1. Targeting Minors:</strong> To target advertising, manipulative content, or age-inappropriate material to individuals under 18 years of age.
                    </li>
                    <li>
                      <strong>6.2. Child Data:</strong> To process voice data, biometric data, or other Personal Data of children without verifiable parental consent as required by COPPA, GDPR Article 8, or equivalent laws.
                    </li>
                    <li>
                      <strong>6.3. Grooming or Exploitation:</strong> To facilitate child grooming, exploitation, trafficking, or abuse in any form.
                    </li>
                  </ul>
                </div>

                {/* A.7 Academic Integrity */}
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">7. Academic and Professional Integrity</h3>
                  <p className="mb-2 text-gray-300">You may not use the Custom Model:</p>
                  <ul className="legal-list space-y-4">
                    <li>
                      <strong>7.1. Academic Dishonesty:</strong> To generate academic work (essays, dissertations, theses, research papers, exam answers) for submission as one's own original work in violation of academic integrity policies. This does not prohibit legitimate uses such as research assistance, brainstorming, editing, translation, or citation generation when properly disclosed.
                    </li>
                    <li>
                      <strong>7.2. Research Misconduct:</strong> To fabricate scientific data, falsify research transcriptions, generate fake citations, manipulate peer review processes, or commit plagiarism.
                    </li>
                    <li>
                      <strong>7.3. Professional Misconduct:</strong> To generate fraudulent professional certifications, forge credentials, or create deceptive professional references.
                    </li>
                  </ul>
                </div>

                {/* A.8 Malware */}
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">8. Malware and Information Security</h3>
                  <p className="mb-2 text-gray-300">You may not use the Custom Model:</p>
                  <ul className="legal-list space-y-4">
                    <li>
                      <strong>8.1. Malicious Code:</strong> To generate, analyze, or improve malware, viruses, worms, ransomware, spyware, rootkits, or other malicious software.
                    </li>
                    <li>
                      <strong>8.2. Cyberattacks:</strong> To conduct or assist with:
                      <ul className="legal-list pl-6 mt-2 space-y-1 text-gray-400">
                        <li>8.2.1. Unauthorized network penetration or system intrusion</li>
                        <li>8.2.2. Distributed denial-of-service (DDoS) attacks</li>
                        <li>8.2.3. Phishing campaigns or credential harvesting</li>
                        <li>8.2.4. Exploitation of software vulnerabilities for malicious purposes</li>
                        <li>8.2.5. Data exfiltration or unauthorized access to systems</li>
                      </ul>
                    </li>
                    <li>
                      <strong>8.3. Security Circumvention:</strong> To defeat, bypass, or circumvent security measures, access controls, encryption, or digital rights management (DRM) systems for unauthorized purposes.
                    </li>
                  </ul>
                </div>

                {/* A.9 Market Manipulation */}
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">9. Market Manipulation and Financial Crime</h3>
                  <p className="mb-2 text-gray-300">You may not use the Custom Model:</p>
                  <ul className="legal-list space-y-4">
                    <li>
                      <strong>9.1. Market Manipulation:</strong> To engage in wash trading, spoofing, front-running, pump-and-dump schemes, or other forms of securities fraud or market manipulation.
                    </li>
                    <li>
                      <strong>9.2. Insider Trading:</strong> To process material non-public information for trading purposes in violation of securities laws.
                    </li>
                    <li>
                      <strong>9.3. Money Laundering:</strong> To facilitate money laundering, terrorist financing, sanctions evasion, or other financial crimes.
                    </li>
                    <li>
                      <strong>9.4. Fraudulent Schemes:</strong> To create or operate Ponzi schemes, pyramid schemes, advance-fee fraud, or other investment scams.
                    </li>
                  </ul>
                </div>

                {/* A.10 Environmental */}
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">10. Environmental and Public Health</h3>
                  <p className="mb-2 text-gray-300">You may not use the Custom Model:</p>
                  <ul className="legal-list space-y-4">
                    <li>
                      <strong>10.1. Environmental Harm:</strong> To evade environmental regulations, falsify emissions data, or facilitate illegal resource extraction, wildlife trafficking, or environmental crimes.
                    </li>
                    <li>
                      <strong>10.2. Public Health Threats:</strong> To promote vaccine misinformation that poses clear public health risks, market unapproved or dangerous medical treatments, or undermine evidence-based public health interventions during emergencies.
                    </li>
                    <li>
                      <strong>10.3. Dangerous Substances:</strong> To provide instructions for manufacturing dangerous biological agents, chemical weapons, explosives, or controlled substances for illegal purposes.
                    </li>
                  </ul>
                </div>

                {/* A.11 IP */}
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">11. Intellectual Property</h3>
                  <p className="mb-2 text-gray-300">You may not use the Custom Model:</p>
                  <ul className="legal-list space-y-4">
                    <li>
                      <strong>11.1. Copyright Infringement:</strong> To generate content that substantially reproduces copyrighted works (books, articles, song lyrics, screenplays, source code) in violation of copyright law.
                    </li>
                    <li>
                      <strong>11.2. Trademark Infringement:</strong> To generate content that creates likelihood of confusion with established trademarks or dilutes famous marks.
                    </li>
                    <li>
                      <strong>11.3. Counterfeit Goods:</strong> To facilitate the creation, distribution, or marketing of counterfeit goods or services.
                    </li>
                  </ul>
                </div>

                {/* A.12 Labor */}
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">12. Labor and Human Rights</h3>
                  <p className="mb-2 text-gray-300">You may not use the Custom Model:</p>
                  <ul className="legal-list space-y-4">
                    <li>
                      <strong>12.1. Human Trafficking:</strong> To facilitate human trafficking, forced labor, or modern slavery.
                    </li>
                    <li>
                      <strong>12.2. Exploitative Labor Practices:</strong> To circumvent labor laws, suppress union organizing, or facilitate wage theft.
                    </li>
                    <li>
                      <strong>12.3. Discrimination:</strong> To make employment, housing, or service decisions that discriminate on the basis of protected characteristics in violation of anti-discrimination laws.
                    </li>
                  </ul>
                </div>

              </div>

              {/* ENFORCEMENT & ACCEPTANCE FOOTER */}
              <div className="mt-12 border-t border-gray-700 pt-8 space-y-8">
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">ENFORCEMENT</h3>
                  <p className="text-gray-300 mb-2">
                    Shunya Labs reserves the right to determine, at its sole discretion, whether any use case falls within these Prohibited Uses. Violation of any provision in Attachment A constitutes material breach of this License and grounds for immediate termination under Section 16.3, plus potential legal action including injunctive relief and damages.
                  </p>
                  <p className="text-gray-300">
                    If You become aware of any third-party use of the Custom Model that violates these restrictions, You shall notify Licensor immediately at <a href="mailto:0@shunyalabs.ai" className="text-purple-400 hover:text-purple-300">0@shunyalabs.ai</a>.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3">DOCUMENT CONTROL</h3>
                  <p className="text-gray-300"><strong>Effective Date:</strong> &lt;Date&gt;</p>
                  <p className="text-gray-300"><strong>Last Updated:</strong> &lt;Date&gt;</p>
                  <div className="mt-2 text-gray-300">
                    <p><strong>Licensor Contact:</strong></p>
                    <p>Shunya Labs</p>
                    <p>Email: <a href="mailto:0@shunyalabs.ai" className="text-purple-400 hover:text-purple-300">0@shunyalabs.ai</a></p>
                    <p>Website: <a href="https://www.shunyalabs.ai" className="text-purple-400 hover:text-purple-300">https://www.shunyalabs.ai</a></p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3">ACCEPTANCE</h3>
                  <p className="text-gray-300 mb-6">
                    By accessing, installing, or using the Custom Model, Licensee acknowledges that it has read, understood, and agrees to be bound by all terms and conditions of this License.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300">
                    <div className="space-y-4">
                      <p className="text-imp-block bg-yellow-700 mt-6  px-2 inline-block font-bold">FOR SHUNYA LABS INC.:</p>
                      <div className="space-y-2">
                        <p>Signature: __________________________</p>
                        <p>Name: _____________________________</p>
                        <p>Title: ______________________________</p>
                        <p>Date: ______________________________</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-imp-block bg-yellow-700 mt-6  px-2 inline-block font-bold">FOR LICENSEE:</p>
                      <div className="space-y-2">
                        <p>Signature: __________________________</p>
                        <p>Name: _____________________________</p>
                        <p>Title: ______________________________</p>
                        <p>Legal Entity: ________________________</p>
                        <p>Date: ______________________________</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              
            </div>
            
          </div>
        </div>
        <MainFooter/>
      </div>
    </>
  );
}
