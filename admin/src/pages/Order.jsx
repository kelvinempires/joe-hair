import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const fetchAllOrders = async () => {
    if (!token) return;
    // setLoading(true);
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
    } finally {
      // setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAllOrders();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error updating order status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const downloadCSV = (orders) => {
    const headers = [
      "Name",
      "Phone",
      "Address",
      "Items",
      "Amount",
      "Payment Method",
      "Payment Status",
      "Status",
      "Date",
    ];

    const rows = orders.map((order) => {
      const name = `${order.address.firstName} ${order.address.lastName}`;
      const phone = order.address.phoneNumber;
      const address = `${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.country} ${order.address.zip}`;
      const items = order.items
        .map((item) => `${item.name} x${item.quantity} (${item.size})`)
        .join("; ");
      const amount = `${currency} ${order.amount}`;
      const paymentMethod = order.paymentMethod;
      const paymentStatus = order.payment ? "Paid" : "Pending";
      const status = order.status;
      const date = new Date(order.date).toLocaleDateString();

      return [
        name,
        phone,
        address,
        items,
        amount,
        paymentMethod,
        paymentStatus,
        status,
        date,
      ];
    });

    const csvContent = [headers, ...rows]
      .map((e) => e.map((val) => `"${val}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printOrders = () => {
    const printContent = document.getElementById("order-list").innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

const filteredOrders = orders.filter((order) => {
  const fullName = `${order?.address?.firstName || ""} ${
    order?.address?.lastName || ""
  }`.toLowerCase();
  const matchesSearch = fullName.includes(search.toLowerCase());


  const matchesStatus = statusFilter === "All" || (order.status || "").toLowerCase() === statusFilter.toLowerCase();

  return matchesSearch && matchesStatus;
});


  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div>
      <h3>Order Page</h3>

      <div className="flex flex-wrap gap-4 my-4 justify-between items-center">
        <div className="flex gap-3 sm:flex-row flex-col">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by customer name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 p-2 pl-10 rounded"
            />
            <img
              src={assets.search_icon}
              alt="Search Icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="All">All Status</option>
            <option value="Order placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivered">Out for delivered</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => downloadCSV(filteredOrders)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
          >
            Export to CSV
          </button>
          <button
            onClick={printOrders}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            Print Orders
          </button>
        </div>
      </div>

      <div id="order-list">
        {currentOrders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-sx sm:text-sm text-gray-700"
            key={index}
          >
            <div>
              {order.items.map((item) => (
                <img
                  className="w-full sm:w-28 h-full sm:h-30 rounded"
                  src={item.image}
                  alt="parcel_icon"
                />
              ))}
            </div>

            <div>
              <div>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 py-0.5">
                    {/* <img
                      src={item.image}
                      alt={item.name}
                      className="w-8 h-8 object-cover rounded"
                    /> */}
                    <span>
                      {item.name} x {item.quantity} <span>{item.size}</span>
                      {idx !== order.items.length - 1 ? "," : ""}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ",  " +
                    order.address.state +
                    ",  " +
                    order.address.country +
                    ",  " +
                    order.address.zip}
                </p>
              </div>
              <p>{order.address.phoneNumber}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                Items: {order.items.length}
              </p>
              <p className="mt-3">Payment Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Paid" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">
              {currency} {order.amount}
            </p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="p-2 font-semibold"
            >
              <option value="Order placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="shipped">Shipped</option>
              <option value="Out for delivered">Out for delivering</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
