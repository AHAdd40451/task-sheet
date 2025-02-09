export const fetchSheetData = async (sheetId: string) => {
  try {
    const response = await fetch(`/api/sheets?sheetId=${sheetId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch sheet data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw error;
  }
}; 