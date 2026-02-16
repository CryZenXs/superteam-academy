'use client';

import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
    code: string;
    language?: string;
    theme?: 'vs-dark' | 'light';
    onChange?: (value: string | undefined) => void;
    readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
    code,
    language = 'rust',
    theme = 'vs-dark',
    onChange,
    readOnly = false,
}) => {
    return (
        <div className="w-full h-full min-h-[400px] border border-white/10 rounded-lg overflow-hidden glass-card">
            <Editor
                height="100%"
                defaultLanguage={language}
                defaultValue={code}
                theme={theme}
                onChange={onChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: readOnly,
                    automaticLayout: true,
                    padding: { top: 16, bottom: 16 },
                }}
            />
        </div>
    );
};
