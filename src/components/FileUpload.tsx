import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFilesAdded: (files: File[]) => void;
  maxFiles?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFilesAdded, maxFiles = 5 }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }
    onFilesAdded(acceptedFiles);
  }, [maxFiles, onFilesAdded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/markdown': ['.md', '.markdown'],
      'text/plain': ['.txt']
    },
    maxFiles
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
          : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'}`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {isDragActive
          ? 'Drop the files here...'
          : 'Drag & drop files here, or click to select files'}
      </p>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
        Supports up to {maxFiles} Markdown files
      </p>
    </div>
  );
};