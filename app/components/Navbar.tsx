import Link from "next/link";
import React from "react";

const Navbar = (): JSX.Element => {
  return (
    <header>
      <nav className="flex flex-col justify-center sm:items-end mr-2 mt-2 px-2">
        <div className="hidden sm:block mb-4">
        </div>
        <ul className="grid grid-cols-2 gap-2 sm:flex sm:flex-col sm:items-end sm:space-y-2 sm:gap-0 text-left">
          <li className="sm:w-40 mb-1 pl-1 pr-1 bg-white border border-black text-2xl font-sans hover:navhover">
            <Link href="/index.html">NEWSLETTER</Link>
          </li>
          <li className="sm:w-40 mb-1 pl-1 pr-1 bg-white border border-black text-2xl font-sans hover:navhover">
            <Link href="/about" as="/about.html">ABOUT</Link>
          </li>
          <li className="sm:w-40 mb-1 pl-1 pr-1 bg-white border border-black text-2xl font-sans hover:navhover">
            <Link href="/library" as="/library.html">LIBRARY</Link>
          </li>
          <li className="sm:w-40 mb-1 pl-1 pr-1 bg-white border border-black text-2xl font-sans hover:navhover">
            <Link href="/courses.html">COURSES</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;