import React, { CSSProperties } from "react"
import { GraphType } from "../../types/Graph/GraphType"
import GraphPresentation from "./GraphPresentation"


interface ListGraphInterface {
    graphs : GraphType[],
    title? : string,
    style? : CSSProperties
}

const ListGraph = ({graphs, title, style} : ListGraphInterface) => {
    return (
    <div style={style}
        className="graphPresentationListContainer">
        <h2>{title}</h2>
        <div className="ListGraph">
            {
                graphs.map(graph => (
                    <GraphPresentation graph={graph} style={{
                    }} />
                ))
            }
        </div>

    </div>
    )
}

export default ListGraph