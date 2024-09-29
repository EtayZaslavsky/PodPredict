import Papa, { ParseResult } from 'papaparse';

export interface CsvData {
  key_factor: string;
  division: string;
  specific_division: string;
  sentiment_score: number;
  probability: number;
  assessment: string;
  quote: string;
  timestamp_duration: string;
  string_date: string;
  date: Date; // Can be a string when raw from CSV, or Date after parsing
  link: string;
  episode_name: string;
}

// Function to parse date from DD/MM/YYYY format
const parseDate = (dateString: string): Date | null => {
  const [day, month, year] = dateString.split('/').map(Number);
  const parsedDate = new Date(year, month - 1, day);
  return isNaN(parsedDate.getTime()) ? null : parsedDate;
};

// Function to process the CSV rows and handle any date fields
const processCsvData = (data: CsvData[]): CsvData[] => {
  return data.map((row) => {
    if (row.timestamp_duration && typeof row.timestamp_duration === 'string') {
      if (row.timestamp_duration[0] === '0' && row.timestamp_duration[1] === '0') {
        row.timestamp_duration = row.timestamp_duration.slice(3);
      }
      if (row.timestamp_duration[8] === '0' && row.timestamp_duration[9] === '0') {
        row.timestamp_duration = row.timestamp_duration.slice(0, 8) + row.timestamp_duration.slice(11);
      }

    }
    // Assuming that 'date' is the field name for date strings in the CSV
    if (row.date && typeof row.date === 'string') {
      var date = parseDate(row.date);
      if (date) {
        row.date = date;
      } else {
        console.error('Error parsing date:', row.date);
      }
    }
    return row;
  });
};

export async function loadCSV(filePath: string): Promise<CsvData[]> {
  return new Promise((resolve, reject) => {
    fetch(filePath)
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse<CsvData>(csvData, {
          header: true,
          dynamicTyping: true,
          complete: (result: ParseResult<CsvData>) => {
            const processedData = processCsvData(result.data); // Process date fields
            resolve(processedData); // Return the processed data
          },
          error: (error: Error) => reject(error.message),
        });
      })
      .catch((error) => reject(error));
  });
}
