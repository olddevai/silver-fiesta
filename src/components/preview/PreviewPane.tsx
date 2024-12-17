import React from 'react';
import { FileFormat } from '../../types/format';
import { convertContent } from '../../utils/file';

interface PreviewPaneProps {
  content: string;
  format: FileFormat;
}

export const PreviewPane: React.FC<PreviewPaneProps> = ({ content, format }) => {
  const convertedContent = convertContent(content, format);

  return (
    <div className="h-full p-4 bg-white dark:bg-gray-900 border border-gray-200 
                    dark:border-gray-700 rounded-lg overflow-auto">
      {format === 'html' ? (
        <div 
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: convertedContent }}
        />
      ) : (
        <pre className="whitespace-pre-wrap">{convertedContent}</pre>
      )}
    </div>
  );
};