import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful! Redirecting...");
        navigate("/admin/dashboard");
      } else {
        toast.error(response.data.message || "Login failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">Admin Login</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
        <img src={assets.mail} alt="Mail Icon" />
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="bg-transparent outline-none text-gray-300 w-full"
          placeholder="Email"
          aria-label="Email"
          required
        />
      </div>

      <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
        <img src={assets.lock} alt="Lock Icon" />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="bg-transparent outline-none text-gray-300 w-full"
          placeholder="Password"
          aria-label="Password"
          required
        />
      </div>

      <div className="w-full text-sm text-right mt-[-8px]">
        <p
          onClick={() => navigate("/reset-password")}
          className="text-indigo-400 cursor-pointer underline"
        >
          Forgot password?
        </p>
      </div>

      <button
        type="submit"
        className="w-full py-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-900 text-gray-200 font-medium hover:from-indigo-600 hover:to-indigo-800 transition-all flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Logging in...</span>
          </div>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
};

export default Login;
