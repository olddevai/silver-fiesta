export type FileFormat = 'html' | 'txt';

export interface ConversionFile {
  id: string;
  name: string;
  content: string;
  lastModified: number;
}

export interface ConversionResult {
  id: string;
  html: string;
  txt: string;
  originalName: string;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}