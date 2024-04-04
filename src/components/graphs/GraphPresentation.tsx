import React, { FC } from "react"
import "./GraphPresentation.css"
import { Link } from "react-router-dom"
import { GraphType } from "../../types/Graph/GraphType"

interface GraphPresentationProps {
    graph: GraphType
    style?: React.CSSProperties // rend la propriété style facultative
}

const GraphPresentation: FC<GraphPresentationProps> = ({graph, style}) => {
    return(
        
        <Link to={'/graphDetails'} state={{...graph}}>
            <div className="graphPresentationContainer" style={style}>
                <h2 style={{
                    textAlign: "left", 
                    color: "black",
                    fontFamily: "PoppinsBold"}}>{graph.title}</h2>
            </div>
        </Link>
    )
}

export default GraphPresentation