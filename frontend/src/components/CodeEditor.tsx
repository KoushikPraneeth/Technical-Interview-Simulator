
import React from 'react';
import { Card } from '@/components/ui/card';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
  return (
    <Card className="border shadow-sm w-full h-full overflow-hidden">
      <div className="bg-zinc-800 text-zinc-200 p-2 text-xs border-b border-zinc-700">
        code.js
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full p-4 font-mono text-sm bg-zinc-900 text-zinc-100 focus:outline-none resize-none"
        placeholder="// Write your code here..."
        spellCheck="false"
      />
    </Card>
  );
};

export default CodeEditor;
