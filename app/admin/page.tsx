"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Admin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === "sobansaud3@gmail.com" && password === "soban123") {
            localStorage.setItem("isLoggedIn", "true");
            router.push("/admin/dashboard");
        } else {
            alert("Incorrect Email Or Password");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-teal-500">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg space-y-6 w-full max-w-md">
                <h2 className="text-3xl text-center font-semibold text-gray-800">Admin Login</h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email Address</label>
                        <div className="mt-1 relative">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Your Email"
                                className="w-full p-3 pl-10 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="absolute left-3 top-3 text-gray-500">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                        <div className="mt-1 relative">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Your Password"
                                className="w-full p-3 pl-10 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="absolute left-3 top-3 text-gray-500">
                                <i className="fas fa-lock"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
