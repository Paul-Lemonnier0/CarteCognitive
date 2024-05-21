import React, { FC, useContext, useEffect, useRef, useState } from "react"
import { FiEdit3 } from "react-icons/fi";
import CustomSearchBar from "../SearchBar/SearchBar"
import { CustomCard } from "../Card/CustomCard"
import CustomNodeListItem from "../graphs/Nodes/CustomNodeListItem"
import { GraphCalculType, GraphContext } from "../../context/GraphContext"
import { Edge, Node } from "reactflow"
import { BackgroundIcon, IconButton } from "../Buttons/IconButtons"
import { CustomZoneIcon } from "../graphs/Zones/CustomZoneIcon"
import { CustomNodeIcon } from "../graphs/Nodes/CustomNodeIcon"
import { CustomEdgeIcon } from "../graphs/Edges/CustomEdgeIcon"
import { BiColorFill } from "react-icons/bi"
import { RxText } from "react-icons/rx";
import IconTextInput from "../TextInput/IconTextInput"
import { CustomNodeData } from "../graphs/Nodes/CustomNode"
import { baseColors } from "../../constantes/Colors"
import "./EditSideBarStyle.css"
import "./SubSideBarStyle.css"

import { NormalText, TitleText } from "../Text/CustomText";

interface EditSideBarProps {
    isExpanded: boolean
}

