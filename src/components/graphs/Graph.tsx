import React, { KeyboardEvent, useCallback, useContext, useRef, useState } from 'react';
import ReactFlow, { Background, BackgroundVariant, Edge, Node, OnConnect, ReactFlowInstance, ReactFlowRefType, addEdge, useOnSelectionChange } from 'reactflow';
import 'reactflow/dist/style.css';
import CustomConnectionLine from './Edges/CustomConnectionLine';
import { AppContext, PositionType } from '../../context/AppContext';
import { GraphContext } from '../../context/GraphContext';
import { connectionLineStyle } from '../../styles/Graphes/GraphStyle';
import { defaultEdgeOptions } from '../../styles/Graphes/Edge';

let id = 2;
const getId = () => `${id++}`;

export default function Graph() {
    const {
        nodeID,
        lastSelectedNodeID, setLastSelectedNodeID,
        selectedNodesIDs, setSelectedNodesIDs,
        nodes, setNodes, onNodesChange,
        edges, setEdges, onEdgesChange,
        nodeTypes, edgeTypes,
        addNode, deleteSelectedNodes
    } = useContext(GraphContext)

    //Data

    const nodes_test = nodes

    const {isWriting} = useContext(AppContext)

    const [mousePosition, setMousePosition] = useState<PositionType>({x: 0, y:0})

    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    const reactFlowRef = useRef<ReactFlowRefType>(null)
    const reactFlowWrapper = useRef<ReactFlowRefType>(null);

    //Connection methods

    const onConnect: OnConnect = useCallback((params) => {
        setEdges((eds) => addEdge(params, eds))
    }, [nodeID]);

    //Shortcut

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'n' && !isWriting) {
            addNode("...", mousePosition)
        }   
        
        else if(e.key === 's' && !isWriting) {
            deleteSelectedNodes()
        }
    }

    //Selection methods

    interface onSelectionChangeProps {
        nodes: Node[],
        edges: Edge[]
    }

    useOnSelectionChange({
        onChange: ({ nodes: nds, edges }: onSelectionChangeProps) => {
            const nodeIDs = nds.map((node) => node.id)

            const newSelectedNodeIds = nds.filter(node => node.selected).map(node => node.id)
            
            const lastSelectedNodeArray = newSelectedNodeIds.filter(node => !selectedNodesIDs.includes(node))

            if(lastSelectedNodeID && !newSelectedNodeIds.includes(lastSelectedNodeID)) {
                setLastSelectedNodeID(null)
            }

            if(lastSelectedNodeArray.length > 0) {
                setLastSelectedNodeID(lastSelectedNodeArray[0])
            } 

            else if (newSelectedNodeIds.length === 0) setLastSelectedNodeID(null)

            setSelectedNodesIDs(newSelectedNodeIds)

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
    
    //Drags methods

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();
        
            const type = event.dataTransfer.getData('application/reactflow');
        
            if (typeof type === 'undefined' || !type || !reactFlowInstance) {
                return;
            }
        
            const position = reactFlowInstance?.screenToFlowPosition({x: event.clientX, y: event.clientY});

            addNode("...", position)
        },
        [reactFlowInstance],
    );

    //Mouse movements methods

    const handleMouseMove: React.MouseEventHandler<HTMLDivElement>  = (event) => {
        if(reactFlowRef.current && reactFlowInstance) {
            const rect = reactFlowRef.current.getBoundingClientRect()
            const pos = reactFlowInstance.screenToFlowPosition({ x: event.clientX - rect.x + 50, y: event.clientY - rect.y + 50})
        
            setMousePosition(pos)
        }
    }

    return (
        <div style={{flex: 1}} tabIndex={0} onKeyDown={handleKeyDown} ref={reactFlowWrapper}>
            <ReactFlow 
                ref={reactFlowRef}
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
                onMouseMove={handleMouseMove}
                defaultEdgeOptions={defaultEdgeOptions}
                connectionLineComponent={CustomConnectionLine}
                connectionLineStyle={connectionLineStyle}>
                <Background color='#dfe1e2' variant={BackgroundVariant.Dots} size={2} gap={10}/>
            </ReactFlow>
        </div>
    );
}
