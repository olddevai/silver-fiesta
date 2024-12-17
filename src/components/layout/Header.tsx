import React from 'react';
import { Sun, Moon, FileType2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileType2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Markdown Converter
          </h1>
        </div>
        <Button
          variant="ghost"
          icon={isDark ? Sun : Moon}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        />
      </div>
    </header>
  );
};