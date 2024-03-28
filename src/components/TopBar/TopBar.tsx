import React from "react"
import { nodeStyle } from "../../styles/Graphes/NodeStyle";
import theme from "../../constantes/Colors";

import "./TopBarStyle.css"
const TopBar = () => {
    return(
        <div className="topBar" style={{
            backgroundColor: "#FFFFFF",
            padding: 0,
            paddingTop: 0,
            flexDirection: "column",
        }}>
            <h2>Titre du graphe</h2>
        </div>
    )
}

export default TopBar