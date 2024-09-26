import { CsvData } from "../utils/loadCSV";

export const Entry = ({ key, entry }: { key: string; entry: CsvData }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-10">
            <div className="mb-4">
                <h3 className="text-2xl font-bold ">{entry.key_factor}</h3>
                <p className="text-gray-900">{entry.date}</p>
            </div>
            <p className="text-xl mb-4">{entry.assessment}</p>
            <div className="">
                {/* <div>
                    <p className="font-semibold text-gray-700">Quote:</p>
                    <p className="text-gray-900">{entry.quote}</p>
                </div> */}
                <div>
                    <p className="font-semibold text-gray-700">Timestamp:</p>
                    <p className="text-gray-900">{entry.timestamp_duration
                    }</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-700">Link:</p>
                    <a
                        href={String(entry.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        hear that episode
                    </a>
                </div>
            </div>
        </div>
    )
}