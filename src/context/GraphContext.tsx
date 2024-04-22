import { Dispatch, ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Edge, EdgeProps, Node, NodeProps, OnEdgesChange, OnNodesChange, useEdgesState, useNodesState, addEdge, useStore, ReactFlowState } from "reactflow";

import React from "react";
import { CustomNode, CustomNodeData } from "../components/graphs/Nodes/CustomNode";
import FloatingEdge from "../components/graphs/Edges/FloatingEdge";
import { AppContext, PositionType } from "./AppContext";
import { createNewNodeObject } from "../primitives/NodesMethods";
import { FieldsetNode } from "../components/graphs/Nodes/FieldsetNode";
import { AdjMat, AdjMat_addEdge, AdjMat_addNode, AdjMat_breakNodeLinks, AdjMat_deleteMultipleEdges, AdjMat_deleteMultipleNodes, AdjMat_deleteNode, AdjMat_init } from "../primitives/MatriceMethods";
import { GraphType } from "../types/Graph/GraphType";
import { setgraph } from "../firebase/FireStore.tsx/FirestoreDB";
import { createNodesAndEdgesStress } from "../utils/utils";

interface GraphContextType {
    upgrade: boolean
    setUpgrade: Dispatch<React.SetStateAction<boolean>>,
    isGraphModified: boolean,
    setIsGraphModified: Dispatch<React.SetStateAction<boolean>>,
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
    addNode: (label: string, position: PositionType, type?: TypesNode, size?: SizeType) => void,
    addNewEdge: (newEdge: Edge) => void,
    deleteSelectedNodes: () => void,
    updateNodeData: (nodeID: string, newNodeData: CustomNodeData) => void,
    duplicateNode: (nodeID: string) => void,
    deleteNode: (nodeID: string) => void,
    breakLinks: (nodeID: string) => void,
    groupSelectedNodes: () => void,
    selectedNodesIDs: string[],
    setSelectedNodesIDs: Dispatch<React.SetStateAction<string[]>>,
    lastSelectedNodeID: string | null,
    setLastSelectedNodeID: Dispatch<React.SetStateAction<string | null>>,
    selectNodesInPositionRange: (x_left: number, x_right: number, y_top: number, y_bottom: number, color: string | undefined) => void,
    nodeColorField: string[],
    setNodeColorField: Dispatch<React.SetStateAction<string[]>>,
    changeColorWithField: boolean,
    setChangeColorWithField: Dispatch<React.SetStateAction<boolean>>,
    colorField: string,
    setColorField: Dispatch<React.SetStateAction<string>>,
    fitViewNodes: Node[],
    setFitViewNodes: Dispatch<Node[]>,
    showEdge: boolean,
    setShowEdge: Dispatch<React.SetStateAction<boolean>>,
    lastSelectedEdgeID: string | null,
    setLastSelectedEdgeID: Dispatch<React.SetStateAction<string | null>>,
    adjMat: AdjMat,
    getNodeWithID: (nodeID: string) => Node | null,
    isCalculating: boolean,
    setIsCalculating: Dispatch<React.SetStateAction<boolean>>,
    influancePath: InfluancePathType | null,
    setInfluancePath: Dispatch<React.SetStateAction<InfluancePathType | null>>,
    pathEdges: Edge[], 
    setPathEdges: Dispatch<React.SetStateAction<Edge[]>>,
}

