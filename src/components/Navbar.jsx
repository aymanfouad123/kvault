import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-10 h-14 text-white">
      <div className="logo cursor-pointer text-2xl">
        <span className="text-violet-50 font-medium">K</span>
        <span className="text-violet-600 font-bold">Vault</span>
      </div>
      <div className="navButtons hover:text-gray-300 cursor-pointer transition-colors duration-200 hover:text-[16.5px] w-[55px] flex justify-center">
        Home
      </div>
    </div>
  );
};

export default Navbar;
