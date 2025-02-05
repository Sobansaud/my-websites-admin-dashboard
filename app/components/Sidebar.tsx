
import React from "react";

interface SidebarProps {
    activePage: string;
    setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
    return (
        <div className="w-64 bg-white shadow-md p-4">
            <h2 className="font-bold text-xl mb-6">Dashboard</h2>
            <ul className="space-y-4">
                {["orders", "sales", "visitors","products","add-products", "analytics", "settings"].map((page) => (
                    <li key={page}>
                        <button
                            onClick={() => setActivePage(page)}
                            className={`w-full text-left p-2 rounded-lg transition-all ${
                                activePage === page ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            {page.charAt(0).toUpperCase() + page.slice(1)}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;