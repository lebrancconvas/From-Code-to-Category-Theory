'use client';

import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  ReactFlowProvider,
} from '@xyflow/react';
import { extractFunctionSignatures } from '@/utils/functionSignature';

interface VisualProps {
  code: string;
}

interface FunctionSignature {
  name: string;
  sourceTypes: string[];
  returnType: string;
}

interface TypeNode extends Node {
  data: {
    label: string;
    type: string;
  };
}

interface FunctionEdge extends Edge {
  data: {
    label: string;
    functionName: string;
  };
}

function VisualFlow({ code }: { code: string }) {
  const [nodes, setNodes, onNodesChange] = useNodesState<TypeNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<FunctionEdge>([]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Generate nodes and edges from function signatures
  useMemo(() => {
    if (!code.trim()) {
      setNodes([]);
      setEdges([]);
      return;
    }

    try {
      const signatures = extractFunctionSignatures(code);
      const typeNodes = new Map<string, TypeNode>();
      const functionEdges: FunctionEdge[] = [];
      let nodeId = 0;
      let edgeId = 0;

      // Create nodes for all types
      signatures.forEach((sig: FunctionSignature) => {
        // Add source type nodes
        sig.sourceTypes.forEach((sourceType) => {
          if (!typeNodes.has(sourceType)) {
            typeNodes.set(sourceType, {
              id: `type-${nodeId++}`,
              type: 'default',
              position: { x: 100, y: 100 + nodeId * 80 },
              data: { label: sourceType, type: sourceType },
              style: {
                background: '#1a192b',
                color: 'white',
                border: '2px solid #ff6b6b',
                borderRadius: '8px',
                padding: '10px',
                minWidth: '120px',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: 'bold',
              },
            });
          }
        });

        // Add return type node
        if (!typeNodes.has(sig.returnType)) {
          typeNodes.set(sig.returnType, {
            id: `type-${nodeId++}`,
            type: 'default',
            position: { x: 400, y: 100 + nodeId * 80 },
            data: { label: sig.returnType, type: sig.returnType },
            style: {
              background: '#1a192b',
              color: 'white',
              border: '2px solid #4ecdc4',
              borderRadius: '8px',
              padding: '10px',
              minWidth: '120px',
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
            },
          });
        }
      });

      // Create edges for functions
      signatures.forEach((sig: FunctionSignature) => {
        sig.sourceTypes.forEach((sourceType) => {
          const sourceNode = typeNodes.get(sourceType);
          const targetNode = typeNodes.get(sig.returnType);
          
          if (sourceNode && targetNode) {
            // Check if this is an identity morphism (same source and target)
            if (sourceType === sig.returnType) {
              // Create a self-loop (identity morphism)
              functionEdges.push({
                id: `edge-${edgeId++}`,
                source: sourceNode.id,
                target: sourceNode.id,
                type: 'smoothstep',
                data: { 
                  label: sig.name,
                  functionName: sig.name 
                },
                style: {
                  stroke: '#ffd93d',
                  strokeWidth: 3,
                },
                labelStyle: {
                  fill: '#ffd93d',
                  fontWeight: 'bold',
                  fontSize: '12px',
                },
                labelBgStyle: {
                  fill: '#1a192b',
                  fillOpacity: 0.8,
                },
                labelBgPadding: [4, 4],
                labelBgBorderRadius: 4,
              });
            } else {
              // Create a regular edge between different types
              functionEdges.push({
                id: `edge-${edgeId++}`,
                source: sourceNode.id,
                target: targetNode.id,
                type: 'smoothstep',
                data: { 
                  label: sig.name,
                  functionName: sig.name 
                },
                style: {
                  stroke: '#ffd93d',
                  strokeWidth: 3,
                },
                labelStyle: {
                  fill: '#ffd93d',
                  fontWeight: 'bold',
                  fontSize: '12px',
                },
                labelBgStyle: {
                  fill: '#1a192b',
                  fillOpacity: 0.8,
                },
                labelBgPadding: [4, 4],
                labelBgBorderRadius: 4,
              });
            }
          }
        });
      });

      // Position nodes in a more organized way
      const nodeArray = Array.from(typeNodes.values());
      const nodesPerColumn = Math.ceil(nodeArray.length / 2);
      
      nodeArray.forEach((node, index) => {
        if (index < nodesPerColumn) {
          // Left column - source types
          node.position = { x: 150, y: 100 + index * 120 };
          node.style = {
            ...node.style,
            border: '2px solid #ff6b6b',
          };
        } else {
          // Right column - return types
          node.position = { x: 550, y: 100 + (index - nodesPerColumn) * 120 };
          node.style = {
            ...node.style,
            border: '2px solid #4ecdc4',
          };
        }
      });

      setNodes(nodeArray);
      setEdges(functionEdges);
    } catch (error) {
      console.error('Error parsing code:', error);
      setNodes([]);
      setEdges([]);
    }
  }, [code, setNodes, setEdges]);

  if (!code.trim()) {
    return (
      <div className="visual-empty">
        <h2>Category Theory Diagram</h2>
        <p>Start typing code in the editor to see the category theory visualization</p>
        <div className="legend">
          <div className="legend-item">
            <div className="legend-node source"></div>
            <span>Source Types (Domain)</span>
          </div>
          <div className="legend-item">
            <div className="legend-node target"></div>
            <span>Return Types (Codomain)</span>
          </div>
          <div className="legend-item">
            <div className="legend-edge"></div>
            <span>Functions (Morphisms)</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="visual-container">
      <h2>Category Theory Diagram</h2>
      <div className="legend">
        <div className="legend-item">
          <div className="legend-node source"></div>
          <span>Source Types (Domain)</span>
        </div>
        <div className="legend-item">
          <div className="legend-node target"></div>
          <span>Return Types (Codomain)</span>
        </div>
        <div className="legend-item">
          <div className="legend-edge"></div>
          <span>Functions (Morphisms)</span>
        </div>
      </div>
      <div className="flow-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.1}
          maxZoom={2}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          attributionPosition="bottom-left"
          proOptions={{ hideAttribution: true }}
        >
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
}

export function Visual({ code }: VisualProps) {
  return (
    <ReactFlowProvider>
      <VisualFlow code={code} />
    </ReactFlowProvider>
  );
}
