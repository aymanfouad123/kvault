import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("KVAULT_PASSWORDS");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const savePass = () => {
    setPasswordArray([...passwordArray, form]);
    localStorage.setItem(
      "KVAULT_PASSWORDS",
      JSON.stringify([...passwordArray, form])
    );
    setForm({ site: "", username: "", password: "" });
  };

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="w-full h-[calc(100vh-56px)] mt-13 flex justify-center">
        <div className="w-2/3 flex flex-col items-center">
          <div className="flex flex-col font-medium text-3xl text-white mb-8 drop-shadow-lg text-center gap-1">
            <div>
              <span className="text-violet-50">K</span>
              <span className="text-violet-600 font-bold">Vault</span>
            </div>
            <span className="font-light text-[20px]">
              Your Self Hosted Password Manager
            </span>
          </div>
          <div className="flex flex-col gap-6 w-full items-center">
            <input
              className="input-dark w-3/4"
              value={form.site}
              onChange={handleForm}
              name="site"
              type="text"
              placeholder="Enter Website URL"
            />
            <div className="flex gap-4 w-full">
              <input
                className="input-dark w-1/2"
                value={form.username}
                onChange={handleForm}
                name="username"
                type="text"
                placeholder="Enter Username"
              />
              <div className="relative w-1/2">
                <input
                  className="input-dark w-full pr-10"
                  value={form.password}
                  name="password"
                  onChange={handleForm}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-violet-400 hover:text-violet-200"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={savePass}
            className="mt-6 w-1/2 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-light shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
          >
            Add Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Manager;
