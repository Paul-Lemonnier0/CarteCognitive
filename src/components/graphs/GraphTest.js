import React, { useCallback, useMemo, useState } from 'react';
import ReactFlow, { Background, MarkerType, addEdge, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { CustomNode } from './Nodes/CustomNode';

const defaultNodes = [
  {
    id: '0',
    type: 'customNode',
    position: { x: 20, y: 20 },
    data: { label: 'A' },
  }
];

const defaultEdges = [];

function createNewNode(nodeID) {
    const node = { 
        id: String(nodeID), 
        position: { x: 50*nodeID, y: nodeID * 100 },
        type: 'customNode', 
        data: { 
            label: String(nodeID) 
        }
    }

    return node
}

export default function GraphTest() {

    const [nodeID, setNodeID] = useState(1)
    const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);

    const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);
 
    const onConnect = useCallback(
      (params) => setEdges((eds) => addEdge(params, eds)),
      [nodeID],
    );

    const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

    const handleKeyDown = (e) => {
        if (e.key === 'n') {
            console.log("hello")
            const node = createNewNode(nodeID)

            setNodes((previousNodes) => (
                [
                    ...previousNodes,
                    node
                ]
            ))

            setNodeID(nodeID + 1)
        }        
    }

    return (
        <div style={{ width: '100vw', height: '100vh' }} 
            tabIndex={0}
            onKeyDown={handleKeyDown}>
            <ReactFlow 
                nodes={nodes} 
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange} 
                nodeTypes={nodeTypes}
                onConnect={onConnect}
            >

                <Background variant='dots' gap={12} size={1}/>
            </ReactFlow>
        </div>
    );
}
