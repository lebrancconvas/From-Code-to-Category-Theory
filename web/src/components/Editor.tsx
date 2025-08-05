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
    <CodeEditor
      height="100%"
      language="typescript"
      theme="vs-dark"
      value={value}
      onChange={onChange}
      options={{
        fontSize: 16
      }}
    />
  )
};
