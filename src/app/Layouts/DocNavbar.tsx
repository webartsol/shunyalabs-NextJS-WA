"use client";
import Link from "next/link";
import { DOCS_URL } from "../utils/constants";
import { useEffect, useState, useRef } from "react";
import { FiChevronDown, FiArrowUp } from "react-icons/fi";
import logo from "../../../assets/icons/sl-logo.png";

export default function DocNavbar() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const docnavbarRef = useRef<HTMLElement>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // ✅ Observe scroll to show/hide scroll-to-top button
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                setShowScrollTop(!entry.isIntersecting);
            },
            { threshold: 0 }
        );

        if (docnavbarRef.current) observer.observe(docnavbarRef.current);
        return () => {
            if (docnavbarRef.current) observer.unobserve(docnavbarRef.current);
        };
    }, []);

    // ✅ Close dropdowns only when clicking outside (desktop only)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Skip this logic entirely for mobile
            if (window.innerWidth < 768) return;

            // Skip when mobile dropdowns are open
            if (openDropdown === "mobile" || openDropdown?.endsWith("-m")) return;

            // Close if the click is outside docnavbar
            if (
                docnavbarRef.current &&
                !docnavbarRef.current.contains(event.target as Node)
            ) {
                setOpenDropdown(null);
            }
        };

        // ✅ Use capturing phase to ensure React state updates first
        document.addEventListener("click", handleClickOutside, true);
        return () =>
            document.removeEventListener("click", handleClickOutside, true);
    }, [openDropdown]);


    // ✅ Dropdown style with correct z-index
    const dropdownClass = (isOpen: boolean) =>
        `absolute z-[99999] top-full left-0 mt-2 w-[200px] bg-[#111] border border-gray-700 
     rounded-md shadow-lg pointer-events-auto transform transition-all duration-300 ease-out origin-top ${isOpen
            ? "opacity-100 translate-y-0 scale-100 visible"
            : "opacity-0 -translate-y-2 scale-95 invisible"
        }`;

    return (
        <nav
            ref={docnavbarRef}
            className="w-full top-0 z-[99998] py-4 h-[14vh] overflow-visible"
        >
            {/* ✅ Transparent backdrop (disabled for mobile) */}
            {openDropdown &&
                openDropdown !== "mobile" &&
                !openDropdown.endsWith("-m") && (
                    <button
                        aria-label="dropdown backdrop"
                        className="fixed inset-0 z-[99997] bg-transparent cursor-default"
                        onClick={() => setOpenDropdown(null)}
                    />
                )}

            <div className="max-w-[1330px] mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <img
                        src={logo.src}
                        alt="Shunya Labs Logo"
                        className="w-[100px] md:w-[140px]"
                        loading="lazy"
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 text-gray-300 text-sm font-medium relative">
                    {/* Product Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() =>
                                setOpenDropdown(openDropdown === "product" ? null : "product")
                            }
                            className="flex items-center gap-1 hover:text-white transition"
                        >
                            Product
                            <FiChevronDown
                                className={`h-4 w-4 transition-transform duration-300 ${openDropdown === "product" ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        <div className={dropdownClass(openDropdown === "product")}>
                            {/* <Link
                                href="/product/zero-stt"
                                className="block px-4 py-2 hover:bg-gray-800 text-gray-300 hover:text-white"
                            >
                                Zero STT
                            </Link> */}
                            <Link
                                href="/product/zero-med"
                                className="block px-4 py-2 hover:bg-gray-800 text-gray-300 hover:text-white"
                            >
                                Zero Med
                            </Link>
                        </div>
                    </div>

                    {/* Solutions Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() =>
                                setOpenDropdown(openDropdown === "solutions" ? null : "solutions")
                            }
                            className="flex items-center gap-1 hover:text-white transition"
                        >
                            Solutions
                            <FiChevronDown
                                className={`h-4 w-4 transition-transform duration-300 ${openDropdown === "solutions" ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        <div className={dropdownClass(openDropdown === "solutions")}>
                            <Link
                                href="/solutions/contact-centers"
                                className="block px-4 py-2 hover:bg-gray-800 text-gray-300 hover:text-white"
                            >
                                Contact Centers
                            </Link>
                            <Link
                                href="/solutions/media-entertainment"
                                className="block px-4 py-2 hover:bg-gray-800 text-gray-300 hover:text-white"
                            >
                                Media and Entertainment
                            </Link>

                            <Link
                                href="/solutions/healthcare"
                                className="block px-4 py-2 hover:bg-gray-800 text-gray-300 hover:text-white"
                            >
                                Healthcare
                            </Link>
                        </div>
                    </div>

                    {/* Resources Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() =>
                                setOpenDropdown(openDropdown === "resources" ? null : "resources")
                            }
                            className="flex items-center gap-1 hover:text-white transition"
                        >
                            Resources
                            <FiChevronDown
                                className={`h-4 w-4 transition-transform duration-300 ${openDropdown === "resources" ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        <div className={dropdownClass(openDropdown === "resources")}>
                            {/* <Link
                                href="/resources/blog"
                                className="block px-4 py-2 hover:bg-gray-800 text-gray-300 hover:text-white"
                            >
                                Blog
                            </Link> */}

                            <Link
                                href="/resources/about"
                                className="block px-4 py-2 hover:bg-gray-800 text-gray-300 hover:text-white"
                            >
                                About Us
                            </Link>

                            <Link
                                href="/resources/media"
                                className="block px-4 py-2 hover:bg-gray-800 text-gray-300 hover:text-white"
                            >
                                News & Media
                            </Link>
                            {/* <Link
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-800 text-gray-300 hover:text-white"
                            >
                                Case Studies
                            </Link> */}
                        </div>
                    </div>

                    {/* Single Links */}
                    <Link href={`${DOCS_URL}/batch/quickstart`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                        Documentation
                    </Link>
                    <Link href="/pricing" className="hover:text-white transition">
                        Pricing
                    </Link>
                </div>

                {/* Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    <Link
                        href="/pricing"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition"
                    >
                        Get Started
                    </Link>
                    <Link
                        href="/contact"
                        className="border border-gray-400 text-gray-200 hover:bg-gray-800 px-5 py-2 rounded-full text-sm font-semibold transition"
                    >
                        Contact Sales
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white text-xl"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden bg-[#0B0C10] border-t border-gray-700 px-6 py-4 text-gray-300 text-sm transition-all duration-300 z-[99999] relative ${mobileMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4 pointer-events-none"
                    }`}
            >
                <div className="space-y-3">
                    {/* Product */}
                    <div>
                        <button
                            onClick={() =>
                                setOpenDropdown(openDropdown === "product-m" ? null : "product-m")
                            }
                            className="flex w-full items-center justify-between text-left py-2"
                        >
                            <span>Product</span>
                            <FiChevronDown
                                className={`h-4 w-4 transition-transform duration-300 ${openDropdown === "product-m" ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        {openDropdown === "product-m" && (
                            <div className="pl-4 space-y-2">
                                <Link
                                    href="/product/zero-med"
                                    className="block hover:text-white"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Zero Med
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Solutions */}
                    <div>
                        <button
                            onClick={() =>
                                setOpenDropdown(openDropdown === "solutions-m" ? null : "solutions-m")
                            }
                            className="flex w-full items-center justify-between text-left py-2"
                        >
                            <span>Solutions</span>
                            <FiChevronDown
                                className={`h-4 w-4 transition-transform duration-300 ${openDropdown === "solutions-m" ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        {openDropdown === "solutions-m" && (
                            <div className="pl-4 space-y-2">
                                <Link
                                    href="/solutions/contact-centers"
                                    className="block hover:text-white"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Contact Centers
                                </Link>
                                <Link
                                    href="/solutions/media-entertainment"
                                    className="block hover:text-white"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Media and Entertainment
                                </Link>
                                <Link
                                    href="/solutions/healthcare"
                                    className="block hover:text-white"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Healthcare
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Resources */}
                    <div>
                        <button
                            onClick={() =>
                                setOpenDropdown(openDropdown === "resources-m" ? null : "resources-m")
                            }
                            className="flex w-full items-center justify-between text-left py-2"
                        >
                            <span>Resources</span>
                            <FiChevronDown
                                className={`h-4 w-4 transition-transform duration-300 ${openDropdown === "resources-m" ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        {openDropdown === "resources-m" && (
                            <div className="pl-4 space-y-2">
                                {/*<Link
                                    href="/resources/blog"
                                    className="block hover:text-white"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Blog
                                </Link>*/}

                                <Link
                                    href="/resources/about"
                                    className="block hover:text-white"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    About Us
                                </Link>

                                <Link
                                    href="/resources/media"
                                    className="block hover:text-white"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    News & Media
                                </Link>

                                {/* <Link
                                    href="#"
                                    className="block hover:text-white"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Case Studies
                                </Link> */}
                            </div>
                        )}
                    </div>

                    {/* Simple Links */}
                    <Link
                        href={`${DOCS_URL}/batch/quickstart`} target="_blank" rel="noopener noreferrer"
                        className="block py-2 hover:text-white"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Documentation
                    </Link>
                    <Link
                        href="/pricing"
                        className="block py-2 hover:text-white"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Pricing
                    </Link>

                    {/* Buttons */}
                    <div className="flex flex-col gap-3 mt-4">
                        <Link
                            href="/pricing"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-center font-semibold"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Get Started
                        </Link>
                        <Link
                            href="/contact"
                            className="border border-gray-400 text-gray-200 hover:bg-gray-800 px-5 py-2 rounded-full text-center font-semibold"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </div>


            {/* Scroll-to-top button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={`fixed bottom-6 right-6 z-[99996] bg-gradient-to-r from-[#6B3EFF] to-[#A156FF] text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:opacity-90 ${showScrollTop
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10 pointer-events-none"
                    }`}
                aria-label="Scroll to top"
            >
                <FiArrowUp className="h-6 w-6" />
            </button>
        </nav>
    );
}
