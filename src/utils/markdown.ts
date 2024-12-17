import { marked } from 'marked';
import hljs from 'highlight.js';

marked.setOptions({
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
  breaks: true,
});

export const convertToHtml = (markdown: string): string => {
  return marked(markdown);
};