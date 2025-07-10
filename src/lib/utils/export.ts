import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportToCsv = (filename: string, data: unknown[]) => {
  if (!data || data.length === 0) {
    console.warn("No data to export to CSV.");
    return;
  }

  const headers = Object.keys(data[0]);
  const csvRows = [];

  // Add headers
  csvRows.push(headers.join(','));

  // Add data rows
  for (const row of data) {
    const values = headers.map(header => {
      const escaped = ('' + row[header]).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const exportToPdf = (filename: string, title: string, headers: string[], data: (string | number)[][]) => {
  console.log(headers, data)
  const doc = new jsPDF();

  doc.text(title, 14, 16);

  // (doc as any).autoTable({
  //   head: [headers],
  //   body: data,
  //   startY: 20,
  //   styles: {
  //     fontSize: 8,
  //     cellPadding: 2,
  //   },
  //   headStyles: {
  //     fillColor: [200, 200, 200],
  //     textColor: [0, 0, 0],
  //     fontStyle: 'bold',
  //   },
  //   alternateRowStyles: {
  //     fillColor: [240, 240, 240],
  //   },
  //   theme: 'grid',
  // });

  doc.save(filename);
};
