"use client";
import React, { useState } from "react";

export default function Settings() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [theme, setTheme] = useState("light");
    const [language, setLanguage] = useState("en");
    const [privacy, setPrivacy] = useState("public");
    const [accountStatus, setAccountStatus] = useState("active");

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} transition-all`}>
            <div className="max-w-4xl mx-auto py-10 px-4">
                <h2 className="text-3xl font-bold mb-6 text-center">Settings</h2>

                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                    {/* Account Settings */}
                    <h3 className="text-2xl font-semibold mb-4">Account Settings</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p>Enable Notifications</p>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={notificationsEnabled}
                                    onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <p>Theme</p>
                            <select
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                className="bg-gray-200 dark:bg-gray-600 p-2 rounded"
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="system">System</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between">
                            <p>Language</p>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="bg-gray-200 dark:bg-gray-600 p-2 rounded"
                            >
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between">
                            <p>Privacy Settings</p>
                            <select
                                value={privacy}
                                onChange={(e) => setPrivacy(e.target.value)}
                                className="bg-gray-200 dark:bg-gray-600 p-2 rounded"
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                                <option value="friends">Friends</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between">
                            <p>Account Status</p>
                            <select
                                value={accountStatus}
                                onChange={(e) => setAccountStatus(e.target.value)}
                                className="bg-gray-200 dark:bg-gray-600 p-2 rounded"
                            >
                                <option value="active">Active</option>
                                <option value="suspended">Suspended</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
