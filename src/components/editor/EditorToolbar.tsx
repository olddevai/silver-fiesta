import React from 'react';
import { Button } from '../ui/Button';
import { Copy, Download } from 'lucide-react';
import { Select } from '../ui/Select';
import { FileFormat } from '../../types/format';

interface EditorToolbarProps {
  format: FileFormat;
  onFormatChange: (format: FileFormat) => void;
  onCopy: () => void;
  onDownload: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  format,
  onFormatChange,
  onCopy,
  onDownload,
}) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <Select
        value={format}
        onChange={(e) => onFormatChange(e.target.value as FileFormat)}
        options={[
          { value: 'html', label: 'HTML' },
          { value: 'txt', label: 'Plain Text' },
        ]}
      />
      <div className="flex gap-2">
        <Button variant="ghost" icon={Copy} onClick={onCopy}>
          Copy
        </Button>
        <Button icon={Download} onClick={onDownload}>
          Download
        </Button>
      </div>
    </div>
  );
};