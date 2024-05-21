import React from "react"
import { GraphType } from "../types/Graph/GraphType"
import { useLocation } from "react-router-dom";

import "./GraphDetailsScreen.css"
import SideBar from "../components/SideBar/SibeBar";
import { GraphContextProvider } from "../context/GraphContext";
import Graph from "../components/graphs/Graph";
import { GraphTopBar } from "../components/TopBar/TopBar";
import MainSideBar from "../components/SideBar/MainSideBar";

const GraphDetailsScreen = () => {
    const location = useLocation();
    const graph = location.state as GraphType;

    if(!graph) return null

    return(
        <GraphContextProvider id={graph.id} 
            defaultGraphCalculType={graph.graphCalculType}
            defaultAggregation={graph.aggregation}
            defaultPropagation={graph.propagation}
            graphName={graph.title} 
            defaultNodes={graph.nodes} defaultEdges={graph.edges}
            defaultProprio={graph.proprio} autoUpgrade={graph.upgrade} 
        >
            <div style={{display: "flex", flexDirection: "column", flex: 1}}>
                <GraphTopBar title="e"/>
                <div style={{ display: "flex", flexDirection: "row", flex: 1 }}
                    className="graphDetailsContainer">
                        <MainSideBar/>
                        <Graph/>    
                        <SideBar/>
                </div>
            </div>
        </GraphContextProvider>

    )
}

export default GraphDetailsScreen