const GraphContext = createContext<GraphContextType>({
    upgrade: false,
    setUpgrade: () => { },
    isGraphModified: false,
    setIsGraphModified: () => { },
    id: "",
    graphTitle: "",
    setGraphTitle: () => { },
    nodes: [],
    edges: [],
    nodeID: 0,
    setNodes: () => { },
    setEdges: () => { },
    onNodesChange: () => { },
    onEdgesChange: () => { },
    setNodeID: () => { },
    nodeTypes: { customNode: CustomNode },
    edgeTypes: { floating: FloatingEdge },
    addNode: () => { },
    addNewEdge: () => { },
    deleteSelectedNodes: () => { },
    updateNodeData: () => { },
    duplicateNode: () => { },
    deleteNode: () => { },
    breakLinks: () => { },
    selectedNodesIDs: [],
    setSelectedNodesIDs: () => { },
    lastSelectedNodeID: null,
    setLastSelectedNodeID: () => { },
    selectNodesInPositionRange: () => { },
    nodeColorField: [],
    setNodeColorField: () => { },
    changeColorWithField: false,
    setChangeColorWithField: () => { },
    colorField: "",
    setColorField: () => { },
    fitViewNodes: [],
    setFitViewNodes: () => { },
    showEdge: true,
    setShowEdge: () => { },
    lastSelectedEdgeID: null,
    setLastSelectedEdgeID: () => { },
    groupSelectedNodes: () => { },
    adjMat: {},
    getNodeWithID: () => null,
    isCalculating: false,
    setIsCalculating: () => { },
    influancePath: null,
    setInfluancePath: () => {},
    pathEdges: [],
    setPathEdges: () => {}
})

export interface SizeType {
    w: number,
    h: number
}

export interface InfluancePathType {
    sourceID?: string,
    targetID?: string,
    edges: Edge[]
}

export enum TypesNode {
    customNode = "customNode",
    fieldsetNode = "fieldsetNode"
}

interface GraphContextProviderType {
    autoUpgrade: boolean,
    defaultNodes: Node[],
    defaultEdges: Edge[],
    graphName: string,
    id: string,
    children: ReactNode
}


