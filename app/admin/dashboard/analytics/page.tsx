"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const analyticsData = [
    { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
    { name: "May", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
];

export default function Analytics() {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">Analytics Dashboard</h2>

                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <p className="text-gray-600">Total Revenue</p>
                            <p className="text-2xl font-semibold text-gray-900">$45,300</p>
                        </div>
                        <div className="bg-blue-100 p-4 rounded-full">
                            <i className="fas fa-dollar-sign text-blue-500 text-3xl"></i>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <p className="text-gray-600">New Users</p>
                            <p className="text-2xl font-semibold text-gray-900">1,230</p>
                        </div>
                        <div className="bg-green-100 p-4 rounded-full">
                            <i className="fas fa-users text-green-500 text-3xl"></i>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <p className="text-gray-600">Orders Completed</p>
                            <p className="text-2xl font-semibold text-gray-900">12,120</p>
                        </div>
                        <div className="bg-yellow-100 p-4 rounded-full">
                            <i className="fas fa-check-circle text-yellow-500 text-3xl"></i>
                        </div>
                    </div>
                </div>

                {/* Monthly Performance Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-10">
                    <h3 className="text-2xl font-semibold mb-6">Monthly Performance</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={analyticsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="uv" fill="#8884d8" />
                            <Bar dataKey="pv" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <p className="text-gray-600">Bounce Rate</p>
                            <p className="text-2xl font-semibold text-gray-900">35%</p>
                        </div>
                        <div className="bg-red-100 p-4 rounded-full">
                            <i className="fas fa-arrow-down text-red-500 text-3xl"></i>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <p className="text-gray-600">Conversion Rate</p>
                            <p className="text-2xl font-semibold text-gray-900">5.3%</p>
                        </div>
                        <div className="bg-purple-100 p-4 rounded-full">
                            <i className="fas fa-percent text-purple-500 text-3xl"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
