import { ComponentType, Dispatch, FC, ReactNode, createContext, useMemo, useState } from "react";
import { Edge, EdgeProps, Node, NodeProps, OnEdgesChange, OnNodesChange, useEdgesState, useNodesState } from "reactflow";
import React from "react";
import { CustomNode, CustomNodeData } from "../components/graphs/Nodes/CustomNode";
import FloatingEdge from "../components/graphs/Edges/FloatingEdge";
import { PositionType } from "./AppContext";
import { createNewNodeObject } from "../primitives/NodesMethods";

interface GraphContextType {
    nodes: Node[],
    edges: Edge[],
    setNodes: Dispatch<React.SetStateAction<Node[]>>,
    setEdges: Dispatch<React.SetStateAction<Edge[]>>,
    onNodesChange: OnNodesChange,
    onEdgesChange: OnEdgesChange,
    nodeID: number,
    setNodeID: Dispatch<React.SetStateAction<number>>,
    nodeTypes: Record<string, React.ComponentType<NodeProps>>,
    edgeTypes: Record<string, React.ComponentType<EdgeProps>>
    addNode: (label: string, position: PositionType) => void,
    deleteSelectedNodes: () => void,
    updateNodeData: (nodeID: string, newNodeData: CustomNodeData) => void,
    selectedNodesIDs: string[],
    setSelectedNodesIDs: Dispatch<React.SetStateAction<string[]>>,
    lastSelectedNodeID: string | null,
    setLastSelectedNodeID: Dispatch<React.SetStateAction<string | null>>,
}

const GraphContext = createContext<GraphContextType>({
    nodes: [],
    edges: [],
    nodeID: 0,
    setNodes: () => {},
    setEdges: () => {},
    onNodesChange: () => {},
    onEdgesChange: () => {},
    setNodeID: () => {},
    nodeTypes: {customNode: CustomNode},
    edgeTypes: {floating: FloatingEdge},
    addNode: () => {},
    deleteSelectedNodes: () => {},
    updateNodeData: () => {},
    selectedNodesIDs: [],
    setSelectedNodesIDs: () => {},
    lastSelectedNodeID: null,
    setLastSelectedNodeID: () => {},
})

interface GraphContextProviderType {
    defaultNodes: Node[],
    defaultEdges: Edge[],
    children: ReactNode
}

const GraphContextProvider = ({defaultNodes, defaultEdges, children}: GraphContextProviderType) => {
    
    const nodeTypes = useMemo(() => ({customNode: CustomNode}), []);
    const edgeTypes = useMemo(() => ({floating: FloatingEdge}), []);

    const [nodeID, setNodeID] = useState(0)
    const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(defaultNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(defaultEdges)

    const [selectedNodesIDs, setSelectedNodesIDs] = useState<string[]>([])
    const [lastSelectedNodeID, setLastSelectedNodeID] = useState<string | null>(null)

    const addNode = (label: string, position: PositionType) => {
        const node = createNewNodeObject(nodeID, label, position)

        setNodes((previousNodes) => ([...previousNodes, node]))

        setNodeID(nodeID + 1)
    }
    
    const deleteSelectedNodes = () => {
        const selectedNodeIDs = nodes.filter(node => node.selected).map(node => node.id)
        const updatedNodes = nodes.filter(node => !node.selected)
        const updatedEdges = edges.filter(edge => 
                !selectedNodeIDs.includes(edge.source) && 
                !selectedNodeIDs.includes(edge.target))

        setNodes(updatedNodes)
        setEdges(updatedEdges)
    }   

    const updateNodeData = (nodeID: string, newNodeData: CustomNodeData) => {
        nodes.map(node => node.id === nodeID ? {...node, data: newNodeData} : node)
    }

    return(
        <GraphContext.Provider value={{
            nodeID, setNodeID,
            selectedNodesIDs, setSelectedNodesIDs,
            lastSelectedNodeID, setLastSelectedNodeID,
            nodes, setNodes, onNodesChange,
            edges, setEdges, onEdgesChange,
            nodeTypes, edgeTypes,
            addNode, deleteSelectedNodes, updateNodeData
        }}>
            {children}
        </GraphContext.Provider>
    )
}

export {GraphContext, GraphContextProvider}