const GraphContextProvider = ({ autoUpgrade, defaultNodes, defaultEdges, graphName, id, children }: GraphContextProviderType) => {
    
    // const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdgesStress(
    //     15,
    //     30,
    // );
    
    const [isGraphModified, setIsGraphModified] = useState(false)
    const [graphTitle, setGraphTitle] = useState<string>(graphName)
    const [nodeColorField, setNodeColorField] = useState<string[]>([])
    const [changeColorWithField, setChangeColorWithField] = useState<boolean>(false)
    const [showEdge, setShowEdge] = useState<boolean>(true)

    const { cyclique, user } = useContext(AppContext)

    const [adjMat, setAdjMat] = useState<AdjMat>(AdjMat_init(defaultNodes, defaultEdges))

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`


    const [fitViewNodes, setFitViewNodes] = useState<Node[]>([])

    const nodeTypes = useMemo(() => ({ customNode: CustomNode, fieldsetNode: FieldsetNode }), []);
    const edgeTypes = useMemo(() => ({ floating: FloatingEdge }), []);


    const defaultNodes_zIndexed = defaultNodes.map(node => {
        if (node.type === "customNode")
            return { ...node, zIndex: 1 }

        return { ...node, zIndex: -2 }
    })

    const [nodeID, setNodeID] = useState(0)
    const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(defaultNodes_zIndexed)
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(defaultEdges)
    const [upgrade, setUpgrade] = useState(autoUpgrade)

    const [influancePath, setInfluancePath] = useState<InfluancePathType | null>(null)
    const [isCalculating, setIsCalculating] = useState<boolean>(false)

    const [selectedNodesIDs, setSelectedNodesIDs] = useState<string[]>([])
    const [lastSelectedNodeID, setLastSelectedNodeID] = useState<string | null>(null)
    const [lastSelectedEdgeID, setLastSelectedEdgeID] = useState<string | null>(null)

    const [colorField, setColorField] = useState("white")

    const [pathEdges, setPathEdges] = useEdgesState<Edge[]>([])

    const addNode = (label: string, position: PositionType, type?: TypesNode, size?: SizeType) => {
        const node = createNewNodeObject(nodeID, label, position, type ?? TypesNode.customNode, date, size)

        setNodes((previousNodes) => {
            setNodeID(nodeID + 1);
            return [...previousNodes, node];
        });
        setIsGraphModified(true)

        setAdjMat(AdjMat_addNode(adjMat, node))
        setIsGraphModified(true)

    }

    const deleteSelectedNodes = () => {
        //ne fonctionne pas quand je cliquer sur effacer, mais marche quand je clique sur 's'
        setIsGraphModified(true)
        //
        const deletedEdges = edges.filter(edge => edge.selected)
        const updateEdgesFirst = edges.filter(edge => !edge.selected)
        const selectedNodeIDs = nodes.filter(node => node.selected).map(node => node.id)
        const updatedNodes = nodes.filter(node => !node.selected)
        const updatedEdgesSecond = updateEdgesFirst.filter(edge =>
            !selectedNodeIDs.includes(edge.source) &&
            !selectedNodeIDs.includes(edge.target))



        setNodes(updatedNodes)
        setEdges(updatedEdgesSecond)

        const newAdjMat = AdjMat_deleteMultipleNodes(adjMat, selectedNodeIDs)

        setAdjMat(AdjMat_deleteMultipleEdges(newAdjMat, deletedEdges.map(edge => edge.id)))


    }

    const updateNodeData = (nodeID: string, newNodeData: CustomNodeData) => {
        setNodes((prevNodes) => [...prevNodes.map(node =>
            node.id === nodeID ?
                { ...node, data: newNodeData as any } : node
        )])

        setIsGraphModified(true)
    }



    const selectNodesInPositionRange = (x_left: number, x_right: number, y_top: number, y_bottom: number, color = "white"): void => {
        const selected_nodes_id: string[] = []
        setColorField(color)
        setNodeColorField([])

        setNodes((prevNodes) => prevNodes.map(node => {
            if (node.type === "customNode") {
                if (node.position.x >= x_left && node.position.x <= x_right) {
                    if (node.position.y >= y_top && node.position.y <= y_bottom) {
                        selected_nodes_id.push(node.id)

                        const temp = nodeColorField

                        temp.push(node.id)
                        setNodeColorField(temp)
                        return { ...node, selected: true }
                    }
                }
            }

            return node
        }))

        setChangeColorWithField(!changeColorWithField)
        setSelectedNodesIDs([...selected_nodes_id])
        setIsGraphModified(true)

    }

    const duplicateNode = (nodeID: string) => {
        const node = nodes.filter(node => node.id === nodeID)[0];

        if (node) {
            const position = { x: node.position.x + 75, y: node.position.y + 75, };
            if (node) {
                const nodeLabel = ("label" in node.data) ? node.data.label as string : ""
                addNode(nodeLabel, position, node.type as TypesNode)
            }
        }
        setIsGraphModified(true)
    }

    const breakLinks = (nodeID: string) => {
        const updatedEdges = edges.filter(edge =>
            (nodeID !== edge.source) &&
            (nodeID !== edge.target))

        setEdges(updatedEdges)
        setAdjMat(AdjMat_breakNodeLinks(adjMat, nodeID))
        setIsGraphModified(true)

    }


    const deleteNode = (nodeID: string) => {
        const updatedNodes = nodes.filter(node => node.id !== nodeID)
        setNodes(updatedNodes)

        breakLinks(nodeID)
        setAdjMat(AdjMat_deleteNode(adjMat, nodeID))

        setIsGraphModified(true)

    }

    const groupSelectedNodes = () => {
        const selectedNodes = nodes.filter(node => selectedNodesIDs.includes(node.id))

        let x_left = 100000000, x_right = -100000, y_top = 100000000, y_bottom = -100000

        console.log(selectedNodes)

        selectedNodes.forEach((node) => {
            if (node.position.x < x_left) {
                x_left = node.position.x
            }

            if (node.position.x > x_right) {
                x_right = node.position.x
            }

            if (node.position.y < y_top) {
                y_top = node.position.y
            }

            if (node.position.y > y_bottom) {
                y_bottom = node.position.y
            }
        })

        const ZONE_OFFSET = 100

        x_left -= ZONE_OFFSET
        y_top -= ZONE_OFFSET

        x_right += ZONE_OFFSET
        y_bottom += ZONE_OFFSET

        console.log({ x: x_left, y: y_top })
        console.log({ w: x_right - x_left, h: y_bottom - y_top })

        addNode("Nouvelle zone", { x: x_left, y: y_top }, TypesNode.fieldsetNode, { w: x_right - x_left, h: y_bottom - y_top })
        setIsGraphModified(true)

    }

    const getNodeWithID = (nodeID: string): Node | null => {
        const nodesWithID = nodes.filter(node => node.id === nodeID)

        if (nodesWithID.length > 0) {
            return nodesWithID[0]
        }

        return null
    }

    const addNewEdge = (newEdge: Edge) => {
        const isBiDirectionEdge = edges.find((edge) => (edge.source === newEdge.target && edge.target === newEdge.source) || (edge.source === newEdge.source && edge.target === newEdge.target))
        let cycle = false
        let visited = [newEdge.source]
        const nextEdgeToSource = (IDSource: string, IDFind: string) => {
            if (!cycle && !visited.find((elem) => elem === IDSource)) {
                visited = [...visited, IDSource]
                const nextEdges = edges.filter((edge) => edge.source === IDSource)
                nextEdges.forEach((edge) => {
                    if (!cycle) {
                        if (edge.target === IDFind) {
                            cycle = true
                        }
                        else if (!visited.find((edg) => edg == edge.target)) {
                            return nextEdgeToSource(edge.target, IDFind)
                        }
                    }
                })
            }
        }
        if (!cyclique && !isBiDirectionEdge && (newEdge.source !== newEdge.target)) nextEdgeToSource(newEdge.target, newEdge.source)

        if (!isBiDirectionEdge && (cyclique || !cycle) && (newEdge.source !== newEdge.target)) {
            setEdges((prevEdge) => addEdge(newEdge, prevEdge))
            setAdjMat(AdjMat_addEdge(adjMat, newEdge.source, newEdge.target, id))
        }

        setIsGraphModified(true)

    }
        //autoSauvegarde
        useEffect(() =>{
    
            if(upgrade){
                let newGraph: GraphType = {
                    nodes: nodes,
                    edges: edges,
                    id: id,
                    title: graphTitle,
                    upgrade: upgrade
                }
                console.log(graphTitle)
                setgraph(user? user.uid : "", newGraph, newGraph.id)
                setIsGraphModified(false)
    
            } 
        }, [upgrade,graphTitle, nodes, edges, id, lastSelectedNodeID, lastSelectedEdgeID, user])


    return (
        <GraphContext.Provider value={{
            upgrade, setUpgrade,
            isGraphModified, setIsGraphModified,
            id, adjMat,
            graphTitle, setGraphTitle,
            fitViewNodes, setFitViewNodes,
            nodeID, setNodeID,
            selectedNodesIDs, setSelectedNodesIDs,
            lastSelectedNodeID, setLastSelectedNodeID,
            nodes, setNodes, onNodesChange,
            edges, setEdges, onEdgesChange,
            nodeTypes, edgeTypes,
            addNode, deleteSelectedNodes, updateNodeData, duplicateNode, deleteNode, breakLinks,
            addNewEdge,
            selectNodesInPositionRange, groupSelectedNodes,
            nodeColorField, setNodeColorField, changeColorWithField, setChangeColorWithField, colorField, setColorField,
            showEdge, setShowEdge,
            lastSelectedEdgeID, setLastSelectedEdgeID,
            getNodeWithID,
            isCalculating, setIsCalculating,
            influancePath, setInfluancePath,
            pathEdges, setPathEdges,

        }}>
            {children}
        </GraphContext.Provider>
    )
}

export { GraphContext, GraphContextProvider }