// pages/index.tsx
"use client";

import { useEffect, useState } from "react";
import { loadCSV, CsvData } from "../../utils/loadCSV";
import Sidebar from "@/components/sidebar";
import { splitDivisions } from "../../utils/entries";
import Panel from "@/components/panel";

const Home = () => {
  const [data, setData] = useState<CsvData[]>([]);
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const csvData = await loadCSV("/tesla-assesments.csv"); // Ensure this is the correct path to your CSV
        setData(csvData);
      } catch (error) {
        console.error("Error loading CSV:", error);
      }
    };

    fetchData();
  }, []);


  // Filter entries based on the selected division(s)
  const filteredEntries = data.filter((entry) =>
    selectedDivision
      ? splitDivisions(String(entry.division)).includes(selectedDivision)
      : true
  );

  return (
    <main className="flex min-h-screen flex-col lg:flex-row p-6 overflow-y-none">
      <div className="flex w-full h-full">
        {/* Sidebar for Divisions and Entries */}
        {/* <div className="fixed w-full lg:w-1/3 overflow-y-scroll">
          <Sidebar data={data as CsvData[]} handleDivisionClick={setSelectedDivision}></Sidebar>
        </div> */}

        {/* Main Content Area for Card */}
        <Panel entries={filteredEntries} />

      </div>
    </main >
  );
};

export default Home;
