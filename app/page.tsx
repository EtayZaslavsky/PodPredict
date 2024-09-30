"use client"; // Add this to mark the component as a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation
import DarkModeToggle from "@/components/darkToggle";

const Choice = () => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [company, setCompany] = useState("tesla");
    const [isFadingOut, setIsFadingOut] = useState(false);
    const router = useRouter();

    const handleNavigateToSentiments = () => {
        setIsFadingOut(true);
        // Construct query string based on available parameters
        const queryParams = new URLSearchParams();

        if (from) queryParams.append('from', from);
        if (to) queryParams.append('to', to);
        if (company) queryParams.append('company', company);

        setTimeout(() => {
            router.push(`/sentiments?${queryParams.toString()}`); // Navigate with query params
        }, 500); // Delay for animation
    };

    const handleNavigateToGraph = () => {
        setIsFadingOut(true);
        // Construct query string based on available parameters
        const queryParams = new URLSearchParams();

        if (from) queryParams.append('from', from);
        if (to) queryParams.append('to', to);
        if (company) queryParams.append('company', company);

        setTimeout(() => {
            router.push(`/graph?${queryParams.toString()}`); // Navigate with query params
        }, 500); // Delay for animation
    };

    return (
        <div className={`flex flex-col justify-center items-center h-screen bg-gray-50 dark:bg-gray-900 ${isFadingOut ? 'opacity-0 transition-opacity duration-500' : 'opacity-100'}`}>
            <h1 className="text-4xl font-bold mb-10 text-center text-black dark:text-white">PodPredict</h1>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <div className="flex flex-col items-center">
                    <label htmlFor="from" className="mb-2 font-semibold text-black dark:text-white">From</label>
                    <input type="date" id="from" name="from" className="border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-black dark:text-white" onChange={(e) => setFrom(e.target.value)} />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="to" className="mb-2 font-semibold text-black dark:text-white">To</label>
                    <input type="date" id="to" name="to" className="border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-black dark:text-white" onChange={(e) => setTo(e.target.value)} />
                </div>

                <div className="flex flex-col items-center">
                    <label htmlFor="company" className="mb-2 font-semibold text-black dark:text-white">Choose a company:</label>
                    <select name="company" id="company" defaultValue="tesla" className="border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-black dark:text-white" onChange={(e) => setCompany(e.target.value)}>
                        <option value="tesla">Tesla</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-row gap-8 justify-center items-center">
                {/* <button
                    className="mt-8 bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-500 dark:hover:bg-blue-400 transition-all"
                    onClick={handleNavigateToSentiments}
                >
                    Read Assesments
                </button> */}
                <button
                    className="mt-8 bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-500 dark:hover:bg-blue-400 transition-all"
                    onClick={handleNavigateToSentiments}
                >
                    Show Sentiments
                </button>
                {/* <button
                    className="mt-8 bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-500 dark:hover:bg-blue-400 transition-all"
                    onClick={handleNavigateToGraph}
                >
                    Show Sentiments Graph
                </button> */}
            </div>

        </div>
    );
}

export default Choice;
