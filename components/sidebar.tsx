import { CsvData } from "../utils/loadCSV";
import { useState } from "react";
import { splitDivisions } from "../utils/entries";

interface SidebarProps {
    data: CsvData[]; // Define the expected data prop
    handleDivisionClick: (division: string) => void;
}

export default function Sidebar({ data, handleDivisionClick }: SidebarProps) {  // Destructure data from props

    const [selectedDivision, setSelectedDivision] = useState<string | null>(null);

    const privateHandleDivisionClick = (division: string) => {
        setSelectedDivision(division);
        handleDivisionClick(division);
    };

    // Helper function to truncate text
    const truncateText = (text: string, maxWords: number): string => {
        const words = text.split(" ");
        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(" ") + "...";
        }
        return text;
    };

    // Get unique divisions from the data
    const divisions = Array.from(
        new Set(data.flatMap((entry) => splitDivisions(String(entry.division))))
    );

    return (
        <div className="w-full lg:w-1/3 p-4 border-r border-gray-300 height-full">
            <h2 className="text-xl font-bold mb-4">Divisions</h2>
            <ul className="mb-6">
                {divisions.map((division, index) => (
                    <li key={index}>
                        <button
                            onClick={() => privateHandleDivisionClick(division)}
                            className={`block w-full text-left px-4 py-2 mb-2 rounded ${selectedDivision === division
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100"
                                }`}
                        >
                            {division}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
