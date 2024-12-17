import JSZip from 'jszip';
import { ConversionResult } from '../types/file';
import { FileFormat } from '../types/format';
import { convertToHtml } from './markdown';

export const convertContent = (content: string, format: FileFormat): string => {
  return format === 'html' ? convertToHtml(content) : content;
};

export const downloadFile = (content: string, filename: string): void => {
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

export const downloadZip = async (files: ConversionResult[]): Promise<void> => {
  const zip = new JSZip();
  
  files.forEach((file) => {
    zip.file(`${file.originalName}.html`, file.html);
    zip.file(`${file.originalName}.txt`, file.txt);
  });

  const content = await zip.generateAsync({ type: 'blob' });
  downloadFile(await content.text(), 'converted_files.zip');
};