import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Order.jsx";
import Login from "./components/Login.jsx";
import { ToastContainer } from "react-toastify";
import EditProduct from "./pages/EditProduct.jsx";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "₦";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token")?localStorage.getItem("token") : "" );

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token == "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />

          <div className="flex w-full">
            <Sidebar />
            <div className="w-[80%] mx-auto ml-4 sm:ml-[max(5vh,5px)]  my-8 text-gray-600 text-base h-[calc(100vh-10px)] overflow-y-scroll scrollbar-hide">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/edit/:id" element={<EditProduct token={token} />}/>
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