const EditSideBar: FC<EditSideBarProps> = ({ isExpanded }) => {
    const {
        graphTitle, setGraphTitle,
        nodes, setIsGraphModified,
        edges, setEdges,
        setFitViewNodes,
        setSelectedNodesIDs,
        lastSelectedNodeID, setLastSelectedNodeID,
        updateNodeData,
        lastSelectedEdgeID,
        graphCalculType
    } = useContext(GraphContext)


    const [filteredNodes, setFilteredNodes] = useState<Node[]>([])
    const [searchValue, setSearchValue] = useState<string>("")

    const [titleIsModif, setTitleIsModif] = useState(false)


    const [selectedNode, setSelectedNode] = useState<Node | undefined>(lastSelectedNodeID ? nodes.filter(node => node.id === lastSelectedNodeID)[0] : undefined)
    const [selectedNodeData, setSelectedNodeData] = useState<CustomNodeData>(selectedNode ? (selectedNode.data ?? {}) : {})

    const [selectedEdge, setSelectedEdge] = useState<Edge | undefined>(lastSelectedEdgeID ? edges.filter(edge => edge.id === lastSelectedEdgeID)[0] : undefined)
    const [selectedEdgeLabel, setSelectedEdgeLabel] = useState(selectedEdge ? selectedEdge.label : "")


    useEffect(() => {
        if (lastSelectedNodeID) {
            const selectedNode = nodes.filter(node => node.id === lastSelectedNodeID)[0]
            setSelectedNode(selectedNode)
            setSelectedNodeData(selectedNode ? (selectedNode.data ?? {}) : {})
        }

        else {
            setSelectedNode(undefined)
            setSelectedNodeData({ label: "" })
        }
    }, [lastSelectedNodeID, nodes])

    useEffect(() => {
        if (lastSelectedEdgeID) {
            const selectedEdge = edges.filter(edge => edge.id === lastSelectedEdgeID)[0]
            setSelectedEdge(selectedEdge)
            setSelectedEdgeLabel(selectedEdge ? selectedEdge.data.label : "")
        }

        else {
            setSelectedEdge(undefined)
            setSelectedEdgeLabel("")
        }
    }, [lastSelectedEdgeID, edges])

    useEffect(() => {
        setFilteredNodes(nodes.filter(node => {
            if ("data" in node && "label" in node.data) {
                return (node.data.label as string).toLowerCase().includes(searchValue.toLowerCase())
            }

            return false
        }))

    }, [nodes, searchValue])


    const handlePressOnNode = (nodeID: string) => {
        setSelectedNodesIDs([nodeID])
        setLastSelectedNodeID(nodeID)
    }

    const handleDoublePressOnNode = () => {
        if (selectedNode) {
            setFitViewNodes([selectedNode])
        }
    }


    const isSommetSelected = selectedNode && selectedNode.type && selectedNode.type === "customNode"

    const selectedNodeTypeString = isSommetSelected ?
        "Sommet" : "Zone"

    const handleWrittingNode = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedNodeData((prevData) => ({ ...prevData, label: e.target.value ?? "" }))
        
    }
    const handleWrittingEdge = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedEdgeLabel(e.target.value)
        
    }

    const handleUpdateNodeLabel = () => {
        if (selectedNode) {
            if (!selectedNode.data) {
                updateNodeData(selectedNode.id, { ...selectedNodeData })
                

            }

            else {
                if (selectedNode.data.label) {
                    if (selectedNode.data.label !== selectedNodeData.label) {
                        updateNodeData(selectedNode.id, { ...selectedNodeData })
                       

                    }
                }

                else {
                    updateNodeData(selectedNode.id, { ...selectedNodeData })
                   
                }
            }
        }
    }
    const handleUpdateEdgeLabel = () => {
        setEdges((prevEdges) => prevEdges.map(edge =>
            edge.id === selectedEdge?.id ?
                { ...edge, data: { label: selectedEdgeLabel } as any } : edge
        ))
        
    }

    const handleUpdateColor = (color: string) => {
        if (selectedNode) {
            if (!selectedNode.data) {
                updateNodeData(selectedNode.id, { ...selectedNodeData, couleur: color })
               

            }

            else {
                if (selectedNode.data.couleur) {
                    if (selectedNode.data.couleur !== color) {
                        updateNodeData(selectedNode.id, { ...selectedNodeData, couleur: color })
                       

                    }
                }

                else updateNodeData(selectedNode.id, { ...selectedNodeData, couleur: color })
               

            }
        }
    }

    const baseColorsReduit = [baseColors[0], baseColors[1], baseColors[2], baseColors[3]]

    const handleEditTitle = () => {
        setTitleIsModif(!titleIsModif)
    }

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGraphTitle(e.target.value);
        setIsGraphModified(true);
    }

    const nodeProprietaire = "Paul"
    const nodeDate = selectedNodeData.date ?? "Non Definis"

    const handleSelectMenuChange = (e: React.ChangeEvent<HTMLSelectElement>) => {        
        setSelectedEdgeLabel(e.target.value)
    }

    
    useEffect(() => {
        setEdges((prevEdges) => prevEdges.map(edge =>
            edge.id === selectedEdge?.id ?
                { ...edge, data: { label: selectedEdgeLabel } as any } : edge
        ))
    }, [selectedEdgeLabel]) 

    if (!isExpanded) return null

    return (
        <div className={`subSideBarContainer`}>
            <div id="header">
                {
                    titleIsModif ?
                        <input autoFocus type="text" className="subSideBarContainerTitleInput titleText" value={graphTitle} onChange={onTitleChange}></input>
                        : <TitleText text={graphTitle} flex />
                }

                <div>
                    <IconButton isSelected={titleIsModif} Icon={FiEdit3} onPress={handleEditTitle} />
                </div>
            </div>

            <div id="body">
                <div id="searchNodeContainer">
                    <div id="selectedOptionsItem">
                        <div style={{ display: "inline", flex: 1 }}>
                            <CustomSearchBar
                                iconHover
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                                placeholder="Chercher un noeud..." />
                        </div>
                    </div>

                    <CustomCard>
                        <div id="searchListContainer" style={{ marginLeft: 0 }}>
                            {
                                filteredNodes.map((node, index) => (
                                    <CustomNodeListItem key={index}
                                        isVisible
                                        node={node}
                                        onPress={() => handlePressOnNode(node.id)}
                                        onDoublePress={handleDoublePressOnNode}
                                        isSelected={lastSelectedNodeID === node.id} />
                                ))
                            }
                        </div>
                    </CustomCard>
                </div>

                {
                    selectedNodeData && selectedNode &&
                    <div id="selectedOptions">
                        <div id="selectedOptionsItem" style={{ marginLeft: 2.5 }}>
                            {
                                isSommetSelected ?
                                    <CustomNodeIcon size={25}/> :
                                    <CustomZoneIcon size={25}/>
                            }

                            <div className="TitleAndSubtitleContainer">
                                <TitleText text={selectedNodeData.label === "" ? "" : selectedNodeData.label} />
                                <NormalText text={selectedNodeTypeString + "-" + nodeProprietaire + "-" + nodeDate} />
                            </div>
                        </div>


                        <div id="selectedOptionsItem">
                            <div style={{ display: "inline", flex: 1 }}>
                                <IconTextInput
                                    iconHover
                                    Icon={RxText}
                                    textValue={selectedNodeData.label ?? ""}
                                    onChangeCustom={handleWrittingNode}
                                    onBlur={handleUpdateNodeLabel}
                                    placeholder="Nom du sommet..."
                                />
                            </div>
                        </div>

                        <div id="selectedOptionsItem">
                            <div style={{ display: "inline", flex: 1 }}>
                                <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                                    <span style={{ cursor: "pointer" }}>
                                        <BackgroundIcon iconHover isSelected squared Icon={BiColorFill} size={25} color={selectedNodeData.couleur ?? "white"} />
                                    </span>
                                    <div style={{ display: "flex", flexDirection: "row", gap: 9, flex: 1 }}>
                                        {
                                            baseColorsReduit.map(color => (
                                                <span id="colorBlockContainer" key={color} onClick={() => handleUpdateColor(color)}>
                                                    <BackgroundIcon squared size={25} color={color} hiddenIcon Icon={BiColorFill} />
                                                </span>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    selectedEdge && !isSommetSelected &&
                    <div id="selectedOptions">
                        <div id="selectedOptionsItem" style={{ marginLeft: 2.5 }}>
                            <CustomEdgeIcon size={25}/>

                            <div className="TitleAndSubtitleContainer">
                                <TitleText text={selectedEdgeLabel === "" ? "A" : selectedEdgeLabel as string} />
                                <NormalText text={nodeProprietaire} />
                            </div>
                        </div>

                        <div id="selectedOptionsItem">
                            <div style={{ display: "inline", flex: 1 }}>
                                {
                                    (graphCalculType === GraphCalculType.Integer) &&
                                    <IconTextInput
                                        numeric
                                        iconHover
                                        Icon={RxText}
                                        textValue={String(selectedEdgeLabel) ?? ""}
                                        onChangeCustom={handleWrittingEdge}
                                        onBlur={handleUpdateEdgeLabel}
                                        placeholder="Nom de l'arrete ..."
                                    />
                                }
                                {
                                    (graphCalculType === GraphCalculType.Boolean) &&
                                    <CustomCard customPadding>
                                        <select name="edgeBoolVals" id="edgeBoolVals" value={selectedEdgeLabel?.toString()} onChange={handleSelectMenuChange}>
                                            <option value=""></option>
                                            <option value="0">Faux</option>
                                            <option value="1">Vrai</option>
                                        </select>
                                    </CustomCard>
                                }
                                {
                                    (graphCalculType === GraphCalculType.Symbolic) &&
                                    <CustomCard customPadding>
                                    <select name="edgeBoolValsBis" id="edgeBoolVals" value={selectedEdgeLabel?.toString()} onChange={handleSelectMenuChange}>
                                        <option value="" ></option>
                                        <option value="+">+</option>
                                        <option value="-">-</option>
                                        <option value="?">?</option>
                                    </select>
                                    </CustomCard>
                                }
                            </div>
                        </div>

                    
                    </div>
                }
            </div>
        </div>
    )
}

export default EditSideBar

