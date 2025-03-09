import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-gray-900 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* לוגו */}
        <div className="text-white text-2xl font-bold flex items-center">
          <Link href="/">
            <Image width={100} height={100} alt="logo" src="data:image/jpeg;base64,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" />
          </Link>
        </div>

        {/* כפתורים */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-white text-lg hover:text-gray-400 transition duration-200">
            דף הבית
          </Link>
        </div>

        {/* כפתור תפריט עבור מסכים קטנים */}
        <div className="md:hidden">
          <button className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
