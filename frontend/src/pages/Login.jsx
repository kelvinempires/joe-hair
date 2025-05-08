import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/frontend_assets/assets";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!backendUrl) {
      toast.error("Backend URL is not configured.");
      return;
    }

    setLoading(true); // Start loading

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Sign up successful! Redirecting...");
          navigate("/");
        } else {
          toast.error(response.data.message || "Sign up failed.");
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Login successful! Redirecting...");
          navigate("/");
        } else {
          toast.error(response.data.message || "Login failed.");
        }
      }
    } catch (error) {
      console.error("Error during login/signup:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      navigate("/");
    }
  }, [setToken, navigate]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? null : (
        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
          <img src={assets.person} alt="Person Icon" />
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="bg-transparent outline-none text-gray-300"
            placeholder="Name"
            aria-label="Name"
            required
          />
        </div>
      )}
      <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
        <img src={assets.mail} alt="Mail Icon" />
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="bg-transparent outline-none text-gray-300"
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
          className="bg-transparent outline-none text-gray-300"
          placeholder="Password"
          aria-label="Password"
          required
        />
      </div>

      <div className="w-full flex flex-col justify-between text-sm mt-[-8px]">
        <div>
          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-500 cursor-pointer"
          >
            Forgot password?
          </p>
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-900 text-gray-200 font-medium hover:bg-indigo-900 hover:cursor-pointer hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-900 transition-all flex items-center justify-center"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : currentState === "Login" ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
        <div>
          {currentState === "Login" ? (
            <p className="text-gray-400 text-center mt-4 text-xs">
              Don&apos;t have an account?{" "}
              <span
                onClick={() => setCurrentState("Sign Up")}
                className="text-indigo-400 cursor-pointer underline"
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p className="text-gray-400 text-center mt-4 text-xs">
              Already have an account?{" "}
              <span
                onClick={() => setCurrentState("Login")}
                className="text-indigo-400 cursor-pointer underline"
              >
                Login
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default Login;
