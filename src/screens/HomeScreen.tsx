import React from "react"
import GraphPresentation from "../components/graphs/GraphPresentation"
import "./HomeScreen.css"
import AppTopBar from "../components/TopBar/TopBar"
import { GraphType } from "../types/Graph/GraphType"
import { getGraphFromJSON } from "../primitives/GraphMethods"

const HomeScreen = () => {
    const graph1 = getGraphFromJSON(require("../constantes/Graph/DefaultGraph1.json") as GraphType)
    const graph2 = getGraphFromJSON(require("../constantes/Graph/DefaultGraph2.json") as GraphType)
    const graph3 = getGraphFromJSON(require("../constantes/Graph/DefaultGraph3.json") as GraphType)
    const graph4 = getGraphFromJSON(require("../constantes/Graph/DefaultGraph4.json") as GraphType)
    const graphs = [graph1, graph2, graph3, graph4]

    return(
        <>
            <AppTopBar />
            <div className="homeScreenContainer">
                <div className="graphPresentationListContainer">
                {
                    graphs.map(graph => <GraphPresentation graph={graph}/>)
                }
                </div>  
            </div>
        </>
    )
}

export default HomeScreen