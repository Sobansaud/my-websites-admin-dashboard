
"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Swal from "sweetalert2";
import SafeguardRoute from "@/app/components/SafeguardRoute";
import Image from "next/image";

interface Order {
    _id: string;
    firstName: string;
    lastName: string;
    streetAddress: string;
    zipCode: string;
    cartItems: { title: string; productImage: string, price: number }[];
    total: number;
    status: string | null;
    city: string;
    phoneNumber: string;
    email: string;
}

export default function Dashboard() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        client.fetch(
            `*[_type == "order"]{
                _id, 
                firstName,
                lastName,
                streetAddress,
                zipCode,
               cartItems[]->{
        title,
        productImage,
        price
    },
                total,
                status,
                city,
                phoneNumber,
                email
            }`
        )
        .then(data => setOrders(data))
        .catch(error => console.error("Error fetching orders", error));
    }, []);

    const filteredOrders = filter === "All" ? orders : orders.filter(order => order.status === filter);

    const toggleOrderDetails = (orderId: string) => {
        setSelectedOrderId((prev) => (prev === orderId ? null : orderId));
    };

    const handleDelete = async (orderId: string) => {
        const result = await Swal.fire({
            title: "Are you sure you want to delete this order?",
            text: "You will not be able to recover this order.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        });

        if (!result.isConfirmed) return;

        try {
            await client.delete(orderId);
            setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
            Swal.fire("Deleted!", "Order has been deleted", "success");
        } catch (error) {
            Swal.fire("Error deleting order", "Error deleting order", "error");
        }
    };

    const handleStatusChange = async (orderId: string, status: string) => {
        try {
            await client.patch(orderId).set({ status }).commit();
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId ? { ...order, status } : order
                )
            );

            Swal.fire("Status Updated", `Order marked as ${status}`, "success");
        } catch (error) {
            console.error("Error updating order status", error);
        }
    };

    return (
        <SafeguardRoute>
            <div className="flex flex-col h-screen bg-slate-200">
                <nav className="bg-white p-4 shadow-md">
                    <h2 className="font-bold text-2xl">Admin Dashboard</h2>
                    <div className="flex space-x-4 mt-4">
                        {["All", "pending", "shipped", "delivered"].map((status) => (
                            <button
                                key={status}
                                className={`px-4 py-2 rounded-lg transition-all ${
                                    filter === status ? "bg-blue-500 text-white" : "bg-slate-100"
                                }`}
                                onClick={() => setFilter(status)}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>
                </nav>
                <div className="flex-1 p-6 overflow-y-auto">
                    <h2 className="text-2xl font-bold text-center mb-6">Orders</h2>
                    <div className="overflow-y-auto bg-white rounded-lg shadow-sm">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left">Order ID</th>
                                    <th className="px-6 py-3 text-left">Customer Name</th>
                                    <th className="px-6 py-3 text-left">Address</th>
                                    <th className="px-6 py-3 text-left">Status</th>
                                    <th className="px-6 py-3 text-left">Total</th>
                                    <th className="px-6 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredOrders.map((order) => (
                                    <React.Fragment key={order._id}>
                                        <tr
                                            className="cursor-pointer hover:bg-gray-50 transition-all"
                                            onClick={() => toggleOrderDetails(order._id)}
                                        >
                                            <td className="px-6 py-4">{order._id}</td>
                                            <td className="px-6 py-4">{order.firstName} {order.lastName}</td>
                                            <td className="px-6 py-4">{order.streetAddress}, {order.city}, {order.zipCode}</td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={order.status || ""}
                                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                    className="bg-slate-100 p-1 rounded"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="delivered">Delivered</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4">${order.total}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(order._id);
                                                    }}
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // Implement edit functionality
                                                    }}
                                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition ml-2"
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                        {selectedOrderId === order._id && (
                                            <tr>
                                                <td colSpan={6} className="bg-gray-50 p-4">
                                                    <h3 className="font-bold mb-2">Order Details</h3>
                                                    <p>Phone: <strong>{order.phoneNumber}</strong></p>
                                                    <p>Email: <strong>{order.email}</strong></p>
                                                    <ul className="mt-4">
                                                        {order.cartItems.map((item, index) => (
                                                            <li key={`${order._id}-${index}`} className="flex items-center space-x-4 mb-4">
                                                                <div className="flex items-center space-x-2">
                                                                    {item.productImage && (
                                                                        <Image
                                                                            src={urlFor(item.productImage).url()}
                                                                            alt={item.title}
                                                                            width={50}
                                                                            height={50}
                                                                            className="rounded"
                                                                        />
                                                                    )}
                                                                    <div>
                                                                        <p className="font-semibold">{item.title}</p>
                                                                        <p className="text-gray-600">${item.price}</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </SafeguardRoute>
    );
}



