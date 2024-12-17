import React from 'react';

interface EditorPaneProps {
  content: string;
  onChange: (content: string) => void;
  fileId: string;
}

export const EditorPane: React.FC<EditorPaneProps> = ({ content, onChange, fileId }) => {
  return (
    <textarea
      id={`editor-${fileId}`}
      value={content}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-full p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 
                 border border-gray-200 dark:border-gray-700 rounded-lg resize-none focus:ring-2 
                 focus:ring-blue-500 focus:border-transparent"
      placeholder="Type or paste your Markdown here..."
    />
  );
};