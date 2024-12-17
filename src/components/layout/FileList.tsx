import React from 'react';
import { Trash2 } from 'lucide-react';
import { ConversionFile } from '../../types/file';
import { Button } from '../ui/Button';
import { ConversionPanel } from '../ConversionPanel';

interface FileListProps {
  files: ConversionFile[];
  onRemoveFile: (id: string) => void;
  onContentChange: (id: string, content: string) => void;
  onDownload: (id: string, format: string) => void;
}

export const FileList: React.FC<FileListProps> = ({
  files,
  onRemoveFile,
  onContentChange,
  onDownload,
}) => {
  return (
    <div className="space-y-6">
      {files.map((file) => (
        <div key={file.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              {file.name}
            </h2>
            <Button
              variant="ghost"
              icon={Trash2}
              onClick={() => onRemoveFile(file.id)}
              aria-label="Remove file"
            />
          </div>
          <div className="p-4">
            <ConversionPanel
              fileId={file.id}
              initialContent={file.content}
              onContentChange={(content) => onContentChange(file.id, content)}
              onDownload={(format) => onDownload(file.id, format)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};