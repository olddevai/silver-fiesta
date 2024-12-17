import React, { useState, useEffect } from 'react';
import { Editor } from './Editor';
import { Preview } from './Preview';
import { FileFormat } from '../types';
import { Download, Copy } from 'lucide-react';

interface ConversionPanelProps {
  fileId: string;
  initialContent: string;
  onContentChange: (content: string) => void;
  onDownload: (format: FileFormat) => void;
}

export const ConversionPanel: React.FC<ConversionPanelProps> = ({
  fileId,
  initialContent,
  onContentChange,
  onDownload,
}) => {
  const [content, setContent] = useState(initialContent);
  const [format, setFormat] = useState<FileFormat>('html');

  useEffect(() => {
    const savedContent = localStorage.getItem(`content-${fileId}`);
    if (savedContent) {
      setContent(savedContent);
    }
  }, [fileId]);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    onContentChange(newContent);
    localStorage.setItem(`content-${fileId}`, newContent);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
      <div className="h-[500px] lg:h-full">
        <Editor
          content={content}
          onChange={handleContentChange}
          fileId={fileId}
        />
      </div>
      <div className="h-[500px] lg:h-full">
        <div className="flex items-center justify-between mb-2">
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as FileFormat)}
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 
                     dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="html">HTML</option>
            <option value="txt">Plain Text</option>
          </select>
          <div className="flex space-x-2">
            <button
              onClick={() => onDownload(format)}
              className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 
                       text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
          </div>
        </div>
        <Preview content={content} format={format} />
      </div>
    </div>
  );
};