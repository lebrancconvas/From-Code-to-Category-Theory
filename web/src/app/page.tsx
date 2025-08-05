'use client';

import { useState, useCallback } from "react";

import { Editor } from "@/components/Editor"
import { Visual } from "@/components/Visual"
import { Footer } from "@/components/Footer"

export default function App() {
  const [code, setCode] = useState<string>("");

  const handleValueChange = useCallback((value: string | undefined) => {
    setCode(value || "");
  }, []);

  return (
    <>
      <div className="panel">
        <section className="visual-section">
          <Visual code={code} />
        </section>
        <section className="editor-section">
          <Editor value={code} onChange={handleValueChange} />
        </section>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  )
};
