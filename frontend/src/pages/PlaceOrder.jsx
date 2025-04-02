import React, { useContext, useState } from 'react'
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/frontend_assets/assets';
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod')
  const { navigate } = useContext(ShopContext)

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80v] border-t border-gray-300">
      {/* -----left side---- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3 ">
          <Title test1={"DELIVERY"} test2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-0.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            className="border border-gray-300 rounded py-0.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          className="border border-gray-300 rounded py-0.5 px-3.5 w-full"
          type="Email"
          placeholder="Email address"
        />
        <input
          className="border border-gray-300 rounded py-0.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-0.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            className="border border-gray-300 rounded py-0.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-0.5 px-3.5 w-full"
            type="number"
            placeholder="Zipcode optional"
          />
          <input
            className="border border-gray-300 rounded py-0.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          className="border border-gray-300 rounded py-0.5 px-3.5 w-full"
          type="number"
          placeholder="Phone number"
        />
      </div>
      {/* ----right side----- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title test1={"PAYMENT"} test2={"METHOD"} />
          {/* ---------text payment selection-------- */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className=" flex items-center gap-0 border border-gray-300 lg:border-0 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full  ${
                  method === "stripe" ? "bg-green-400" : ""
                } `}
              ></p>
              <img
                src={assets.stripe_logo}
                className="h-5 mx-4"
                alt="strip logo"
              />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className=" flex items-center gap-0 border border-gray-300 lg:border-0 p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full  ${
                  method === "razorpay" ? "bg-green-400" : ""
                } `}
              ></p>
              <img
                src={assets.razorpay_logo}
                className="h-5 mx-4"
                alt="razorpay_logo "
              />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className=" flex items-center gap-0  border border-gray-300 lg:border-0 p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-gray-300  rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                } `}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className=" w-fit text-end mt-8 lg:ml-40">
            <button onClick={()=>navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder