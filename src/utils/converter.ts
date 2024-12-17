import { marked } from 'marked';
import JSZip from 'jszip';
import { ConversionFile, ConversionResult, FileFormat } from '../types';

export const convertMarkdown = (content: string, format: FileFormat): string => {
  if (format === 'html') {
    return marked(content);
  }
  return content;
};

export const createDownloadLink = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const createZipDownload = async (files: ConversionResult[]): Promise<void> => {
  const zip = new JSZip();
  
  files.forEach((file) => {
    zip.file(`${file.originalName}.html`, file.html);
    zip.file(`${file.originalName}.txt`, file.txt);
  });

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'converted_files.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};