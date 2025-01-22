import React from "react";
import { ModeToggle } from "./ModdleToggle";

const Navbar = () => {
  return (
    <nav className="bg-blue-700 dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="text-xl font-semibold text-white">
            Licitaciones MP
          </span>
        </a>

        {/* Mobile Menu Button */}
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 text-sm text-white rounded-lg md:hidden hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:hover:bg-gray-800 dark:focus:ring-gray-700"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Menu Items */}
        <div
          className="hidden md:flex md:space-x-8 md:items-center w-full md:w-auto"
          id="navbar-dropdown"
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 text-white">
            <li>
              <a
                href="#"
                className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-blue-800 md:hover:bg-transparent"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-blue-800 md:hover:bg-transparent"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-blue-800 md:hover:bg-transparent"
              >
                API
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-blue-800 md:hover:bg-transparent"
              >
                Docs
              </a>
            </li>
            <li>
              <ModeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
