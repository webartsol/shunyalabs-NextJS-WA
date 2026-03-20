'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const tabs = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms & Conditions', href: '/terms-conditions' },
  { name: 'Security Policy', href: '/security-policy' },
  // { name: 'License', href: '/license' },
  { name: 'General License', href: '/general-rail-m-license' },
  { name: 'Custom License', href: '/shunya-labs-custom-model-rail-m-license' },
];

export default function PolicyTabs() {
  const pathname = usePathname();

  return (
    <div className="flex md:space-x-8 flex-col md:flex-row border-b border-gray-700 pb-2 mb-3">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={`text-sm md:text-base font-medium transition-all duration-300 ease-in-out pb-2 ${
              isActive
                ? 'text-purple-400 border-b-2 border-purple-500'
                : 'text-gray-400'
            }`}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}
