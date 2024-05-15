import React, { useContext, useEffect, useRef, useState } from "react"
import { FiEdit3 } from "react-icons/fi";
import "./GraphDetailsSideBarStyle.css"
import CustomSearchBar from "../SearchBar/SearchBar"
import { CustomCard } from "../Card/CustomCard"
import CustomNodeListItem from "../graphs/Nodes/CustomNodeListItem"
import { GraphContext } from "../../context/GraphContext"
import { Edge, Node } from "reactflow"
import { BackgroundIcon, GoBackButton, IconButton } from "../Buttons/IconButtons"
import { useNavigate } from "react-router-dom"
import { IoChevronForward } from "react-icons/io5"
import { CustomZoneIcon } from "../graphs/Zones/CustomZoneIcon"
import { CustomNodeIcon } from "../graphs/Nodes/CustomNodeIcon"
import { CustomEdgeIcon } from "../graphs/Edges/CustomEdgeIcon"
import { BiColorFill } from "react-icons/bi"
import { RxText } from "react-icons/rx";
import IconTextInput from "../TextInput/IconTextInput"
import { CustomNodeData } from "../graphs/Nodes/CustomNode"
import { baseColors } from "../../constantes/Colors"
import { setGraphtest } from "../../firebase/FireStore.tsx/FirestoreDB"
import { GraphType } from "../../types/Graph/GraphType";
import { CiCalculator2 } from "react-icons/ci";
import { FaCalculator } from "react-icons/fa6";
import { AppContext } from "../../context/AppContext";

