import React from "react";

const Manager = () => {
  return (
    <div>
      <div className="w-screen h-[calc(100vh-56px)] flex flex-col items-center mt-13 bg-gradient-to-b from-black to-violet-900/80">
        <div className="w-full max-w-xl p-8 rounded-3xl shadow-2xl bg-zinc-900/80 backdrop-blur-md border border-zinc-700 flex flex-col items-center">
          <div className="font-light text-3xl text-white mb-8 drop-shadow-lg text-center">
            KVault - Your Self Hosted Password Manager
          </div>
          <div className="flex flex-col gap-6 w-full items-center">
            <input
              className="input-dark w-3/4"
              type="text"
              placeholder="Master Password"
            />
            <div className="flex gap-4 w-full">
              <input
                className="input-dark w-1/2"
                type="text"
                placeholder="Username"
              />
              <input
                className="input-dark w-1/2"
                type="text"
                placeholder="Password"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manager;
