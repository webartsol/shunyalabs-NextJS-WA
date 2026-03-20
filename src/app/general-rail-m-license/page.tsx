import MainFooter from "@/app/Layouts/MainFooter";
import Navbar from "@/app/Layouts/Navbar";
import PolicyTabs from "@/app/Layouts/PolicyTabs";
import type { Metadata } from "next";

export default function page() {
  return (
    <>
      <div className="min-h-screen bg-shunya-labs text-gray-200 pt-20">
        <Navbar />

        {/* Content Container */}
        <div className="max-w-5xl mx-auto px-3 md:px-10 pb-8 md:py-10">
          {/* Tabs Navigation */}
          <PolicyTabs />

          {/* Main Security Section */}
          <div className="bg-black/40 p-6 md:p-10 rounded-2xl shadow-lg border border-gray-800 mt-0 md:mt-8 legal-content">
            <h1>Shunya Labs Inc. General RAIL-M License</h1>
            <p>Version 2.0</p>
            <p> Licensor: Shunya Labs</p>
            <p> Contact: 0@shunyalabs.ai</p>
            
            <h2>Terms and Conditions for Use, Reproduction, and Distribution</h2>
            
            {/* Section 1 */}
            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">1. Definitions</h3>
            <ul className="legal-list space-y-4">
              <li>
                <strong>1.1. "License" </strong>shall mean the terms and conditions for use, reproduction, and distribution as defined by this document.
              </li>
              <li>
                <strong>1.2. "Licensor" </strong>shall mean <strong>Shunya Labs</strong> or the copyright owner or entity authorized by the copyright owner that is granting the License.
              </li>
              <li>
                <strong>1.3. "Contributor"</strong> shall mean Licensor and any individual or Legal Entity on behalf of whom a Contribution has been received by Licensor.
              </li>
              <li>
                <strong>1.4. "You" (or "Your") </strong>shall mean an individual or Legal Entity exercising permissions granted by this License.
              </li>
              <li>
                <strong>1.5. "Legal Entity" </strong>shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control with that entity. For the purposes of this definition, "control" means (i) the power, direct or indirect, to cause the direction or management of such entity, whether by contract or otherwise, or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial ownership of such entity.
              </li>
              <li>
                <strong>1.6. "Use" </strong>shall mean to access, download, execute, copy, modify, or apply the Artifact for any purpose.
              </li>
              <li>
                <strong>1.7. "Artifact" </strong>shall mean the AI model, algorithms, weights, parameters, software application, Source Code, or related materials made available under the License.
              </li>
              <li>
                <strong>1.8. "Model"</strong> shall mean the machine-learning-based assembly included in the Artifact, covering technologies including but not limited to:
                <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                  <li><strong>1.8.1. ASR / STT: </strong>Automatic Speech Recognition / Speech-to-Text (Transcription).</li>
                  <li><strong>1.8.2. TTS:</strong> Text-to-Speech (Synthesis).</li>
                  <li><strong>1.8.3. LLM: </strong>Large Language Models (Text generation/Reasoning).</li>
                  <li><strong>1.8.4. NER: </strong>Named Entity Recognition.</li>
                  <li><strong>1.8.5. Speaker Diarization: </strong>Partitioning an audio stream into segments according to identity ("who spoke when").</li>
                  <li><strong>1.8.6. Speaker Identification: </strong>Determining the specific identity of a speaker.</li>
                  <li><strong>1.8.7. VAD: </strong>Voice Activity Detection.</li>
                  <li><strong>1.8.8. Audio Enhancement: </strong>Denoising, dereverberation, or signal processing.</li>
                </ul>
              </li>
              <li>
                <strong>1.9. "Open Model" </strong>shall mean an Artifact that has been publicly released and listed by the Licensor on the<strong> Hugging Face</strong> platform or an equivalent public repository approved by Shunya Labs.
              </li>
              <li>
                <strong>1.10. "Custom Model" </strong>shall mean an Artifact developed, fine-tuned, or delivered specifically for a client or entity by the Licensor (including bespoke LLMs or specialized acoustic models), which is not listed as an Open Model.
              </li>
              <li>
                <strong>1.11. "Output" </strong>shall mean the results of operating a Model, including generated audio, text transcripts, metadata, labels, or enhanced audio files.
              </li>
              <li>
                <strong>1.12. "Voice Cloning" </strong>shall mean the use of the Artifact to synthesize, mimic, or replicate the voice, likeness, or speech patterns of a specific natural person.
              </li>
              <li>
                <strong>1.13. "Personal Data"</strong> shall mean any information relating to an identified or identifiable natural person as defined under applicable data protection laws.
              </li>
              <li>
                <strong>1.14. "Commercial Use" </strong>shall mean use of the Artifact in connection with any product or service for which users pay fees, subscriptions, or which generates revenue through advertising, data sales, or indirect monetization, regardless of whether a free tier is offered.
              </li>
            </ul>

            {/* Section 2 */}
            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">2. Grant of Copyright License</h3>
            <p>Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free copyright license to reproduce, use, publicly display, and publicly perform the Artifact, subject to the <strong>classification-based restrictions</strong> outlined in<strong> Section 5</strong> and <strong>Section 13</strong>.</p>

            {/* Section 3 */}
            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">3. Grant of Patent License</h3>
            <p>Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable (except as stated in this section) patent license to make, use, and import the Artifact. If You institute patent litigation against any entity alleging that the Artifact constitutes direct or contributory patent infringement, then any patent licenses granted to You under this License shall terminate as of the date such litigation is filed.</p>

            {/* Section 4 */}
            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">4. Use-Based Restrictions</h3>
            <p>You may not Use the Artifact in violation of the restrictions set forth in <strong>Attachment A (Use Restrictions)</strong> of this License. These restrictions are mandatory, and any violation constitutes a breach of this License.</p>

            {/* Section 5 */}
            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">5. Distribution and Redistribution Rights</h3>
            <p>Your right to distribute the Artifact depends on the classification of the Model:</p>
            <ul className="legal-list space-y-4">
              <li>
                <strong>5.1. Open Models:</strong>
                <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                  <li><strong>5.1.1. No Redistribution: </strong>You may not distribute, sublicense, or provide access to the Artifact (including model weights, parameters, or derivatives) to any third party without express written permission from Licensor.</li>
                  <li><strong>5.1.2. Output Distribution: </strong>You may distribute Output generated by the Artifact subject to Section 7 and Section 8 (attribution requirements).</li>
                  <li><strong>5.1.3. Exception: </strong>If Licensor designates a specific Open Model under an alternative license (e.g., Apache 2.0, MIT), those terms supersede this Section 5.</li>
                </ul>
              </li>
              <li>
                <strong>5.2. Custom Models:</strong>
                <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                  <li><strong>5.2.1. Prohibition: </strong>You are strictly <strong>prohibited</strong> from distributing, sharing, sub-licensing, or providing access to the Artifact (weights, parameters, or code) to any third party. Custom Models are licensed for<strong> Internal Use Only</strong> by the Legal Entity named in the commercial agreement.</li>
                  <li><strong>5.2.2. Internal Use Defined: </strong>Internal Use means use by employees, contractors, and consultants of the licensed Legal Entity who have a legitimate business need and are bound by confidentiality obligations. Providing access to affiliates, subsidiaries, or parent companies requires separate licensing.</li>
                </ul>
              </li>
            </ul>

            {/* Section 6 */}
            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">6. Voice Cloning and Consent Requirements</h3>
            <p>If the Artifact is utilized for Text-to-Speech (TTS), Voice Conversion, or Speaker Identification:</p>
            <ul className="legal-list space-y-4">
              <li>
                <strong>6.1. Consent:</strong> You may not use the Artifact to clone a natural person's voice or identify non-public individuals without their explicit, written, and informed consent.
              </li>
              <li>
                <strong>6.2. Verification: </strong>Prior to using the Artifact for any specific voice cloning task, You must share a copy of the written consent or legal authorization with Shunya Labs.
              </li>
              <li>
                <strong>6.3. Verification Procedure:</strong>
                <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                  <li><strong>6.3.1.</strong> For commercial deployments, You must implement a consent verification system that prevents Output generation without valid consent documentation;</li>
                  <li><strong>6.3.2.</strong> Consent records must be maintained for five (5) years and made available to Licensor upon request;</li>
                  <li><strong>6.3.3.</strong> Each consent must include: (i) identity verification of the consenting party, (ii) specific use case description, (iii) duration of consent, and (iv) right to withdraw consent.</li>
                </ul>
              </li>
              <li>
                <strong>6.4. Public Figures: </strong>Voice cloning of public figures is prohibited except where:
                <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                  <li><strong>6.4.1.</strong> Used for purposes protected under applicable law (criticism, commentary, parody, educational use), AND</li>
                  <li><strong>6.4.2.</strong> Output is clearly labeled as synthetic/AI-generated, AND</li>
                  <li><strong>6.4.3.</strong> Does not violate personality/publicity rights under applicable law.</li>
                  <li><strong>6.4.4.</strong> For deceased individuals, authorization from the estate or legal heirs is required.</li>
                </ul>
              </li>
            </ul>

            {/* Section 7 */}
            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">7. Output Generation</h3>
            <p>Except as set forth herein, Licensor claims no rights in the Output You generate using the Artifact. You are accountable for the Output You generate (including transcriptions, translations, and synthesized audio) and its subsequent uses. No use of the Output can contravene any provision as stated in this License.</p>

            {/* Section 8 */}
            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">8. Attribution Requirements</h3>
            <p>You must provide attribution to Shunya Labs where technically feasible:</p>
            <ul className="legal-list space-y-4">
              <li>
                <strong>8.1. Public-Facing Output: </strong>Include "Powered by Shunya Labs AI (https://www.shunyalabs.ai)" in user-facing interfaces or documentation;
              </li>
              <li>
                <strong>8.2. API/Backend Use: </strong>Include attribution in API documentation, terms of service, or "About" sections;
              </li>
              <li>
                <strong>8.3. Waiver: </strong>Attribution may be omitted in contexts where display is not technically feasible (e.g., embedded voice responses) provided You maintain attribution in user-facing documentation.
              </li>
            </ul>

            {/* Section 9 */}
            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">9. Trademarks</h3>
            <p>This License does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor, except as required for reasonable and customary use in describing the origin of the Artifact and reproducing attribution notices.</p>

            {/* Section 10 */}
            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">10. Updates and Runtime Restrictions</h3>
            <p>To the maximum extent permitted by law, Licensor reserves the right to restrict usage of the Artifact in violation of this License or update the Artifact through electronic means.</p>

            {/* Section 11 */}
            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">11. Disclaimer of Warranty</h3>
            <p>Unless required by applicable law or agreed to in writing, Licensor provides the Artifact on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.</p>

            {/* Section 12 */}
            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">12. Limitation of Liability</h3>
            <p>In no event shall the Licensor be liable to You for damages, including any direct, indirect, special, incidental, or consequential damages arising out of the use or inability to use the Artifact.</p>

            {/* Section 13 */}
            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">13. Usage Thresholds and Commercial Licensing</h3>
            <p>The usage rights and fees associated with the Artifact are determined by its classification:</p>
            <ul className="legal-list space-y-4">
              <li>
                <strong>13.1. Open Models (Hugging Face Listed)</strong>
              </li>
              <li>
                <strong>13.2. Free Tier: </strong>Free use is permitted for:
                <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                  <li><strong>13.2.1.</strong> Non-commercial research and personal projects, OR</li>
                  <li><strong>13.2.2.</strong> Commercial use processing up to 10,000 hours of audio per calendar month</li>
                </ul>
              </li>
              <li>
                <strong>13.3. Usage Tracking: </strong>You must implement reasonable usage tracking mechanisms. Upon request, You shall provide Licensor with aggregate usage reports.
              </li>
              <li>
                <strong>13.4. Commercial License Required: </strong>Beyond the Free Tier, or for integration into paid products/services, contact [0@shunyalabs.ai](mailto:0@shunyalabs.ai) for commercial terms.
              </li>
              <li>
                <strong>13.5. Custom Models:</strong> Refer to the specific RAIL Licensing agreement for Custom Models
              </li>
            </ul>
            <p><strong>Contact: </strong>0@shunyalabs.ai<strong> | Visit:</strong> https://www.shunyalabs.ai</p>

            {/* Section 14 */}
            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">14. Audit and Monitoring</h3>
            <ul className="legal-list space-y-4">
              <li>
                <strong>14.1.</strong> Licensor may request usage reports, consent documentation (for TTS/Cloning), or compliance records upon thirty (30) days' written notice, no more than once per calendar year unless breach is suspected;
              </li>
              <li>
                <strong>14.2.</strong> You shall provide requested information within thirty (30) days;
              </li>
              <li>
                <strong>14.3.</strong> Licensor shall treat all audit information as confidential and use it solely for compliance verification;
              </li>
              <li>
                <strong>14.4.</strong> Audits shall be conducted during business hours and shall not unreasonably disrupt Your operations.
              </li>
            </ul>

            {/* Section 15 */}
            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">15. Term and Termination</h3>
            <ul className="legal-list space-y-4">
              <li>
                <strong>15.1. Term: </strong>This License remains in effect until terminated.
              </li>
              <li>
                <strong>15.2. Termination for Breach: </strong>Licensor may terminate this License if You breach any material term, provided:
                <ul className="legal-list pl-6 mt-2 space-y-2 text-gray-400">
                  <li><strong>15.2.1.</strong> Licensor provides written notice specifying the breach;</li>
                  <li><strong>15.2.2.</strong> You fail to cure the breach within thirty (30) days (or ten (10) days for payment-related breaches);</li>
                  <li><strong>15.2.3.</strong> Immediate termination without cure period applies to violations of Section 6 (Voice Cloning) or Attachment A.</li>
                </ul>
              </li>
              <li>
                <strong>15.3. Effect of Termination: </strong>Upon termination, You shall immediately cease all use of the Artifact, delete all copies, and certify compliance in writing within ten (10) days.
              </li>
              <li>
                <strong>15.4. Survival: </strong>Sections 7, 9, 11, 12, 18, and this Section 15.4 survive termination.
              </li>
            </ul>

            {/* Section 16 */}
            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">16. Governing Law and Jurisdiction</h3>
            <p>This License shall be governed by the laws of the State <strong>of Delaware, USA</strong>, without regard to conflict of law principles. Any disputes arising from this License shall be subject to the exclusive jurisdiction of courts in <strong>Wilmington, State of Delaware, USA. </strong></p>

            {/* Section 17 */}
            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">17. Data Protection</h3>
            <p>Where the Artifact processes Personal Data, You shall:</p>
            <ul className="legal-list space-y-4">
              <li>
                <strong>17.1.</strong> Comply with all applicable data protection laws including GDPR, CCPA, and DPDPA (Digital Personal Data Protection Act);
              </li>
              <li>
                <strong>17.2.</strong> Implement appropriate technical and organizational security measures;
              </li>
              <li>
                <strong>17.3.</strong> Not process Personal Data in violation of data subjects' rights;
              </li>
              <li>
                <strong>17.4.</strong> Maintain records of processing activities as required by law.
              </li>
            </ul>

            {/* Section 18 */}
            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">18. Indemnification</h3>
            <p>You agree to indemnify, defend, and hold harmless Licensor from any claims, damages, losses, liabilities, and expenses (including reasonable attorneys' fees) arising from: (a) Your use of the Artifact; (b) Your violation of this License; or (c) Your infringement of any third-party rights through use of the Artifact.</p>

            {/* Section 19 */}
            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">19. Export Control</h3>
            <p>You shall comply with all applicable export control laws and regulations, including those of India, Singapore, the United States, and the European Union. You represent that You are not located in, or a national of, any country subject to embargo, and are not on any restricted party list.</p>

            {/* Section 20 */}
            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">20. Severability</h3>
            <p>If any provision of this License is held to be unenforceable or invalid, such provision shall be reformed only to the extent necessary to make it enforceable, and the remaining provisions shall remain in full force and effect.</p>

            {/* Attachment A */}
            <h2>Attachment A: Use Restrictions</h2>
            
            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">1. Prohibited Use Policy</h3>
            <p>You agree not to use the Artifact, or any Output generated by the Artifact, in furtherance of any of the following activities. These restrictions apply to all Models (Open and Custom), including but not limited to LLMs, ASR, TTS, Speaker Identification, and Audio Enhancement tools.</p>

            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">2. Legal Compliance and Fundamental Rights</h3>
            <p>You may not use the Artifact:</p>
            <ul className="legal-list space-y-4">
              <li>
                <strong>2.1. Violation of Law: </strong>In any manner that violates applicable national, federal, state, local, or international laws, regulations, or ordinances.
              </li>
              <li>
                <strong>2.2. Interference with Justice: </strong>To obstruct justice, interfere with law enforcement investigations, or tamper with evidence (e.g., using Denoise/Audio Enhancement tools to deceptively alter recordings used in legal proceedings).
              </li>
              <li>
                <strong>2.3. Violation of Rights: </strong>To infringe upon the fundamental rights of individuals, including the right to privacy, freedom of expression, and freedom from discrimination.
              </li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">3. Surveillance, Privacy, and Biometric Profiling</h3>
            <p>Given the capability of the Artifact to analyze identity (Speaker ID/Diarization) and extract data (NER), You may not use the Artifact:</p>
            <ul className="legal-list space-y-4">
              <li>
                <strong>3.1. Mass Surveillance: </strong>For real-time or retroactive mass surveillance of public spaces or private communications without a warrant or explicit consent.
              </li>
              <li>
                <strong>3.2. Deanonymization: </strong>To identify anonymous speakers (e.g., whistleblowers, protesters, helpline callers) or link voice biometric data to real-world identities without consent ("Doxxing").
              </li>
              <li>
                <strong>3.3. Discriminatory Biometric Categorization: </strong>To infer sensitive attributes (race, ethnicity, political opinions, religious beliefs, health status) from voice or text FOR THE PURPOSE OF discrimination, profiling, or denial of services. This does not prohibit accessibility features (e.g., accent-adaptive transcription) or optional user-facing analytics provided with informed consent.
              </li>
              <li>
                <strong>3.4. Unauthorized Data Extraction: </strong>To use Named Entity Recognition (NER) to harvest Personally Identifiable Information (PII) from datasets for the purpose of selling data, identity theft, or harassment.
              </li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">4. Deception, Impersonation, and Disinformation</h3>
            <p>Regarding Text-to-Speech (TTS), Voice Conversion, and LLM generation, You may not use the Artifact:</p>
            <ul className="legal-list space-y-4">
              <li>
                <strong>4.1. Non-Consensual Impersonation: </strong>To synthesize the voice or likeness of any natural person (living or deceased) without explicit, informed, written consent (as detailed in Section 6 of the License).
              </li>
              <li>
                <strong>4.2. Political Disinformation: </strong>To generate or disseminate verifiably false information regarding elections, public policy, or public figures with the intent to manipulate public opinion or undermine democratic processes.
              </li>
              <li>
                <strong>4.3. Social Engineering and Fraud: </strong>To generate content for "vishing" (voice phishing), scam calls, or automated fraud systems intended to deceive individuals into revealing sensitive information or transferring funds.
              </li>
              <li>
                <strong>4.4. Forgery: </strong>To create audio or text aimed at counterfeiting authentication mechanisms (e.g., voice banking biometrics).
              </li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">5. Severe Harm, Violence, and Hate Speech</h3>
            <p>You may not use the Artifact:</p>
            <ul className="legal-list space-y-4">
              <li>
                <strong>5.1. Promotion of Violence:</strong> To incite, promote, or encourage violence, terrorism, self-harm, suicide, or eating disorders.
              </li>
              <li>
                <strong>5.2. Hate Speech: </strong>To generate content that demeans, vilifies, or promotes discrimination against individuals or groups based on protected characteristics (race, gender, sexual orientation, religion, disability, age, etc.).
              </li>
              <li>
                <strong>5.3. Sexual Abuse Material: </strong>To generate, analyze, or process sexually explicit content, including but not limited to Child Sexual Abuse Material (CSAM) or Non-Consensual Intimate Imagery (NCII/Deepfake pornography).
              </li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">6. High-Stakes Decision Making (Critical Domains)</h3>
            <p>You may not use the Artifact for fully automated decision-making without human oversight in domains where errors could have serious consequences ("High-Risk AI Systems"):</p>
            <ul className="legal-list space-y-4">
              <li>
                <strong>6.1. Essential Services:</strong> Denying access to employment, housing, insurance, credit, or educational opportunities based on automated analysis (e.g., analyzing speech patterns to reject a job applicant).
              </li>
              <li>
                <strong>6.2. Medical Decision-Making: </strong>To provide autonomous medical diagnoses, treatment recommendations, or prescriptions without supervision by a licensed healthcare professional. Administrative uses (transcription, appointment scheduling, medical record management) are permitted provided Output is clearly marked as machine-generated and subject to professional review.
              </li>
              <li>
                <strong>6.3. Legal Counsel: </strong>To generate legal advice or draft binding legal contracts without review by a qualified attorney.
              </li>
              <li>
                <strong>6.4. Critical Infrastructure: </strong>In the operation or management of critical infrastructure (energy grids, traffic control, water supply) where system failure could cause physical injury or death.
              </li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">7. Academic and Professional Integrity</h3>
            <p>You may not use the Artifact:</p>
            <ul className="legal-list space-y-4">
              <li>
                <strong>7.1. Academic Dishonesty: </strong>To generate academic work (essays, dissertations, research papers, exam answers) for submission as one's own original work in violation of academic integrity policies. This does not prohibit legitimate uses such as research assistance, brainstorming, editing, or citation generation when properly disclosed.
              </li>
              <li>
                <strong>7.2. Falsification of Research: </strong>To fabricate scientific data, falsify transcriptions of research interviews, or generate misleading citations.
              </li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3 text-purple-400">8. Malware and Information Security</h3>
            <p>You may not use the Artifact:</p>
            <ul className="legal-list space-y-4">
              <li>
                <strong>8.1. Malicious Code: </strong>To generate executable code for viruses, worms, ransomware, or other malware.
              </li>
              <li>
                <strong>8.2. Cyberattacks: </strong>To assist in cyberattacks, including vulnerability scanning or automated hacking attempts.
              </li>
            </ul>
            <p><strong>Enforcement: </strong>Shunya Labs reserves the right to determine, at its sole discretion, whether a specific use case falls under these restrictions. Violation of Attachment A results in the immediate termination of the License and may lead to legal action.</p>

          </div>
        </div>
        <MainFooter/>
      </div>
    </>
  );
}
