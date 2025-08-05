interface VisualProps {
  code: string;
};

export function Visual({ code }: VisualProps) {
  return (
    <h1>{ code }</h1>
  )
};
