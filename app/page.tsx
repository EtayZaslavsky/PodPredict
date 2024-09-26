"use client"; // Add this to mark the component as a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation

const Choice = () => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [company, setCompany] = useState("tesla");
    const [isFadingOut, setIsFadingOut] = useState(false);
    const router = useRouter();

    const handleNavigate = () => {
        setIsFadingOut(true);
        setTimeout(() => {
            router.push(`/sentiments?from=${from}&to=${to}&company=${company}`); // Use router.push with query params
        }, 500); // Delay for animation
    };

    return (
        <div className={`flex flex-col justify-center items-center h-screen bg-gray-50 ${isFadingOut ? 'opacity-0 transition-opacity duration-500' : 'opacity-100'}`}>
            <h1 className="text-4xl font-bold mb-10 text-center">PodPredict</h1>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-10 p-6 bg-white rounded-lg shadow-md">
                <div className="flex flex-col items-center">
                    <label htmlFor="from" className="mb-2 font-semibold">From</label>
                    <input type="date" id="from" name="from" className="border border-gray-300 rounded p-2" onChange={(e) => setFrom(e.target.value)} />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="to" className="mb-2 font-semibold">To</label>
                    <input type="date" id="to" name="to" className="border border-gray-300 rounded p-2" onChange={(e) => setTo(e.target.value)} />
                </div>

                <div className="flex flex-col items-center">
                    <label htmlFor="company" className="mb-2 font-semibold">Choose a company:</label>
                    <select name="company" id="company" defaultValue="tesla" className="border border-gray-300 rounded p-2" onChange={(e) => setCompany(e.target.value)}>
                        <option value="tesla">Tesla</option>
                        <option value="apple">Apple</option>
                    </select>
                </div>
            </div>

            <button
                className="mt-8 bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-500 transition-all"
                onClick={handleNavigate}
            >
                Show Sentiments
            </button>
        </div>
    );
}

export default Choice;
