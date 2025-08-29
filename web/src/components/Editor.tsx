import dynamic from "next/dynamic";
import { OnChange } from "@monaco-editor/react";

const CodeEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => <p>Loading the editor...</p>
});

interface EditorProps {
  value: string;
  onChange: OnChange;
};

export function Editor({ value, onChange }: EditorProps) {
  return (
    <div className="editor-container">
      <h2>TypeScript Code Editor</h2>
      <p className="editor-description">
        Write TypeScript functions to see them visualized as category theory morphisms
      </p>
      <CodeEditor
        height="calc(100% - 80px)"
        language="typescript"
        theme="vs-dark"
        value={value}
        onChange={onChange}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: 'on',
          lineNumbers: 'on',
          roundedSelection: false,
          selectOnLineNumbers: true,
          folding: true,
          foldingStrategy: 'indentation',
          showFoldingControls: 'always',
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          parameterHints: {
            enabled: true
          }
        }}
      />
    </div>
  )
};
