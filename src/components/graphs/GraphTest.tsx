import React, { KeyboardEvent, useCallback, useMemo, useState } from 'react';
import ReactFlow, { Background, BackgroundVariant, Edge, Node, OnConnect, addEdge, useEdgesState, useNodesState, useOnSelectionChange } from 'reactflow';
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
                    console.log("selected")
                    return {...node, selected: true}
                }

                return {...node, selected: false}
            })));

            const edgeIDs = edges.map((edge) => edge.id)

            setEdges((previousEdges) => (previousEdges.map((edge) => { 
                if(edgeIDs.includes(edge.id)) {
                    console.log("hello")

                    return {...edge, selected: true}
                }

                return {...edge, selected: false}
            })));
        },
      });

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
                <Background variant={BackgroundVariant.Dots} size={1} gap={20}/>
            </ReactFlow>
        </div>
    );
}
