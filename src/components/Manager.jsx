import React from "react";

const Manager = () => {
  return (
    <div>
      <div className="w-screen h-[calc(100vh-56px)]">
        <div className="main text-white">
          <input className="input-dark w-64" type="text" />
          <div className="flex">
            <input className="input-dark w-64" type="text" />
            <input className="input-dark w-64" type="text" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manager;
