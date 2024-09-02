import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

function ExcelReader() {
  const [excelData, setExcelData] = useState(null);

  const handleFileRead = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      setExcelData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleFetchFromUrl = async (url='/state_M2023_dl.xlsx') => {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });

      const data = new Uint8Array(response.data);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      setExcelData(jsonData);
    } catch (error) {
      console.error('Error fetching or parsing Excel file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileRead} />
      <button onClick={handleFetchFromUrl}>Fetch from URL</button>

      {excelData && (
        <div>
          <h3>Excel Data:</h3>
          <pre>{JSON.stringify(excelData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ExcelReader;