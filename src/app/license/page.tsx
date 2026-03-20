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
            <h1 className="md:text-3xl text-2xl font-semibold mb-2 text-white">Pingala V1 RAIL-M License</h1>
            <p className="text-sm text-gray-400 mb-8">Last updated: July 2025</p>
            <h2 className="text-xl font-semibold text-white">Pingala V1 RAIL-M License</h2>
            <p>Version 1.0, 2025</p>
            <p>https://shunyalabs.ai/license/</p>
            <p>Generated on: 2025-07-21 11:41:04.607000+00:00</p>
            <p><strong>License ID: </strong>27f6978b-49e2-43c8-b130-2977769547aa</p>
            <p><strong>License Template Version: </strong>e8502289197accc4ddd023f0fc234ca26062a9f1</p>
            <p><strong>Licensed Artifact(s): </strong>Model</p>
            <p className="text-gray-300 mb-6">
            Terms and Conditions for Use, Reproduction, and Distribution
            </p>

            {/* Section 1 */}
            <h2 className="text-xl font-semibold mb-3 text-white">1. Definitions</h2>
            <p className="text-gray-300 mb-3">
            <strong>"License"</strong> shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 16 of this document.
            </p>
            <p className="text-gray-300 mb-3">
            <strong>"Licensor"</strong> shall mean Shunya Labs or the copyright owner or entity authorized by the copyright owner that is granting the License.
            </p>
            <p className="text-gray-300 mb-3">
            <strong>"Legal Entity"</strong> shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control with that entity. 
            For the purposes of this definition, "control" means (i) the power, direct or indirect, to cause the direction or management of such entity, whether by contract or otherwise, 
            or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial ownership of such entity.
            </p>
            <p className="text-gray-300 mb-3">
            <strong>"You" (or "Your")</strong> shall mean an individual or Legal Entity exercising permissions granted by this License.
            </p>
            <p className="text-gray-300 mb-3">
            <strong>"Artifact"</strong> shall mean the AI model, software application, Source Code, or related materials made available under the License, 
            as indicated by a copyright notice that is included in or attached to the work.
            </p>
            <p className="text-gray-300 mb-3">
            <strong>"Model"</strong> shall mean any machine-learning based assembly or assemblies consisting of learnt weights, parameters, corresponding to the model architecture as embodied in the Source Code.
            </p>
            <p className="text-gray-300 mb-3">
            <strong>"Output"</strong> shall mean the results of operating a Model as embodied in informational content resulting therefrom.
            </p>
            <p className="text-gray-300 mb-3">
            <strong>"Use"</strong> shall mean accessing and utilizing an Artifact, including creating content, fine-tuning, updating, running, training, evaluating and/or re-parametrizing such Model.
            </p>
            <p className="text-gray-300 mb-3">
            <strong>"Contribution"</strong> shall mean any work of authorship, including the original version of the Artifact and any modifications or additions to that Artifact, 
            that is intentionally submitted to Licensor for inclusion in the Artifact by the copyright owner or by an individual or Legal Entity authorized to submit on behalf of the copyright owner.
            </p>
            <p className="text-gray-300 mb-3">
            <strong>"Contributor"</strong> shall mean Licensor and any individual or Legal Entity on behalf of whom a Contribution has been received by Licensor and subsequently incorporated within the Artifact.
            </p>

            {/* Section 2 */}
            <h2 className="text-xl font-semibold mb-3 text-white">2. Grant of Copyright License</h2>

            <p className="mb-3">Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, 
                no-charge, royalty-free copyright license to reproduce (for internal purposes only), use, publicly display, and publicly perform the Artifact, 
                subject to the restrictions in Section 4 and the usage limitations in Section 13.</p>

            {/* Section 3 */}
            <h2 className="text-xl font-semibold mb-3 text-white">3. Grant of Patent License</h2>
            <p className="mb-3">Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, 
                irrevocable (except as stated in this section) patent license to make, use, and import the Artifact, 
                where such license applies only to those patent claims licensable by such Contributor that are necessarily infringed by their Contribution(s) alone or by 
                combination of their Contribution(s) with the Artifact to which such Contribution(s) was submitted. If You institute patent litigation against any entity alleging 
                that the Artifact constitutes direct or contributory patent infringement, then any patent licenses granted to You under this License for that Artifact shall terminate 
                as of the date such litigation is filed.</p>

            {/* Section 4 */}
            <h2 className="text-xl font-semibold mb-3 text-white">4. Use-Based Restrictions</h2>
            <p className="mb-3">You may not Use the Artifact in violation of the restrictions set forth in the Attachment A (Use Restrictions) of this License. 
                These restrictions are mandatory and any violation constitutes a breach of this License.</p>

            {/* Section 5 */}
            <h2 className="text-xl font-semibold mb-3 text-white">5. Distribution Restrictions</h2>
            <p className="mb-3">You may not distribute the Artifact to any third parties, and you may not create any derivatives of the Artifact without express 
                written permission from the Licensor.</p>

            {/* Section 6 */}
            <h2 className="text-xl font-semibold mb-3 text-white">6. Output Generation</h2>
            <p className="mb-3">Except as set forth herein, Licensor claims no rights in the Output You generate using the Artifact. You are accountable for the 
                Output You generate and its subsequent uses, and no use of the Output can contravene any provision as stated in this License.</p>

            {/* Section 7 */}
            <h2 className="text-xl font-semibold mb-3 text-white">7. Notices</h2>
            <p className="mb-3">You must retain all copyright, patent, trademark, and attribution notices that accompany the Artifact.</p>

            {/* Section 8 */}
            <h2 className="text-xl font-semibold mb-3 text-white">8. Attribution Requirements</h2>
            <p className="mb-3">You must provide attribution to Shunya Labs in any Output made public or shared with third parties in the format: 
                "Powered by Pingala V1 by Shunya Labs (https://shunyalabs.ai)"</p>

            {/* Section 9 */}
            <h2 className="text-xl font-semibold mb-3 text-white">9. Trademarks</h2>
            <p className="mb-3">This License does not grant permission to use the trade names, trademarks, service marks, or product names of the 
                Licensor, except as required for reasonable and customary use in describing the origin of the Artifact and reproducing attribution notices.</p>
            
            {/* Section 10 */}
            <h2 className="text-xl font-semibold mb-3 text-white">10. Updates and Runtime Restrictions</h2>
            <p className="mb-3">To the maximum extent permitted by law, Licensor reserves the right to restrict (remotely or otherwise) 
                usage of the Artifact in violation of this License or update the Artifact through electronic means.</p>
            
            {/* Section 11 */}
            <h2 className="text-xl font-semibold mb-3 text-white">11. Disclaimer of Warranty</h2>
            <p className="mb-3">TUnless required by applicable law or agreed to in writing, Licensor provides the Artifact (and each Contributor provides its Contributions) 
                on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied, including, without limitation, any warranties or conditions of 
                TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely responsible for determining the appropriateness of using the 
                Artifact and assume any risks associated with Your exercise of permissions under this License.</p>

            {/* Section 12 */}
            <h2 className="text-xl font-semibold mb-3 text-white">12. Limitation of Liability</h2>
            <p className="mb-3">In no event and under no legal theory, whether in tort (including negligence), contract, or otherwise, unless required by applicable law 
                (such as deliberate and grossly negligent acts) or agreed to in writing, shall any Contributor be liable to You for damages, including any direct, indirect, 
                special, incidental, or consequential damages of any character arising as a result of this License or out of the use or inability to use the Artifact 
                (including but not limited to damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses), 
                even if such Contributor has been advised of the possibility of such damages.</p>

            {/* Section 13 */}
            <h2 className="text-xl font-semibold mb-3 text-white">13. Usage Threshold and Commercial Licensing</h2>
            <p className="mb-3">Free use is permitted up to 10,000 hours of audio transcription per calendar month. Beyond this limit, or for any commercial usage, 
                a commercial license is required. Use in any paid product, service, or enterprise application requires a separate commercial license. Contact: 
                0@shunyalabs.ai Visit: https://shunyalabs.ai</p>

            {/* Section 14 */}
            <h2 className="text-xl font-semibold mb-3 text-white">14. Audit and Monitoring</h2>
            <p className="mb-3">Licensor reserves the right to request logs or metadata related to usage to ensure compliance. 
                Users may be required to support audits for verification.</p>

            {/* Section 15 */}
            <h2 className="text-xl font-semibold mb-3 text-white">15. Term and Termination</h2>
            <p className="mb-3">The term of this License will commence upon Your acceptance of this License or accessing the Artifact and will continue until terminated. 
                Licensor may terminate this License if You are in breach of any term or condition. Upon termination, You shall delete and cease use of the Artifact. 
                Sections 11 and 12 shall survive termination.</p>

            {/* Section 16 */}
            <h2 className="text-xl font-semibold mb-3 text-white">16. Severability</h2>
            <p className="mb-3">If any provision of this License is held to be invalid, illegal or unenforceable, 
                the remaining provisions shall be unaffected thereby and remain valid as if such provision had not been set forth herein.</p>

        <h2 className="text-xl font-semibold text-white mb-3">END OF TERMS AND CONDITIONS</h2>
        <h3 className="text-lg font-semibold text-white">Attachment A: Use Restrictions</h3>
            <p>You agree not to use the Artifact in furtherance of any of the following:</p>
            <p className="text-gray-300 mb-3">
            <strong>Discrimination:</strong> (a) To discriminate or exploit individuals or groups based on legally protected characteristics and/or vulnerabilities. 
            (b) For purposes of administration of justice, law enforcement, immigration, or asylum processes, such as predicting that a natural person will commit a 
            crime or the likelihood thereof. (c) To engage in, promote, incite, or facilitate discrimination or other unlawful or harmful conduct in the provision of 
            employment, employment benefits, credit, housing, or other essential goods and services.
            </p>
            <p className="text-gray-300 mb-3">
            <strong>Military:</strong> (a) For weaponry or warfare. (b) For purposes of building or optimizing military weapons or in the service of nuclear proliferation 
            or nuclear weapons technology. (c) For purposes of military surveillance, including any research or development relating to military surveillance.
            </p>
            <p className="text-gray-300 mb-3">
            <strong>Legal:</strong> (a) To engage or enable fully automated decision-making that adversely impacts a natural person's legal rights without expressly and 
            intelligibly disclosing the impact and providing an appeal process. (b) To engage or enable fully automated decision-making that creates, modifies or terminates 
            a binding, enforceable obligation between entities. (c) In any way that violates any applicable national, federal, state, local or international law or regulation.
            </p>
            <p className="text-gray-300 mb-3">
            <strong>Disinformation:</strong> (a) To create, present or disseminate verifiably false or misleading information for economic gain or to intentionally deceive 
            the public, including creating false impersonations of natural persons. (b) To synthesize or modify a natural person's appearance, voice, or other individual 
            characteristics, unless prior informed consent is obtained. (c) To autonomously interact with a natural person, in text or audio format, unless disclosure and 
            consent is given prior to interaction that the system is not a natural person. (d) To defame or harm a natural person's reputation, such as by generating, creating, 
            promoting, or spreading defamatory content. (e) To generate or disseminate information and place the information in any public context without expressly and 
            intelligibly disclaiming that the information is machine generated.
            </p>
            <p className="text-gray-300 mb-3">
            <strong>Privacy:</strong> (a) To utilize personal information to infer additional personal information about a natural person, including but not limited to 
            legally protected characteristics, unless informed consent is received. (b) To generate or disseminate personal identifiable information that can be used to harm 
            an individual or invade personal privacy. (c) To engage in, promote, incite, or facilitate the harassment, abuse, threatening, or bullying of individuals or groups.
            </p>
            <p className="text-gray-300 mb-3">
            <strong>Health:</strong> (a) To provide medical advice or make clinical decisions without necessary accreditation of the system or medical professional oversight with 
            compulsory certification and safety standards. (b) To provide medical advice and medical results interpretation without external, human validation. (c) In connection 
            with any activities that present a risk of death or bodily harm to individuals, including self-harm or harm to others, or in connection with regulated or controlled 
            substances. (d) In connection with activities that present a risk of death or bodily harm, including inciting or promoting violence, abuse, or infliction of bodily harm.
            </p>
            <p className="text-gray-300 mb-3">
            <strong>General:</strong> (a) To defame, disparage or otherwise harass others. (b) To intentionally deceive or mislead others, including failing to appropriately 
            disclose to end users any known dangers of your system.
            </p>
            <p className="text-gray-300 mb-3">
            <strong>Research:</strong> (a) In connection with any academic dishonesty, including submitting any informational content or output of a Model as Your own work in any academic setting.
            </p>
            <p className="text-gray-300 mb-3">
            <strong>Malware:</strong> (a) To generate and/or disseminate malware (including but not limited to ransomware) or any other content to be used for the purpose of harming electronic systems.
            </p>
          </div>
        </div>
        <MainFooter/>
      </div>
    </>
  );
}
