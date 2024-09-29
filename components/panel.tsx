import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { CsvData } from "../utils/loadCSV";
import { Entry } from "./entry";

interface EntriesProps {
    entries: CsvData[];
}

export function EntriesList({ entries }: EntriesProps) {
    const searchParams = useSearchParams();
    const [filteredEntries, setFilteredEntries] = useState<CsvData[]>([]);

    useEffect(() => {
        // Get query parameters from searchParams
        const from = searchParams.get('from');
        const to = searchParams.get('to');
        const company = searchParams.get('company');

        let filtered = entries;

        // Filter by date range if from and to are present
        if (from) {
            const fromDate = new Date(from).getTime();
            filtered = filtered.filter(
                (entry) => new Date(entry.date).getTime() >= fromDate
            );
        }

        if (to) {
            const toDate = new Date(to).getTime();
            filtered = filtered.filter(
                (entry) => new Date(entry.date).getTime() <= toDate
            );
        }

        // Filter by company if provided
        // if (company) {
        //     filtered = filtered.filter((entry) =>
        //         entry.key_factor.includes(company)
        //     );
        // }

        setFilteredEntries(filtered);
    }, [searchParams, entries]);

    return (
        <div className="justify-center w-full flex">
            <div className="overflow-y-scroll max-w-2xl">
                {filteredEntries
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((entry, index) => (
                        <Entry key={String(index)} entry={entry} />
                    ))}
            </div>
        </div>
    );
}

function SuspendedEntriesList() {
    return (
        <div className="justify-center w-full flex">
            <div className="overflow-y-scroll max-w-2xl">
                <div>Loading...</div>
            </div>
        </div>
    );
}

export default function Entries({ entries }: EntriesProps) {
    return (
        <Suspense fallback={<SuspendedEntriesList />}>
            <EntriesList entries={entries} />
        </Suspense>
    );
}
