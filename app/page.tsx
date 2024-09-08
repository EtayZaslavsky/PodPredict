// pages/index.tsx
"use client";

import { useEffect, useState } from "react";
import { loadCSV, CsvData } from "../utils/loadCSV";

const Home = () => {
  const [data, setData] = useState<CsvData[]>([]);
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<CsvData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const csvData = await loadCSV("/tesla-assesments.csv"); // Ensure this is the correct path to your CSV
        setData(csvData);
      } catch (error) {
        console.error("Error loading CSV:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle entry selection
  const handleEntryClick = (entry: CsvData) => {
    setSelectedEntry(entry);
  };

  // Function to handle division selection
  const handleDivisionClick = (division: string) => {
    setSelectedDivision(division);
    setSelectedEntry(null); // Reset selected entry when a new division is selected
  };

  // Function to handle back button click
  const handleBackClick = () => {
    setSelectedDivision(null);
    setSelectedEntry(null);
  };

  // Helper function to truncate text
  const truncateText = (text: string, maxWords: number): string => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  // Helper function to split and normalize divisions
  const splitDivisions = (divisions: string): string[] => {
    if (!divisions) return [];
    return divisions
      .split(",")
      .map((division) => division.trim())
      .filter((division) => division); // Remove any empty strings
  };

  // Get unique divisions from the data
  const divisions = Array.from(
    new Set(data.flatMap((entry) => splitDivisions(String(entry.division))))
  );

  // Filter entries based on the selected division(s)
  const filteredEntries = data.filter((entry) =>
    selectedDivision
      ? splitDivisions(String(entry.division)).includes(selectedDivision)
      : true
  );

  return (
    <main className="flex min-h-screen flex-col lg:flex-row p-6">
      <div className="flex w-full h-full">
        {/* Sidebar for Divisions and Entries */}
        <div className="w-full lg:w-1/3 p-4 border-r border-gray-300">
          {!selectedDivision ? (
            <>
              <h2 className="text-xl font-bold mb-4">Divisions</h2>
              <ul className="mb-6">
                {divisions.map((division) => (
                  <li key={division}>
                    <button
                      onClick={() => handleDivisionClick(division)}
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
            </>
          ) : (
            <>
              <button
                onClick={handleBackClick}
                className="text-blue-500 mb-4 underline"
              >
                &larr; Back to Divisions
              </button>
              <h3 className="text-lg font-semibold mb-2">Entries</h3>
              <ul>
                {filteredEntries.map((entry, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleEntryClick(entry)}
                      className={`block w-full text-left px-4 py-2 mb-2 rounded ${selectedEntry === entry
                        ? "bg-blue-300 text-white"
                        : "bg-gray-200"
                        }`}
                    >
                      {truncateText(String(entry.key_factor), 4)}{" "}
                      {/* Truncate key_factor to 4 words */}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Main Content Area for Card */}
        <div className="w-full lg:w-2/3 p-4">
          {isLoading ? (
            <p>Loading CSV data...</p>
          ) : selectedEntry ? (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">{selectedEntry.key_factor}</h3>
              <p className="mb-4">{selectedEntry.assessment}</p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="font-semibold text-gray-700">Date:</p>
                  <p className="text-gray-900">{selectedEntry.date}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Quote:</p>
                  <p className="text-gray-900">{selectedEntry.quote}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Timestamp:</p>
                  <p className="text-gray-900">{selectedEntry.timestamp_duration
                  }</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Link:</p>
                  <a
                    href={String(selectedEntry.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    hear that episode
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <p>Please select a division and an entry to display the details.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
