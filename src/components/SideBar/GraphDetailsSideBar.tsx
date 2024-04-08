import React, { useContext, useEffect, useState } from "react"
import "./GraphDetailsSideBarStyle.css"
import CustomSearchBar from "../SearchBar/SearchBar"
import { CustomCard } from "../Card/CustomCard"
import CustomNodeListItem from "../graphs/Nodes/CustomNodeListItem"
import { GraphContext } from "../../context/GraphContext"
import { Node } from "reactflow"
import { GoBackButton } from "../Buttons/IconButtons"
import { useNavigate } from "react-router-dom"
import { GraphType } from "../../types/Graph/GraphType"

const GraphDetailsSideBar = () => {

    const {graphTitle, nodes, edges, id, setFitViewNodes, selectedNodesIDs, setSelectedNodesIDs} = useContext(GraphContext)
    const [filteredNodes, setFilteredNodes] = useState<Node[]>([])
    const [searchValue, setSearchValue] = useState<string>("")

    useEffect(() => {
        // if(searchValue !== "") {
            setFilteredNodes(nodes.filter(node => {
                if("label" in node.data) {
                    return (node.data.label as string).toLowerCase().includes(searchValue.toLowerCase())
                } 
    
                return false
            }))
        // }

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
            title: graphTitle
        }

        //firestore
        navigate(-1)
    }

    return(
        <div className={"graphDetailsSideBarContainer"}>
            <GoBackButton onPress={handleGoBack}/>

            <p className="graphDetailsSideBarContainerTitleText">{graphTitle}</p>
            
            <CustomSearchBar searchValue={searchValue} setSearchValue={setSearchValue}/>
            <CustomCard>
                <div style={{
                    flexDirection: "column",
                    gap: 10,
                    // paddingBlock: 10,
                    // marginBlock: -10,
                    height: 200,
                    width: "100%",
                    overflow: "scroll",
                    overflowX: 'hidden'
                }}>
                {
                    filteredNodes.map((node, index) => (
                        <CustomNodeListItem key={index} 
                            node={node} 
                            onPress={() => handlePressOnNode(node.id)}
                            onDoublePress={handleDoublePressOnNode}
                            isSelected={selectedNodesIDs[0] === node.id}/>
                    ))
                }
                </div>
            </CustomCard>
        </div>
    )
}

export default GraphDetailsSideBar