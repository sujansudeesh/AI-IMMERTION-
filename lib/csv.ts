export function convertToCSV(data: Record<string, any>[]): string {
  if (!data || data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const rows = data.map(row => 
    headers.map(header => {
      const val = row[header];
      const stringified = val === null || val === undefined ? '' : String(val);
      // Escape double quotes
      const escaped = stringified.replace(/"/g, '""');
      return `"${escaped}"`;
    }).join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}
