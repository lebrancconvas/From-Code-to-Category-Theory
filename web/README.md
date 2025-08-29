# Code to Category Theory Visualizer

A web application that converts TypeScript code into category theory diagrams, showing types as objects and functions as morphisms.

## Features

- **Monaco Editor**: Full-featured TypeScript code editor on the right side
- **ReactFlow Diagram**: Interactive category theory visualization on the left side
- **Real-time Parsing**: Automatically extracts function signatures and types from TypeScript code
- **Category Theory Mapping**: 
  - Types are represented as nodes (objects)
  - Functions are represented as edges (morphisms)
  - Source types (domain) are shown on the left
  - Return types (codomain) are shown on the right

## How It Works

1. **Type Extraction**: The application parses TypeScript code using the TypeScript compiler API
2. **Function Analysis**: Extracts function names, parameter types, and return types
3. **Visualization**: Creates a ReactFlow diagram where:
   - Each unique type becomes a node
   - Each function becomes an edge connecting source types to return types
   - Nodes are color-coded (red border for source types, blue border for return types)
   - Edges are labeled with function names

## Supported Code Patterns

- Function declarations
- Arrow functions
- Function expressions
- Multiple parameters
- Generic types
- Interface types
- Array types
- Union types

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm

### Installation

```bash
cd web
pnpm install
```

### Development

```bash
pnpm run dev --port 7100
```

The application will be available at `http://localhost:7100`

### Build

```bash
pnpm run build
pnpm start
```

## Example Code

Try this TypeScript code in the editor:

```typescript
function stringLength(str: string): number {
  return str.length;
}

function isEven(num: number): boolean {
  return num % 2 === 0;
}

function addNumbers(a: number, b: number): number {
  return a + b;
}
```

This will create a diagram with:
- Nodes: `string`, `number`, `boolean`
- Edges: `stringLength`, `isEven`, `addNumbers`

## Technical Details

- **Frontend**: Next.js 15 with React 19
- **Editor**: Monaco Editor (VS Code's editor)
- **Diagram**: ReactFlow for interactive node-based diagrams
- **Parsing**: TypeScript compiler API for accurate type extraction
- **Styling**: CSS Grid layout with responsive design

## Architecture

The application follows a simple architecture:

1. **Editor Component**: Monaco Editor for code input
2. **Visual Component**: ReactFlow diagram for visualization
3. **Utility Functions**: TypeScript parsing and function signature extraction
4. **State Management**: React hooks for managing code and diagram state

## Contributing

Feel free to contribute by:
- Adding support for more TypeScript constructs
- Improving the diagram layout algorithms
- Enhancing the visual styling
- Adding more category theory concepts

## License

This project is open source and available under the MIT License.
