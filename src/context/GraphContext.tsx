import { Dispatch, ReactNode, createContext, useMemo, useState } from "react";
import { Edge, EdgeProps, Node, NodeProps, OnEdgesChange, OnNodesChange, useEdgesState, useNodesState } from "reactflow";
import React from "react";
import { CustomNode, CustomNodeData } from "../components/graphs/Nodes/CustomNode";
import FloatingEdge from "../components/graphs/Edges/FloatingEdge";
import { PositionType } from "./AppContext";
import { createNewNodeObject } from "../primitives/NodesMethods";
import { FieldsetNode } from "../components/graphs/Nodes/FieldsetNode";

interface GraphContextType {
    id: string,
    graphTitle: string,
    setGraphTitle: Dispatch<string>,
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
    addNode: (label: string, position: PositionType, type?: string) => void,
    deleteSelectedNodes: () => void,
    updateNodeData: (nodeID: string, newNodeData: CustomNodeData) => void,
    selectedNodesIDs: string[],
    setSelectedNodesIDs: Dispatch<React.SetStateAction<string[]>>,
    lastSelectedNodeID: string | null,
    setLastSelectedNodeID: Dispatch<React.SetStateAction<string | null>>,
    selectNodesInPositionRange: (x_left: number, x_right: number, y_top: number ,y_bottom: number, color : string | undefined) => void,
    nodeColorField: string[],
    setNodeColorField: Dispatch<React.SetStateAction<string[]>>,
    changeColorWithField: boolean,
    setChangeColorWithField: Dispatch<React.SetStateAction<boolean>>,
    colorField: string,
    setColorField :  Dispatch<React.SetStateAction<string>>,
    fitViewNodes: Node[],
    setFitViewNodes: Dispatch<Node[]>,
    showEdge: boolean,
    setShowEdge:  Dispatch<React.SetStateAction<boolean>>,
}

const GraphContext = createContext<GraphContextType>({
    id: "",
    graphTitle: "",
    setGraphTitle: () => {},
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
    selectNodesInPositionRange: () => {},
    nodeColorField: [],
    setNodeColorField: () => {},
    changeColorWithField: false,
    setChangeColorWithField: () => {},
    colorField: "",
    setColorField: () => {},
    fitViewNodes: [],
    setFitViewNodes: () => {},
    showEdge: true,
    setShowEdge: () => {},
})

interface GraphContextProviderType {
    defaultNodes: Node[],
    defaultEdges: Edge[],
    graphName: string,
    id: string,
    children: ReactNode
}

const GraphContextProvider = ({defaultNodes, defaultEdges, graphName, id, children}: GraphContextProviderType) => {
    const [graphTitle, setGraphTitle] = useState<string>(graphName)
    const [nodeColorField, setNodeColorField] = useState<string[]>([])
    const [changeColorWithField, setChangeColorWithField] = useState(false)
    const [showEdge,setShowEdge] = useState(true)

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`


    const [fitViewNodes, setFitViewNodes] = useState<Node[]>([])

    const nodeTypes = useMemo(() => ({customNode: CustomNode, fieldsetNode: FieldsetNode}), []);
    const edgeTypes = useMemo(() => ({floating: FloatingEdge}), []);


    const defaultNodes_zIndexed = defaultNodes.map(node => {
        if(node.type === "customNode")
            return {...node, zIndex: 1}

        return {...node, zIndex: -2}
    })

    const [nodeID, setNodeID] = useState(0)
    const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(defaultNodes_zIndexed)
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(defaultEdges)

    const [selectedNodesIDs, setSelectedNodesIDs] = useState<string[]>([])
    const [lastSelectedNodeID, setLastSelectedNodeID] = useState<string | null>(null)

    const [colorField, setColorField] = useState("white")

    const addNode = (label: string, position: PositionType, type = "customNode") => {
        const node = createNewNodeObject(nodeID, label, position, type,date)

        setNodes((previousNodes) => {
            setNodeID(nodeID + 1);
            return [...previousNodes, node];
        });
    }

    const deleteSelectedNodes = () => {
        const updateEdgesFirst = edges.filter(edge => !edge.selected)
        const selectedNodeIDs = nodes.filter(node => node.selected).map(node => node.id)
        const updatedNodes = nodes.filter(node => !node.selected)
        const updatedEdgesSecond = updateEdgesFirst.filter(edge => 
                !selectedNodeIDs.includes(edge.source) && 
                !selectedNodeIDs.includes(edge.target))

        setNodes(updatedNodes)
        setEdges(updatedEdgesSecond)
    }   

    const updateNodeData = (nodeID: string, newNodeData: CustomNodeData) => {
        setNodes((prevNodes) => prevNodes.map(node => 
            node.id === nodeID ?
                { ...node, data: newNodeData as any} : node
        ))
    }


    const selectNodesInPositionRange = (x_left: number, x_right: number, y_top: number ,y_bottom: number, color = "white"): void => {
        const selected_nodes_id: string[] = []
        setColorField(color)
        setNodeColorField([])
        console.log(nodeColorField)
        setNodes((prevNodes) => prevNodes.map(node => {
            if(node.type === "customNode") {
                if(node.position.x >= x_left && node.position.x <= x_right) {
                    if(node.position.y >= y_top && node.position.y <= y_bottom) {
                        selected_nodes_id.push(node.id)
                        const temp = nodeColorField
                        temp.push(node.id)
                        setNodeColorField(temp)
                        return {...node, selected: true}
                    }
                }
            }
            
            return node
        }))
        setChangeColorWithField(!changeColorWithField)
        setSelectedNodesIDs([...selected_nodes_id])
    }

    return(
        <GraphContext.Provider value={{
            id,
            graphTitle, setGraphTitle,
            fitViewNodes, setFitViewNodes,
            nodeID, setNodeID,
            selectedNodesIDs, setSelectedNodesIDs,
            lastSelectedNodeID, setLastSelectedNodeID,
            nodes, setNodes, onNodesChange,
            edges, setEdges, onEdgesChange,
            nodeTypes, edgeTypes,
            addNode, deleteSelectedNodes, updateNodeData,
            selectNodesInPositionRange,
            nodeColorField, setNodeColorField, changeColorWithField, setChangeColorWithField, colorField, setColorField,
            showEdge, setShowEdge,
        }}>
            {children}
        </GraphContext.Provider>
    )
}

export {GraphContext, GraphContextProvider}