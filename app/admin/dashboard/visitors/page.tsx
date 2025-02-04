"use client";
import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Visitors() {
    const [visitors, setVisitors] = useState<number>(12345);
    const [visitorData, setVisitorData] = useState({
        labels: [],
        datasets: [],
    });

    // Sample additional data for insights
    const [insights, setInsights] = useState({
        averageTime: "3m 45s",
        bounceRate: "45%",
        topCountries: [
            { country: "USA", percentage: "40%" },
            { country: "India", percentage: "25%" },
            { country: "Germany", percentage: "15%" },
            { country: "Canada", percentage: "10%" },
            { country: "UK", percentage: "10%" },
        ],
        topPages: [
            { page: "Home", views: 15000 },
            { page: "About Us", views: 12000 },
            { page: "Shop", views: 10000 },
        ],
    });

    useEffect(() => {
        // Fetch visitor data for the chart
        const fetchVisitorData = () => {
            // Example: Simulating fetching data
            const data = {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                    {
                        label: "Visitors Over Time",
                        data: [1200, 1500, 1800, 2000, 2200, 2500, 3000],
                        borderColor: "#4C9BFE",
                        backgroundColor: "rgba(76, 155, 254, 0.2)",
                        fill: true,
                    },
                ],
            };
            setVisitorData(data); // Update the state with valid data
        };

        fetchVisitorData();
    }, []);

    return (
        <div className="p-6 bg-slate-100 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold mb-6">Website Visitors</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Visitor Count */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-5xl font-bold text-blue-600">{visitors.toLocaleString()}</p>
                    <p className="text-gray-500">Total Visitors</p>
                </div>

                {/* Monthly Visitors Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md col-span-2 lg:col-span-1">
                    <p className="text-xl font-medium mb-4">Visitors Over Time (Monthly)</p>
                    <div className="h-64">
                        {/* Only render chart if visitorData is not empty */}
                        {visitorData && visitorData.labels.length > 0 ? (
                            <Line data={visitorData} />
                        ) : (
                            <div>Loading chart...</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Additional Insights */}
            <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4">Additional Insights</h3>
                <div className="space-y-4">
                    {/* Average Time on Site */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-xl font-medium">Average Time Spent on Site</p>
                        <p className="text-gray-500 text-lg">{insights.averageTime}</p>
                    </div>

                    {/* Bounce Rate */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-xl font-medium">Bounce Rate</p>
                        <p className="text-gray-500 text-lg">{insights.bounceRate}</p>
                    </div>

                    {/* Top Countries */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-xl font-medium">Top Visitor Countries</p>
                        <ul className="text-gray-500 text-lg">
                            {insights.topCountries.map((country, index) => (
                                <li key={index}>
                                    {country.country}: {country.percentage}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Top Pages */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-xl font-medium">Top Pages Visited</p>
                        <ul className="text-gray-500 text-lg">
                            {insights.topPages.map((page, index) => (
                                <li key={index}>
                                    {page.page}: {page.views} views
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
