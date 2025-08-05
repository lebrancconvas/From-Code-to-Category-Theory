import { Editor } from "@/components/Editor"
import { Visual } from "@/components/Visual"

export default function App() {
  return (
    <>
      <section className="A-Side">
        <Visual />
      </section>
      <section className="B-Side">
        <Editor />
      </section>
    </>
  )
};
