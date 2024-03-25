import React, { KeyboardEvent, useCallback, useMemo, useState } from 'react';
import ReactFlow, { Edge, Node, OnConnect, addEdge, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { edgeBase } from '../../styles/Graphes/Edge';
import { CustomNode } from './Nodes/CustomNode';
import CustomEdge from './Edges/CustomEdge';


const defaultNodes: Node[] = [
  {
    id: '0',
    type: 'customNode',
    position: { x: 20, y: 20 },
    data: { label: 'A' },
  },

  {
    id: '1',
    type: 'customNode',
    position: { x: 100, y: 200 },
    data: { label: 'B' },
  }
];

const defaultEdges = [edgeBase({ id: 'e0-1', source: '0', target: '1'})];

function createNewNode(nodeID: number): Node {
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

    const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);
    const edgeTypes = useMemo(() => ({ customStraightEdge: CustomEdge }), []);

    const [nodeID, setNodeID] = useState(2)
    const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);
 

    const onConnect: OnConnect = useCallback((params) => {
        setEdges((eds) => {
            const edge = edgeBase(params as Edge)
            return addEdge(edge, eds)
      })
    }, [nodeID]);


    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'n') {
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
                edgeTypes={edgeTypes}
                onConnect={onConnect}>
            </ReactFlow>
        </div>
    );
}
