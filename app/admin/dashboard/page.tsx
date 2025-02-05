
"use client";
import React, { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Visitors from "./visitors/page";
import Sales from "./sales/page";
import Orders from "./orders/page";
import Analytics from "./analytics/page";
import Settings from "./settings/page";
import ProductsPage from "./products/page";
import AddProductPage from "./add-product/page";


export default function Dashboard() {
    const [activePage, setActivePage] = useState("orders");

    const renderPage = () => {
        switch (activePage) {
            case "orders":
                return <Orders />;
            case "sales":
                return <Sales />;
            case "visitors":
                return <Visitors />;
                case "products":
                    return <ProductsPage />;
                    case "add-products":
                        return <AddProductPage />;
            case "analytics":
                return <Analytics />;
            case "settings":
                return <Settings />;
            default:
                return <Orders />;
        }
    };

    return (
        <div className="flex h-screen bg-slate-200">
            <Sidebar activePage={activePage} setActivePage={setActivePage} />
            <div className="flex-1 overflow-y-auto p-6">
                {renderPage()}
            </div>
        </div>
    );
}