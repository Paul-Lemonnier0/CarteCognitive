import React, { useContext, useState } from "react"
import "./GraphDetailsSideBarStyle.css"
import CustomSearchBar from "../SearchBar/SearchBar"
import { CustomCard } from "../Card/CustomCard"
import CustomNodeListItem from "../graphs/Nodes/CustomNodeListItem"
import { GraphContext } from "../../context/GraphContext"
import { Node } from "reactflow"
import { GoBackButton } from "../Buttons/IconButtons"
import { useNavigate } from "react-router-dom"

const GraphDetailsSideBar = () => {

    const {graphTitle, nodes, setFitViewNodes} = useContext(GraphContext)
    const [filteredNodes, setFilteredNodes] = useState<Node[]>(nodes)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setFilteredNodes(nodes.filter(node => {
            if("label" in node.data) {
                return (node.data.label as string).toLowerCase().includes(newValue.toLowerCase())
            } 

            return false
        }))
    }

    const [selectedNodeID, setSelectedNodeID] = useState<string | null>(null)

    const handlePressOnNode = (nodeID: string) => {
        setSelectedNodeID(nodeID)
    }

    const handleDoublePressOnNode = () => {
        const selectedNode = nodes.filter(node => node.id === selectedNodeID)[0]
        setFitViewNodes([selectedNode])
    }

    const navigate = useNavigate()

    return(
        <div className={"graphDetailsSideBarContainer"}>
            <GoBackButton onPress={() => navigate(-1)}/>

            <p className="graphDetailsSideBarContainerTitleText">{graphTitle}</p>

            <CustomSearchBar onChange={onChange}/>
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
                            isSelected={selectedNodeID === node.id}/>
                    ))
                }
                </div>
            </CustomCard>
        </div>
    )
}

export default GraphDetailsSideBar