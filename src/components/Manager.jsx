import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaEdit } from "react-icons/fa";
import { TbCopyPlus } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [modal, setModal] = useState({ open: false, type: "", item: null });

  // Fetch all passwords from backend
  const getPasswords = async () => {
    const res = await fetch("http://localhost:3000/passwords");
    const data = await res.json();
    setPasswordArray(data);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  // Add a password
  const addPassword = async (password) => {
    await fetch("http://localhost:3000/passwords", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(password),
    });
    getPasswords(); // Refresh list
    toast.success("Password Saved Successfully!", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
      transition: Bounce,
    });
  };

  // Delete a password
  const deletePassword = async (id, suppressToast = false) => {
    try {
      const response = await fetch(`http://localhost:3000/passwords/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Delete result:", result);

      getPasswords();
      if (!suppressToast) {
        toast.success("Password Deleted!", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error deleting password:", error);
      toast.error(`Failed to delete password: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const handleCopy = (text) => {
    toast.success("Copied to Clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };

  const handleDeletePrompt = (item) => {
    console.log("handleDeletePrompt - Full item:", item);
    console.log("handleDeletePrompt - Item ID:", item._id);
    console.log("handleDeletePrompt - ID type:", typeof item._id);
    setModal({ open: true, type: "delete", item });
  };

  const handleEditPrompt = (item) => {
    setModal({ open: true, type: "edit", item });
  };

  // Handle form submission
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

    addPassword(form);
    setForm({ site: "", username: "", password: "" });
  };

  const editPassword = (item) => {
    deletePassword(item._id, true); // suppress toast
    setForm({
      site: item.site,
      username: item.username,
      password: item.password,
    });
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
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-zinc-900 rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center border border-violet-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              {modal.type === "delete" ? "Delete Password?" : "Edit Password?"}
            </h2>
            <p className="text-zinc-300 mb-6">
              {modal.type === "delete"
                ? "Are you sure you want to delete this password? This action cannot be undone."
                : "Do you want to edit this password entry?"}
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white transition"
                onClick={() => setModal({ open: false, type: "", item: null })}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white transition"
                onClick={() => {
                  if (modal.type === "delete") {
                    deletePassword(modal.item._id);
                  } else if (modal.type === "edit") {
                    editPassword(modal.item);
                  }
                  setModal({ open: false, type: "", item: null });
                }}
              >
                {modal.type === "delete" ? "Delete" : "Edit"}
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
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
                  <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-violet-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item, idx) => (
                  <tr
                    key={idx}
                    className="odd:bg-zinc-800/60 even:bg-zinc-900/60 hover:bg-violet-950/40 transition"
                  >
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2 justify-between">
                        <span className="truncate">{item.site}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(item.site)}
                          className="text-violet-400 hover:text-violet-200 active:text-violet-300 active:scale-90 transition-colors"
                          title="Copy"
                        >
                          <TbCopyPlus />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2 justify-between">
                        <span className="truncate">{item.username}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(item.username)}
                          className="text-violet-400 hover:text-violet-200 active:text-violet-300 active:scale-90 transition-colors"
                          title="Copy"
                        >
                          <TbCopyPlus />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap w-[300px]">
                      <div className="flex items-center w-full gap-2">
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
                          title={visiblePasswords[idx] ? "Hide" : "Show"}
                        >
                          {visiblePasswords[idx] ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopy(item.password)}
                          className="text-violet-400 hover:text-violet-200 active:text-violet-300 active:scale-90 transition-colors"
                          title="Copy"
                        >
                          <TbCopyPlus />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2 justify-center">
                        <button
                          type="button"
                          onClick={() => handleDeletePrompt(item)}
                          className="text-violet-400 hover:text-violet-200 active:text-violet-300 active:scale-90 transition-colors"
                          title="Delete"
                        >
                          <MdDelete />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEditPrompt(item)}
                          className="text-violet-400 hover:text-violet-200 active:text-violet-300 active:scale-90 transition-colors"
                          title="Edit"
                        >
                          <FaEdit />
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
