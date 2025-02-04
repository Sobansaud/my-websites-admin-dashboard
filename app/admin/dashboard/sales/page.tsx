"use client";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const salesData = [
    { date: "2023-10-01", sales: 1200 },
    { date: "2023-10-02", sales: 1500 },
    { date: "2023-10-03", sales: 1800 },
    { date: "2023-10-04", sales: 2000 },
    { date: "2023-10-05", sales: 1700 },
];

export default function Sales() {
    const totalSales = salesData.reduce((acc, curr) => acc + curr.sales, 0);
    const avgSales = totalSales / salesData.length;
    const highestSales = Math.max(...salesData.map(item => item.sales));
    const bestDay = salesData.find(item => item.sales === highestSales)?.date;

    return (
        <div className="p-6 bg-slate-100 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold mb-6">Sales Overview</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Sales Data Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md col-span-2 lg:col-span-1">
                    <p className="text-xl font-medium mb-4">Sales Data (Last 5 Days)</p>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="sales" stroke="#4C9BFE" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sales Stats */}
                <div className="bg-white p-6 rounded-lg shadow-md col-span-2 lg:col-span-1">
                    <h3 className="text-lg font-semibold mb-4">Sales Insights</h3>
                    <div className="space-y-4">
                        <p className="text-xl font-bold">
                            Total Sales: <span className="text-blue-600">${totalSales.toLocaleString()}</span>
                        </p>
                        <p className="text-xl font-bold">
                            Average Daily Sales: <span className="text-green-600">${avgSales.toFixed(2)}</span>
                        </p>
                        <p className="text-xl font-bold">
                            Highest Sales Day: <span className="text-red-600">{bestDay}</span> (${highestSales})
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
