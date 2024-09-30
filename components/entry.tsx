import { useState } from "react";
import { CsvData } from "../utils/loadCSV";

export const Entry = ({ entry }: { entry: CsvData }) => {
    const [showSource, setShowSource] = useState(false);

    const handleToggleSource = () => {
        setShowSource(!showSource);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-10">
            <div className="mb-4">
                <h3 className="text-2xl font-bold inline">{entry.key_factor} </h3>
                <span className="text-lg text-gray-400">({entry.sentiment_score * 10})</span>
                <p className="text-gray-900">{entry.date instanceof Date ? entry.date.toDateString() : entry.date}</p>
            </div>
            <p className="text-xl mb-4">{entry.assessment}</p>

            <div>

                {entry.division.split(',').map((division, index) => (
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" key={index}>{division.trim()}</span>
                ))}

                <button
                    onClick={handleToggleSource}
                    className="text-black border mb-4 border-black underline p-2 text-xs rounded-md hover:bg-black hover:text-white focus:outline-none"
                >
                    {showSource ? 'Hide Source' : 'View Source'}
                </button>

                <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${showSource ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    {showSource && (
                        <div className="mt-4">
                            <p>
                                {entry.episode_name} ({entry.timestamp_duration}).
                                <a
                                    href={String(entry.link)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-black-400 underline"
                                > link
                                </a>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
