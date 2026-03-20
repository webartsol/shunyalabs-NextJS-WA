import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin } from 'react-icons/fa';

interface ProfileCardProps {
    profileImage: any;
    name: string;
    role: string;
    about: string;
    linkedinUrl?: string;
    imagePosition?: 'left' | 'right';
}

const ProfileCard: React.FC<ProfileCardProps> = ({
    profileImage,
    name,
    role,
    about,
    linkedinUrl,
    imagePosition = 'left'
}) => {
    return (
        <div className='max-w-5xl mx-auto '>
            <div
                className={`
        flex flex-col gap-12 p-8 rounded-lg w-full
        ${imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'}
        items-center md:items-center
      `}
            >
                {/* Profile Image */}
                <div className="shrink-0 relative rounded-lg object-cover object-center h-[180px] w-[180px] overflow-hidden">
                    <Image
                        src={profileImage}
                        alt={`${name} profile`}
                        className="rounded-lg object-cover object-center transform"  // Center the image and crop it
                        priority // Optional: Loads image immediately if above the fold
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 text-center md:text-left justify-center">
                    <h2 className="text-3xl font-semibold text-white mb-1">
                        {name}
                    </h2>

                    <p className="text-base font-normal text-[#2FC8EB] mb-4">
                        {role}
                    </p>

                    <p className="text-base leading-relaxed text-gray-400 mb-2">
                        {about}
                    </p>

                    {linkedinUrl && (
                        <Link
                            href={linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center self-center md:self-start text-gray-500 hover:text-[#0077b5] transition-colors duration-200"
                            aria-label="LinkedIn profile"
                        >
                            <FaLinkedin className="text-2xl" />
                        </Link>
                    )}
                </div>

            </div>
            
        </div>
    );
};

export default ProfileCard;
