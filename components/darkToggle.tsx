"use client"; // Add this to mark the component as a Client Component

import { useState, useEffect } from "react";

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Toggle dark mode
    const toggleDarkMode = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove("dark");
        } else {
            document.documentElement.classList.add("dark");
        }
        setIsDarkMode(!isDarkMode);
    };

    // Detect system dark mode on load
    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add("dark");
            setIsDarkMode(true);
        }
    }, []);

    return (
        <button
            className="mt-4 text-sm text-gray-900 dark:text-gray-100"
            onClick={toggleDarkMode}
        >
            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
    );
};

export default DarkModeToggle;
