import React from "react";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-10 h-14 text-white">
      <div className="logo cursor-pointer text-2xl">
        <span className="text-violet-50 font-medium">K</span>
        <span className="text-violet-600 font-bold">Vault</span>
      </div>
      <a
        href="https://github.com/aymanfouad123/kvault"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1 rounded-lg transition-colors duration-200 text-base font-light shadow hover:shadow-lg"
      >
        <FaGithub />
        Github
      </a>
    </div>
  );
};

export default Navbar;
