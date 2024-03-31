import React, { KeyboardEvent, useCallback, useMemo, useRef, useState } from 'react';
import ReactFlow, { Background, BackgroundVariant, Edge, MarkerType, Node, OnConnect, ReactFlowInstance, ReactFlowRefType, addEdge, useEdgesState, useNodesState, useOnSelectionChange } from 'reactflow';
import 'reactflow/dist/style.css';
import { edgeBase } from '../../styles/Graphes/Edge';
import { CustomNode } from './Nodes/CustomNode';
import CustomEdge from './Edges/CustomEdge';
import CustomConnectionLine from './Edges/CustomConnectionLine';
import FloatingEdge from './Edges/FloatingEdge';


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


let id = 2;
const getId = () => `${id++}`;

export default function GraphTest() {

    const connectionLineStyle = {
        strokeWidth: 3,
        stroke: 'black',
      };

    const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

    const [nodeID, setNodeID] = useState(2)
    const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);


    const onConnect: OnConnect = useCallback((params) => {
        setEdges((eds) => {
            return addEdge(params, eds)
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
        else if(e.key === 's') {
            const liste = ['']
            nodes.map((currentNode) => {if(currentNode.selected === true) liste.push(currentNode.id);}) //TODO: instaurer un state qui suit en runtime l'evolution des noeuds séléctionnés (voir la doc)
            const previousNodes = nodes.filter((currentNode) => (currentNode.selected !== true)) //Nickel je pense
            const premierFiltreEdges = edges.filter((currentEdge) => (!liste.includes(currentEdge.source) && !liste.includes(currentEdge.target))) // Idem

            const previousEdges = premierFiltreEdges.filter((prevEdge) => (prevEdge.selected !== true))

            setNodes([...previousNodes])
            setEdges([...previousEdges])

        }

    }

    interface onSelectionChangeProps {
        nodes: Node[],
        edges: Edge[]
    }

    useOnSelectionChange({
        onChange: ({ nodes, edges }: onSelectionChangeProps) => {
            const nodeIDs = nodes.map((node) => node.id)

            setNodes((previousNodes) => (previousNodes.map((node) => { 

                if(nodeIDs.includes(node.id)) {
                    return {...node, selected: true}
                }

                return {...node, selected: false}
            })));

            const edgeIDs = edges.map((edge) => edge.id)

            setEdges((previousEdges) => (previousEdges.map((edge) => { 
                if(edgeIDs.includes(edge.id)) {
                    return {...edge, selected: true}
                }

                return {...edge, selected: false}
            })));
        },
      });

    const reactFlowWrapper = useRef<ReactFlowRefType>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    
    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);
    
    const onDrop = useCallback(
        (event: React.DragEvent) => {
        event.preventDefault();
    
        const type = event.dataTransfer.getData('application/reactflow');
    
        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type || !reactFlowInstance) {
            return;
        }
    
        // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
        // and you don't need to subtract the reactFlowBounds.left/top anymore
        // details: https://reactflow.dev/whats-new/2023-11-10
        const position = reactFlowInstance?.screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });

        const newNode = {
            id: getId(),
            type,
            position,
            data: { label: `A` },
        };
    
        setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance],
    );
    

    const onNodeDoubleClick = (event: React.MouseEvent, node: Node) => {
        console.log("double click")
    }

    const edgeTypes = {
        floating: FloatingEdge,
      };

    const defaultEdgeOptions = {
        style: { strokeWidth: 1, stroke: 'black' },
        type: 'floating',
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: 'black',
        },
      };


    return (
        <div style={{ flex:  1 }} 
            tabIndex={0}
            onKeyDown={handleKeyDown}
            ref={reactFlowWrapper}>
            <ReactFlow 
                nodes={nodes} 
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange} 
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodeDoubleClick={onNodeDoubleClick}
                defaultEdgeOptions={defaultEdgeOptions}
                connectionLineComponent={CustomConnectionLine}
                connectionLineStyle={connectionLineStyle}>
                <Background color='#dfe1e2' variant={BackgroundVariant.Dots} size={2} gap={10}/>
            </ReactFlow>
        </div>
    );
}
