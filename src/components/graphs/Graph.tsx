import React, { KeyboardEvent, useCallback, useContext, useEffect, useRef, useState } from 'react';
import ReactFlow, { Background, BackgroundVariant, Controls, Edge, MiniMap, Node, OnConnect, ReactFlowInstance, ReactFlowRefType, addEdge, useOnSelectionChange } from 'reactflow';
import 'reactflow/dist/style.css';
import CustomConnectionLine from './Edges/CustomConnectionLine';
import { AppContext, PositionType } from '../../context/AppContext';
import { GraphContext, TypesNode } from '../../context/GraphContext';
import { connectionLineStyle } from '../../styles/Graphes/GraphStyle';
import { defaultEdgeOptions } from '../../styles/Graphes/Edge';
import { getStringRGBAFromHexa } from '../../primitives/ColorMethods';
import NodeContextMenu from './Nodes/NodeContextMenu';
import SelectorButton, { ToggleButton } from '../Buttons/SelectorButton';
import AdjMatComponent from './AdjMatComponent';

export type MenuType = {
    id: string,
    top: number | boolean,
    left: number | boolean,
    right: number | boolean,
    bottom: number | boolean
}

export default function Graph() {
    const {
        isGraphModified, setIsGraphModified, isCalculating,
        fitViewNodes, adjMat,
        lastSelectedNodeID, setLastSelectedNodeID,
        selectedNodesIDs, setSelectedNodesIDs,
        nodes, setNodes, onNodesChange,
        edges, setEdges, onEdgesChange, addNewEdge,
        nodeTypes, edgeTypes,
        addNode, deleteSelectedNodes, groupSelectedNodes,
        lastSelectedEdgeID, setLastSelectedEdgeID,
        upgrade, setUpgrade,
    } = useContext(GraphContext)

    //Data

    const { isWriting } = useContext(AppContext)

    const [mousePosition, setMousePosition] = useState<PositionType>({ x: 0, y: 0 })

    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    const reactFlowRef = useRef<ReactFlowRefType>(null)
    const reactFlowWrapper = useRef<ReactFlowRefType>(null);

    //Connection methods

    const onConnect: OnConnect = useCallback((params) => {
        const id = "edge_" + params.source + "-" + params.target
        addNewEdge({...params, id} as Edge)
    }, [setEdges]);

    //Shortcut

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'n' && !isWriting) {
            addNode("...", mousePosition)
        }

        else if (e.key === 's' && !isWriting) {
            deleteSelectedNodes()
        }

        else if (e.key === "g" && !isWriting) {
            groupSelectedNodes()
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

            if(isCalculating) {
                
            }

            const newSelectedNodeIds = nds.filter(node => node.selected).map(node => node.id)

            const lastSelectedNodeArray = newSelectedNodeIds.filter(node => !selectedNodesIDs.includes(node))
            const lastSelectEdgeArray = edges.filter((edge) => edge.selected)

            if (lastSelectedNodeID && !newSelectedNodeIds.includes(lastSelectedNodeID)) {
                setLastSelectedNodeID(null)
            }

            if (lastSelectedNodeArray.length > 0) {
                setLastSelectedNodeID(lastSelectedNodeArray[0])
            }
            else setLastSelectedNodeID(null)

            if (lastSelectEdgeArray.length > 0) {
                setLastSelectedEdgeID(lastSelectEdgeArray[0].id)
            }
            else setLastSelectedEdgeID(null)

            setSelectedNodesIDs(newSelectedNodeIds)

            setNodes((previousNodes) => (previousNodes.map((node) => {

                if (nodeIDs.includes(node.id)) {
                    return { ...node, selected: true }
                }

                return { ...node, selected: false }
            })));

            const edgeIDs = edges.map((edge) => edge.id)

            setEdges((previousEdges) => (previousEdges.map((edge) => {
                if (edgeIDs.includes(edge.id)) {
                    return { ...edge, selected: true }
                }

                return { ...edge, selected: false }
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

            const position = reactFlowInstance?.screenToFlowPosition({ x: event.clientX, y: event.clientY });

            addNode("...", position, type as TypesNode)
        }, [reactFlowInstance, addNode]
    );

    //Mouse movements methods

    const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
        if (reactFlowRef.current && reactFlowInstance) {
            const rect = reactFlowRef.current.getBoundingClientRect()
            const pos = reactFlowInstance.screenToFlowPosition({ x: event.clientX - rect.x + 50, y: event.clientY - rect.y + 50 })

            setMousePosition(pos)
        }
    }

    useEffect(() => {
        reactFlowInstance?.fitView({ nodes: fitViewNodes })
    }, [fitViewNodes, reactFlowInstance])

    const [menu, setMenu] = useState<MenuType | null>(null);

    const onNodeContextMenu = useCallback((event: React.MouseEvent, node: Node) => {
        event.preventDefault();

        if (reactFlowRef.current) {
            const pane = reactFlowRef.current.getBoundingClientRect();
            setMenu({
                id: node.id,
                top: event.clientY,
                left: event.clientX,
                right: pane.width - event.clientX,
                bottom: pane.height - event.clientY,
            });
        }
    },
        [setMenu],
    );

    const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

    return (
        <div style={{ flex: 1, flexWrap: 'wrap', display: 'flex', boxSizing: "border-box" }} tabIndex={0} onKeyDown={handleKeyDown} ref={reactFlowWrapper} >
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
                connectionLineStyle={connectionLineStyle}
                onNodeContextMenu={onNodeContextMenu}
                onPaneClick={onPaneClick}>
                <Background color='#dfe1e2' variant={BackgroundVariant.Dots} size={2} gap={10} />
                <MiniMap
                    nodeColor={(node: Node) => {
                        if (!node.data.couleur || node.data.couleur === "#FFFFFF")
                            return "#e2e2e2"
                        if (node.type === "customNode")
                            return node.data.couleur

                        else {
                            const colorRGBA = getStringRGBAFromHexa(node.data.couleur, 0.2)
                            return colorRGBA
                        }
                    }}
                />
                <Controls />
                <AdjMatComponent adjMat={adjMat}/>

            </ReactFlow>

            <SelectorButton style={{
                position: "absolute",
                backgroundColor: upgrade ? "rgba(0,255,0,0.2)" : "rgba(255,0,0,0.2)",
                marginTop: "5px",
                right: 110
            }}
                onClick={() => {setUpgrade(!upgrade)}}
                text='Sauvegarde Auto'
            />
            <ToggleButton
                isActive={upgrade}
                setIsActive={setUpgrade}
                style={{
                    position: "absolute",
                    marginTop: "30px",
                    right: 110

                }}
            />
        </div>
    );
}
