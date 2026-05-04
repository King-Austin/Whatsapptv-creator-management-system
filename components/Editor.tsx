'use client';

import React from 'react';

interface EditorProps {
  value: any;
  onChange: (value: any) => void;
  placeholder?: string;
}

const Editor: React.FC<EditorProps> = ({ value, onChange, placeholder }) => {
  return (
    <div className='w-full min-h-[400px] p-4 bg-white border border-slate-200 rounded-xl focus-within:border-primary transition-colors'>
      <textarea
        value={typeof value === 'string' ? value : JSON.stringify(value)}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Start writing your story...'}
        className='w-full h-full min-h-[380px] bg-transparent border-none outline-none resize-none text-slate-700 font-medium leading-relaxed'
      />
    </div>
  );
};

export default Editor;
