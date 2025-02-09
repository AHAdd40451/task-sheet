'use client';

import { useEffect, useState } from 'react';
import { fetchSheetData } from '@/utils/sheets';

interface SheetRow {
  [key: string]: string | number;  
}

export default function Home() {
  const [data, setData] = useState<SheetRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleFetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const sheetId = '1V07ce87n7_dpb_zfFT_Tee5MfizLXdDPHoojzCDuKIs';
        const result = await fetchSheetData(sheetId);
        setData(result);
      } catch (err) {
        console.error('Sheet fetch error:', err);
        setError('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    handleFetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
