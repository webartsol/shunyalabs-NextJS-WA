"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

interface Props {
  title: string;
  sub?: string[];
  isOpen: boolean;
  onClick: () => void;
}

export default function SidebarItem({ title, sub, isOpen, onClick }: Props) {
  const pathname = usePathname();

  // Create main path slug
  const mainPath = `/documentation/${title.toLowerCase().replace(/\s+/g, "-")}`;
  const isActiveMain = pathname === mainPath;

  return (
    <div>
      {/* ✅ If item has submenu */}
      {sub ? (
        <>
          <button
            onClick={onClick}
            className={`flex justify-between items-center w-full py-2 px-2 text-left ${
              isActiveMain ? "text-purple-600 font-semibold" : "text-gray-700"
            }`}
          >
            <span>{title}</span>
            <span>{isOpen ? <FiChevronDown /> : <FiChevronRight />}</span>
          </button>

          {isOpen && (
            <div className="ml-4 mt-1 border-l border-gray-300 pl-3 space-y-1">
              {sub.map((sublink) => {
                const subPath = `${mainPath}/${sublink.toLowerCase().replace(/\s+/g, "-")}`;
                const isActive = pathname === subPath;

                return (
                  <Link
                    key={sublink}
                    href={subPath}
                    className={`block text-sm py-1 ${
                      isActive
                        ? "text-purple-600 font-semibold border-l-2 border-purple-500 pl-2"
                        : "text-gray-700"
                    }`}
                  >
                    {sublink}
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        // ✅ Direct link (no submenu)
        <Link
          href={mainPath}
          className={`block py-2 px-2 ${
            isActiveMain
              ? "text-purple-600 font-semibold border-l-2 border-purple-500"
              : "text-gray-700"
          }`}
        >
          {title}
        </Link>
      )}
    </div>
  );
}
