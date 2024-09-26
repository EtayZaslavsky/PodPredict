import { CsvData } from "../utils/loadCSV";
import { Entry } from "./entry";

interface EntriesProps {
    entries: CsvData[];
}

export default function EntriesList({ entries }: EntriesProps) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Entries</h2>
            <div className="overflow-y-scroll">
                {entries
                    .map((entry, index) => (
                        <Entry key={String(index)} entry={entry} />
                    ))}
            </div>
        </div>
    );
}
