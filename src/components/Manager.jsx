import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  useEffect(() => {
    let passwords = localStorage.getItem("KVAULT_PASSWORDS");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const savePass = () => {
    if (!form.site.trim() || !form.username.trim() || !form.password.trim()) {
      alert("All fields are required!");
      return;
    }

    // Validation checks
    if (form.site.trim().length < 3) {
      alert("Website URL must be at least 3 characters long!");
      return;
    }

    if (form.username.trim().length < 3) {
      alert("Username must be at least 3 characters long!");
      return;
    }

    if (form.password.length < 5) {
      alert("Password must be at least 4 characters long!");
      return;
    }

    if (form.password.length > 25) {
      alert("Password is too long!");
      return;
    }

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

  const togglePasswordVisibility = (index) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="w-full flex flex-col items-center justify-start py-8 px-4">
      <div className="w-full max-w-4xl flex flex-col items-center">
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
      {/* Passwords Table */}
      <div className="w-full max-w-4xl mt-12">
        {passwordArray.length === 0 ? (
          <div className="text-center text-zinc-400 bg-zinc-900/80 rounded-xl py-8 text-lg shadow-inner">
            No passwords saved yet.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-lg mt-4">
            <table className="min-w-full bg-zinc-900/80 text-white">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-violet-400">
                    Website
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-violet-400">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-violet-400">
                    Password
                  </th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item, idx) => (
                  <tr
                    key={idx}
                    className="odd:bg-zinc-800/60 even:bg-zinc-900/60 hover:bg-violet-950/40 transition"
                  >
                    <td className="px-6 py-3 whitespace-nowrap">{item.site}</td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {item.username}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap w-[400px]">
                      <div className="flex items-center w-full">
                        <span
                          className={`flex-1 truncate ${
                            visiblePasswords[idx] ? "font-mono" : ""
                          }`}
                        >
                          {visiblePasswords[idx] ? item.password : "••••••••"}
                        </span>
                        <button
                          type="button"
                          className="ml-2 text-violet-400 hover:text-violet-200 transition-colors flex-shrink-0"
                          onClick={() => togglePasswordVisibility(idx)}
                          tabIndex={-1}
                        >
                          {visiblePasswords[idx] ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Manager;
