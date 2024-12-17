import React, { useEffect, useRef } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

interface PreviewProps {
  content: string;
  format: 'html' | 'txt';
}

export const Preview: React.FC<PreviewProps> = ({ content, format }) => {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    marked.setOptions({
      highlight: (code, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
      },
      breaks: true,
    });
  }, []);

  const renderContent = () => {
    if (format === 'html') {
      const html = marked(content);
      return (
        <div 
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }
    return <pre className="whitespace-pre-wrap">{content}</pre>;
  };

  return (
    <div
      ref={previewRef}
      className="h-full p-4 bg-white dark:bg-gray-900 border border-gray-200 
                 dark:border-gray-700 rounded-lg overflow-auto"
    >
      {renderContent()}
    </div>
  );
};