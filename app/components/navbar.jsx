"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  return (
    <nav className="bg-transparent relative">
      {/* Photo container */}
     {/*  <div className="w-full h-64 relative">
        <Image
          src="/path-to-your-photo.jpg"  // Replace with your actual photo path
          alt="Header photo"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div> */}

      <div className="flex items-center justify-between py-5 px-4">
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            className="text-[#16f2b3] text-3xl font-bold"
          >
            ANWAR HAJJI
          </Link>
        </div>
        
        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Navigation links */}
        <ul
          className={`${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          } md:max-h-screen md:opacity-100 overflow-hidden transition-all duration-300 ease-in-out absolute left-0 top-full w-full bg-gray-800 md:bg-transparent md:relative md:top-auto md:flex md:flex-row md:items-center md:space-x-4 md:w-auto z-10`}
        >
          {['about', 'experience', 'skills', 'education', 'contact', 'projects'].map((item) => (
            <li key={item} className="w-full md:w-auto">
              <Link
                className="block px-4 py-2 no-underline outline-none hover:no-underline w-full"
                href={item === 'blog' ? '/blog' : `/#${item}`}
              >
                <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600 uppercase">
                  {item}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;