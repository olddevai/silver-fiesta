import React from 'react';
import { Copy } from 'lucide-react';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  fileId: string;
}

export const Editor: React.FC<EditorProps> = ({ content, onChange, fileId }) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      // Toast notification handled by parent
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative h-full">
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Copy content"
        >
          <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
      <textarea
        id={`editor-${fileId}`}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 
                 border border-gray-200 dark:border-gray-700 rounded-lg resize-none focus:ring-2 
                 focus:ring-blue-500 focus:border-transparent"
        placeholder="Type or paste your Markdown here..."
      />
    </div>
  );
};