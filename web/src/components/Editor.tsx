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

const defaultCode = `// TypeScript Code Examples
// Functions will be visualized as morphisms in category theory

// Function 1: String to Number
function stringLength(str: string): number {
  return str.length;
}

// Function 2: Number to Boolean
function isEven(num: number): boolean {
  return num % 2 === 0;
}

// Function 3: Multiple parameters
function addNumbers(a: number, b: number): number {
  return a + b;
}

// Function 4: Array transformation
function doubleArray(nums: number[]): number[] {
  return nums.map(n => n * 2);
}

// Function 5: Generic function
function identity<T>(value: T): T {
  return value;
}

// Function 6: Complex types
interface User {
  id: number;
  name: string;
  email: string;
}

function getUserName(user: User): string {
  return user.name;
}

// Arrow functions are also supported
const multiply = (a: number, b: number): number => a * b;

const formatMessage = (message: string, prefix: string): string => \`\${prefix}: \${message}\`;

// Try adding your own functions and see the category theory diagram update!
`;

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
        value={value || defaultCode}
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
