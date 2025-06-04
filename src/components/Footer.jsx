import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-black flex justify-center items-center text-center py-4 mt-8 w-full">
      <div className="text-zinc-400 text-sm">
        <p>&copy; {currentYear} KVault. All rights reserved.</p>
        <p className="text-xs mt-1 text-zinc-500">
          Your Self Hosted Password Manager
        </p>
      </div>
    </div>
  );
};

export default Footer;
