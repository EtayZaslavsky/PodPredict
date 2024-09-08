import Papa, { ParseResult } from 'papaparse';

export interface CsvData {
  [key: string]: string | number | boolean | null; // Define your data structure based on the CSV
}

export async function loadCSV(filePath: string): Promise<CsvData[]> {
  return new Promise((resolve, reject) => {
    fetch(filePath)
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse<CsvData>(csvData, {
          header: true,
          dynamicTyping: true,
          complete: (result: ParseResult<CsvData>) => resolve(result.data),
          error: (error: Error) => reject(error.message),
        });
      })
      .catch((error) => reject(error));
  });
}
