"use client";

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { CsvData } from "../../utils/loadCSV";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';

// Register the ArcElement for Doughnut charts and other necessary plugins
ChartJS.register(ArcElement, Tooltip, Legend);

type EntriesProps = {
    entries: CsvData[]
}

export default function Graph({ entries }: EntriesProps) {
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

    const chartData = {
        datasets: [{
            label: 'Dataset 1',
            data: entries.map(entry => entry.sentiment_score * 10),
            backgroundColor: '#ff0000',
        }],
    };

    return (
        <Doughnut data={chartData} />
    );
}
