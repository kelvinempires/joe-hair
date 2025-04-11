import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { Contact } from "./pages/Contact";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer,} from "react-toastify";


function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] xl:px-[15vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

// import { Route, Routes } from "react-router-dom";
// import React from "react";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Collection from "./pages/Collection";
// import { Contact } from "./pages/Contact";
// import Login from "./pages/Login";
// import PlaceOrder from "./pages/PlaceOrder";
// import Orders from "./pages/Orders";
// import Product from "./pages/Product";
// import Cart from "./pages/Cart";

// const App = () => {
//   return (
//     <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] xl:px-[15vw]">
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/collection" element={<Collection />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/Place-order" element={<PlaceOrder />} />
//         <Route path="/order" element={<Orders />} />
//         <Route path="product/:productId" element={<Product />} />
//         <Route path="cart" element={<Cart/>}/>
//       </Routes>
//     </div>
//   );
// };

// export default App;
