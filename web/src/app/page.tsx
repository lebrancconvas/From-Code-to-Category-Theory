import { Editor } from "@/components/Editor"
import { Visual } from "@/components/Visual"
import { Footer } from "@/components/Footer"

export default function App() {
  return (
    <>
      <div className="panel">
        <section className="visual-section">
          <Visual />
        </section>
        <section className="editor-section">
          <Editor />
        </section>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  )
};
