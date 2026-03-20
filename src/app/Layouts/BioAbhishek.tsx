import Image from "next/image";
import React from "react";

const AuthorBio = () => {
    return (
        <div className="mb-0 mt-8">
            <div className="bg-[#232328] p-5 rounded-xl border border-gray-700">
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-4">
                    {/* Circular Image */}
                    <div className="flex items-center justify-center w-[50px] h-[50px] rounded-full overflow-hidden border border-gray-600 flex-shrink-0">
                        <Image
                            src="/assets/images/Author1.jpg" // Placeholder image path
                            alt="Abhishek"
                            className="object-cover w-full h-full"
                            width={56}
                            height={56}
                            quality={100}
                            loading="lazy"
                        />
                    </div>

                    {/* Divider */}
                    <div className="text-4xl font-light mb-2">|</div>

                    {/* Name and Role */}
                    <div>
                        <p className="text-lg font-semibold text-white">Abhishek Sharma</p>
                        <p className="text-xs text-gray-400">
                            Co-founder & CBO
                        </p>
                    </div>
                </div>

                {/* Bio Section */}
                {/* <p className="text-gray-300 text-2sm leading-relaxed mb-2">
                    <span className="font-semibold text-white">Bio: </span>
                    Helped build TenMarks (acquired by Amazon) and Dineout (acquired by Swiggy) alongside incredible teams. Learned more from the journey than the outcomes. ISB’Hyderabad (PGPMAX).
                </p> */}

                {/* <p className="text-gray-400 text-2sm leading-relaxed">
                    [Add additional background or experience here]
                </p> */}
            </div>
        </div>
    );
};

export default AuthorBio;
