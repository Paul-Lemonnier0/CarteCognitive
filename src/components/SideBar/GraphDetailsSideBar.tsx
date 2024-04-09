import React, { useContext, useEffect, useState } from "react"
import { FaPen } from "react-icons/fa6";
import "./GraphDetailsSideBarStyle.css"
import CustomSearchBar from "../SearchBar/SearchBar"
import { CustomCard } from "../Card/CustomCard"
import CustomNodeListItem from "../graphs/Nodes/CustomNodeListItem"
import { GraphContext } from "../../context/GraphContext"
import { Node } from "reactflow"
import { GoBackButton, IconButton } from "../Buttons/IconButtons"
import { useNavigate } from "react-router-dom"
import { GraphType } from "../../types/Graph/GraphType"
import { IoChevronForward } from "react-icons/io5"
import { setDocument } from "../../firebase/FireStore.tsx/FirestoreDB"

const GraphDetailsSideBar = () => {

    const { graphTitle, nodes, edges, id, setFitViewNodes, selectedNodesIDs, setSelectedNodesIDs } = useContext(GraphContext)
    const [filteredNodes, setFilteredNodes] = useState<Node[]>([])
    const [searchValue, setSearchValue] = useState<string>("")

    const [editedTitle, setEditedTitle] = useState(graphTitle)

    const [isExpanded, setIsExpanded] = useState<boolean>(true)

    const [titleIsModif, setTitleIsModif] = useState(false)

    const startGraph: GraphType = {
        nodes: nodes,
        edges: edges,
        id: id,
        title: editedTitle
    }

    useEffect(() => {
        setFilteredNodes(nodes.filter(node => {
            if ("label" in node.data) {
                return (node.data.label as string).toLowerCase().includes(searchValue.toLowerCase())
            }

            return false
        }))

    }, [nodes, searchValue])

    const handlePressOnNode = (nodeID: string) => {
        setSelectedNodesIDs([nodeID])
    }

    const handleDoublePressOnNode = () => {
        const selectedNode = nodes.filter(node => node.id === selectedNodesIDs[0])[0]
        setFitViewNodes([selectedNode])
    }

    const navigate = useNavigate()

    const handleGoBack = () => {

        const newGraph: GraphType = {
            nodes: nodes,
            edges: edges,
            id: id,
            title: editedTitle
        }
        //compare les deux graph en chaine de caractère
        console.log(`${startGraph.edges} \t ${newGraph.edges}`)
        if (JSON.stringify(startGraph) == JSON.stringify(newGraph)) {
            setDocument("Default", newGraph, newGraph.id)
            console.log("graphe modifiée")
        }
        navigate(-1)
    }

    const handleChangeExpandState = () => {
        setIsExpanded(!isExpanded)
    }


    return (
        <div className={`graphDetailsSideBarContainer ${isExpanded ? "expanded" : ""}`}>
            <div id="header">
                <div id="baseButton">
                    <GoBackButton onPress={handleGoBack} />
                </div>
                {!titleIsModif ? (
                    <p className="graphDetailsSideBarContainerTitleText">{editedTitle}</p>
                ) : (
                    <input className="graphDetailsSideBarContainerTitleInput" type="text" value={editedTitle} onChange={(e) => {setEditedTitle(e.target.value)}}></input>
                )
                }
                <div onClick={() => { setTitleIsModif(!titleIsModif) }}>
                    <FaPen />
                </div>
            </div>

            <div id="body">
                <CustomSearchBar searchValue={searchValue} setSearchValue={setSearchValue} isExpanded={isExpanded} />

                <CustomCard customPadding={!isExpanded}>
                    <div id="searchListContainer" style={{ marginLeft: isExpanded ? 0 : 10, overflowY: isExpanded ? "initial" : "hidden" }}>
                        {
                            filteredNodes.map((node, index) => (
                                <CustomNodeListItem key={index}
                                    node={node}
                                    isVisible={isExpanded}
                                    onPress={() => handlePressOnNode(node.id)}
                                    onDoublePress={handleDoublePressOnNode}
                                    isSelected={selectedNodesIDs[0] === node.id} />
                            ))
                        }
                    </div>
                </CustomCard>
            </div>

            <div className={"graphSideBarUtils"}>
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