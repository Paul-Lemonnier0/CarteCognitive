import React from "react"
import { GraphType } from "../types/Graph/GraphType"
import { useLocation } from "react-router-dom";
import AppTopBar, { GraphTopBar } from "../components/TopBar/TopBar";

import "./GraphDetailsScreen.css"
import SideBar from "../components/SideBar/SibeBar";
import { GraphContextProvider } from "../context/GraphContext";
import Graph from "../components/graphs/Graph";
import GraphDetailsSideBar from "../components/SideBar/GraphDetailsSideBar";

const GraphDetailsScreen = () => {
    const location = useLocation();
    const graph = location.state as GraphType;

    if(!graph) return null

    return(
        <>
        <AppTopBar/>
        <GraphTopBar title={graph.title}/>
        <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
            <SideBar/>
            
            <GraphContextProvider defaultNodes={graph.nodes} defaultEdges={graph.edges} graphName={graph.title}>
                <Graph/>    
                <GraphDetailsSideBar/>    
            </GraphContextProvider>
        </div>
        </>
    )
}

export default GraphDetailsScreen