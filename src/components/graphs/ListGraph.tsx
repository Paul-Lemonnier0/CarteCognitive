import React from "react"
import { GraphType } from "../../types/Graph/GraphType"
import GraphPresentation from "./GraphPresentation"


interface ListGraphInterface {
    graphs : GraphType[],
    title? : string,
}

const ListGraph = ({graphs, title} : ListGraphInterface) => {
    return (
    <div
        className="graphPresentationListContainer">
        <h2>{title}</h2>
        <div className="ListGraph">
            {
                graphs.map(graph => (
                    <GraphPresentation graph={graph} style={{
                        marginLeft: "10px"
                    }} />
                ))
            }
        </div>

    </div>
    )
}

export default ListGraph