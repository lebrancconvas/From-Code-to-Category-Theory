import { getFunctionSignature } from "@/utils/functionSignature";

interface VisualProps {
  code: string;
};

export function Visual({ code }: VisualProps) {
  return (
    <h1>{ getFunctionSignature(code) }</h1>
  )
};
