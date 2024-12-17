import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { ConversionPanel } from './components/ConversionPanel';
import { convertMarkdown, createDownloadLink, createZipDownload } from './utils/converter';
import { ConversionFile, ConversionResult, FileFormat } from './types';
import { Toaster, toast } from 'react-hot-toast';
import { Trash2 } from 'lucide-react';

function App() {
  const [files, setFiles] = useState<ConversionFile[]>([]);

  useEffect(() => {
    const savedFiles = localStorage.getItem('conversion-files');
    if (savedFiles) {
      setFiles(JSON.parse(savedFiles));
    }
  }, []);

  const handleFilesAdded = async (newFiles: File[]) => {
    const filePromises = newFiles.map(async (file) => {
      const content = await file.text();
      return {
        id: crypto.randomUUID(),
        name: file.name,
        content,
        lastModified: file.lastModified,
      };
    });

    const processedFiles = await Promise.all(filePromises);
    const updatedFiles = [...files, ...processedFiles];
    setFiles(updatedFiles);
    localStorage.setItem('conversion-files', JSON.stringify(updatedFiles));
  };

  const handleContentChange = (fileId: string, newContent: string) => {
    const updatedFiles = files.map((file) =>
      file.id === fileId ? { ...file, content: newContent } : file
    );
    setFiles(updatedFiles);
    localStorage.setItem('conversion-files', JSON.stringify(updatedFiles));
  };

  const handleDownload = (fileId: string, format: FileFormat) => {
    const file = files.find((f) => f.id === fileId);
    if (!file) return;

    const converted = convertMarkdown(file.content, format);
    const extension = format === 'html' ? 'html' : 'txt';
    createDownloadLink(converted, `${file.name}.${extension}`);
    toast.success('File downloaded successfully!');
  };

  const handleDownloadAll = async () => {
    const results: ConversionResult[] = files.map((file) => ({
      id: file.id,
      html: convertMarkdown(file.content, 'html'),
      txt: convertMarkdown(file.content, 'txt'),
      originalName: file.name,
    }));

    await createZipDownload(results);
    toast.success('All files downloaded as ZIP!');
  };

  const handleRemoveFile = (fileId: string) => {
    setFiles(files.filter((f) => f.id !== fileId));
    localStorage.removeItem(`content-${fileId}`);
    toast.success('File removed');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            <FileUpload
              onFilesAdded={handleFilesAdded}
              maxFiles={5}
            />
            
            {files.length > 0 && (
              <div className="flex justify-end">
                <button
                  onClick={handleDownloadAll}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Download All as ZIP
                </button>
              </div>
            )}

            <div className="space-y-6">
              {files.map((file) => (
                <div key={file.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                      {file.name}
                    </h2>
                    <button
                      onClick={() => handleRemoveFile(file.id)}
                      className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                      aria-label="Remove file"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4">
                    <ConversionPanel
                      fileId={file.id}
                      initialContent={file.content}
                      onContentChange={(content) => handleContentChange(file.id, content)}
                      onDownload={(format) => handleDownload(file.id, format)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Toaster position="bottom-right" />
      </div>
    </ThemeProvider>
  );
}

export default App;