const GraphDetailsSideBar = () => {
    const {
        upgrade, setUpgrade,
        isGraphModified, setIsGraphModified,
        graphTitle, 
        nodes, 
        edges, setEdges,
        setFitViewNodes, 
        id, 
        setSelectedNodesIDs, 
        lastSelectedNodeID, setLastSelectedNodeID, 
        updateNodeData, 
        lastSelectedEdgeID, setLastSelectedEdgeID, 
        setIsCalculating, isCalculating, proprio
    } = useContext(GraphContext)

    const {user, personnalDataUser} = useContext(AppContext)

    const [filteredNodes, setFilteredNodes] = useState<Node[]>([])
    const [searchValue, setSearchValue] = useState<string>("")

    const [editedTitle, setEditedTitle] = useState(graphTitle)

    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    const [titleIsModif, setTitleIsModif] = useState(false)


    const [selectedNode, setSelectedNode] = useState<Node | undefined>(lastSelectedNodeID ? nodes.filter(node => node.id === lastSelectedNodeID)[0] : undefined)
    const [selectedNodeData, setSelectedNodeData] = useState<CustomNodeData>(selectedNode ? (selectedNode.data ?? {}) : {})

    const [selectedEdge, setSelectedEdge] = useState<Edge | undefined>(lastSelectedEdgeID ? edges.filter(edge => edge.id === lastSelectedEdgeID)[0] : undefined)
    const [selectedEdgeLabel, setSelectedEdgeLabel] = useState(selectedEdge ? selectedEdge.label : "")
    
    //FIXME : les dépendances du useEffect ne sont pas bonnes
    //autoSauvegarde
    useEffect(() =>{
        //FIXME : déplacer cette logique : ça doit être plus haut avec une méthode "save"

        if(upgrade){
            let newGraph: GraphType = {
                nodes: nodes,
                edges: edges,
                id: id,
                title: editedTitle,
                upgrade: upgrade,
                proprio : proprio
            }
            setGraphtest(newGraph, personnalDataUser )
            setIsGraphModified(false)

        } 
    }, [upgrade, setUpgrade,isGraphModified,setIsGraphModified,graphTitle, nodes, edges, setFitViewNodes, id, setSelectedNodesIDs, lastSelectedNodeID, setLastSelectedNodeID, updateNodeData, lastSelectedEdgeID, setLastSelectedEdgeID, setEdges])

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

    const navigate = useNavigate()

    const handleGoBack = () => {

        let newGraph: GraphType = {
            nodes: nodes,
            edges: edges,
            id: id,
            title: editedTitle,
            upgrade: upgrade,
            proprio: proprio
        }

        if (isGraphModified) {
            //ouvre une fenêtre demandant si l'utilisateur veut sauvegarder
            const shouldSave = window.confirm("Voulez-vous sauvegarder les modifications");
            if (shouldSave) {

                setGraphtest( newGraph, personnalDataUser)
                console.log("graphe modifiée")
            }
        }
        navigate(-1)
    }

    const handleChangeExpandState = () => {
        setIsExpanded(!isExpanded)
    }

    const isSommetSelected = selectedNode && selectedNode.type && selectedNode.type === "customNode"

    const selectedNodeTypeString = isSommetSelected ?
        "Sommet" : "Zone"

    const handleWrittingNode = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedNodeData((prevData) => ({...prevData, label: e.target.value ?? ""}))
        setIsGraphModified(true)
    }
    const handleWrittingEdge = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedEdgeLabel(e.target.value)
        setIsGraphModified(true)
    }

    const handleUpdateNodeLabel = () => {
        if (selectedNode) {
            if (!selectedNode.data) {
                updateNodeData(selectedNode.id, { ...selectedNodeData })
                setIsGraphModified(true)

            }

            else {
                if (selectedNode.data.label) {
                    if (selectedNode.data.label !== selectedNodeData.label) {
                        updateNodeData(selectedNode.id, { ...selectedNodeData })
                        setIsGraphModified(true)

                    }
                }

                else {
                    updateNodeData(selectedNode.id, { ...selectedNodeData })
                    setIsGraphModified(true)
                }
            }
        }
    }
    const handleUpdateEdgeLabel = () => {
        setEdges((prevEdges) => prevEdges.map(edge => 
            edge.id === selectedEdge?.id ?
                { ...edge, data: {label :selectedEdgeLabel} as any} : edge
        ))
        setIsGraphModified(true)
    }

    const handleUpdateColor = (color: string) => {
        if (selectedNode) {
            if (!selectedNode.data) {
                updateNodeData(selectedNode.id, { ...selectedNodeData, couleur: color })
                setIsGraphModified(true)

            }

            else {
                if (selectedNode.data.couleur) {
                    if (selectedNode.data.couleur !== color) {
                        updateNodeData(selectedNode.id, { ...selectedNodeData, couleur: color })
                        setIsGraphModified(true)

                    }
                }

                else updateNodeData(selectedNode.id, { ...selectedNodeData, couleur: color })
                setIsGraphModified(true)

            }
        }
    }

    const handleClickOnUnExpandedListItem = () => {
        !isExpanded && setIsExpanded(true)
    }

    const baseColorsReduit = [baseColors[0], baseColors[1], baseColors[2], baseColors[3]]

    const [nodeAndField, setNodeAndField] = useState(true)

    const handleEditTitle = () => {
        setTitleIsModif(!titleIsModif)
    }

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTitle(e.target.value); 
        setIsGraphModified(true)
    }

    const handleCalculate = () => {
        setIsCalculating(!isCalculating)
    }

    return (
        <div className={`graphDetailsSideBarContainer ${isExpanded ? "expanded" : ""}`}>
            <div id="header">
                <div>
                    <GoBackButton onPress={handleGoBack} />
                </div>
                {
                    titleIsModif ?
                        <input autoFocus type="text" className="graphDetailsSideBarContainerTitleInput" value={editedTitle} onChange={onTitleChange}></input>
                        : <p className="graphDetailsSideBarContainerTitleText">{editedTitle}</p>
                }

                <div>
                    <IconButton isSelected={titleIsModif} Icon={FiEdit3} onPress={handleEditTitle} />
                </div>
                {isExpanded && <span className="tooltip">Rechercher</span>}

            </div>

            <div id="body">
                <div id="searchNodeContainer">
                    <div id="selectedOptionsItem" onClick={handleClickOnUnExpandedListItem}>
                        <div style={{ display: "inline", flex: 1 }}>
                            <CustomSearchBar
                                iconHover
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                                placeholder="Chercher un noeud..." />
                        </div>
                        {!isExpanded && <span className="tooltip">Rechercher</span>}
                    </div>

                    <CustomCard customPadding={!isExpanded}>
                        <div id="searchListContainer" style={{ marginLeft: isExpanded ? 0 : 10, overflowY: isExpanded ? "initial" : "hidden" }}>
                            {
                                filteredNodes.map((node, index) => (
                                    <CustomNodeListItem key={index}
                                        node={node}
                                        isVisible={isExpanded}
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
                        <div id="selectedOptionsItem" style={{ marginLeft: 2.5 }} onClick={handleClickOnUnExpandedListItem}>
                            {
                                isSommetSelected ?
                                    <CustomNodeIcon size={25} color="#ebedee" /> :
                                    <CustomZoneIcon size={25} color="#ebedee" />
                            }

                            {/* <BackgroundIcon Icon={IoGitMergeOutline} size={25}/> */}
                            <div className="TitleAndSubtitleContainer">
                                <p className="graphDetailsSideBarContainerTitleText" style={{ opacity: selectedNodeData.label ? 1 : 0 }}>{selectedNodeData.label === "" ? "A" : selectedNodeData.label}</p>
                                <p className="graphDetailsSideBarContainerText">{selectedNodeTypeString} - Paul {selectedNodeData.date === "Non Definis" ? undefined : selectedNodeData.date}</p>
                            </div>

                            {!isExpanded && <span className="tooltip">{selectedNodeTypeString}</span>}
                        </div>


                        <div id="selectedOptionsItem" onClick={handleClickOnUnExpandedListItem}>
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

                            {!isExpanded && <span className="tooltip">Label</span>}
                        </div>

                        <div id="selectedOptionsItem" style={{ marginLeft: 2.5, marginBlock: -5, paddingBlock: 5 }} onClick={handleClickOnUnExpandedListItem}>
                            <div style={{ display: "inline", flex: 1 }}>

                                <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                                    <span style={{ cursor: "pointer" }}>
                                        <BackgroundIcon iconHover isSelected squared Icon={BiColorFill} size={25} color={selectedNodeData.couleur ?? "white"} />
                                    </span>
                                    <div style={{display: "flex", flexDirection: "row", gap: 9, flex: 1}}>
                                    {
                                        baseColorsReduit.map(color => (
                                            <span id="colorBlockContainer" key={color} onClick={() => handleUpdateColor(color)}>
                                                <BackgroundIcon squared size={25} color={color} hiddenIcon Icon={BiColorFill}/>
                                            </span>
                                        ))
                                    }
                                    </div>
                                </div>
                            </div>

                            {!isExpanded && <span className="tooltip">Couleur</span>}

                        </div>
                    </div>
                }
                {
                    selectedEdge && !isSommetSelected &&
                    <div id="selectedOptions">
                        <div id="selectedOptionsItem" style={{ marginLeft: 2.5 }} onClick={handleClickOnUnExpandedListItem}>
                            {
                                <CustomEdgeIcon size={25} color="#ebedee"/>
                            }
                            <div className="TitleAndSubtitleContainer">
                                <p className="graphDetailsSideBarContainerTitleText" style={{opacity: selectedEdgeLabel ? 1 : 0}}>{selectedEdgeLabel === "" ? "A" : selectedEdgeLabel as string }</p>
                                <p className="graphDetailsSideBarContainerText"> Nicolas </p>
                            </div>
                        </div>

                        <div id="selectedOptionsItem" onClick={handleClickOnUnExpandedListItem}>
                            <div style={{display: "inline", flex: 1}}>
                                <div style={{display: "flex"}} >
                                    <IconTextInput 
                                        iconHover
                                        Icon={RxText} 
                                        textValue={String(selectedEdgeLabel) ?? ""} 
                                        onChangeCustom={handleWrittingEdge}
                                        onBlur={handleUpdateEdgeLabel}
                                        placeholder="Nom de l'arrete ..."
                                    />
                                </div>                                
                            </div>

                            {!isExpanded && <span className="tooltip">Label</span>}
                        </div>
                    </div>

                }
            </div>


            <div id="footer">
                <li className="graphSideBarRow" onClick={handleCalculate}>
                    <span style={{ marginLeft: -15 }}>
                        <IconButton onPress={handleCalculate}>
                            <FaCalculator/>
                        </IconButton>
                    </span>
                    <div id="title" style={{ marginLeft: 15 }}>
                        Calculer
                    </div>
                </li>
                <li className="graphSideBarRow" onClick={handleChangeExpandState}>
                    <span style={{ marginLeft: -15 }}>
                        <IconButton onPress={handleChangeExpandState}>
                            <IoChevronForward id="developIcon" />
                        </IconButton>
                    </span>
                    <div id="title" style={{ marginLeft: 15 }}>
                        Réduire
                    </div>
                </li>
            </div>
        </div>
    )
}

export default GraphDetailsSideBar