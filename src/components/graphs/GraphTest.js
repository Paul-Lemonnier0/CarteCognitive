import React, { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
 
import 'reactflow/dist/style.css';
 
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
 



export default function GraphTest() {
  const [nodeID, setNodeID] = useState(3);

  //..

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [nodeID],
  );

  

  function createNewNodeKeyEvent(event) {
    if (event.key === 'n') {
        const node = { id: String(nodeID), position: { x: 0, y: nodeID * 100 }, data: { label: String(nodeID) }}
        
        console.log("new")


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
    <div style={{ width: '100vw', height: '100vh' }} tabIndex={0} onKeyDown={createNewNodeKeyEvent}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
       {/* <MiniMap />         */}
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}