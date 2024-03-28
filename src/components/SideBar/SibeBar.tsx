import React from "react"
import { nodeStyle } from "../../styles/Graphes/NodeStyle";
import theme from "../../constantes/Colors";

import "./SideBarStyle.css"

const SideBar = () => {

    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
            event.dataTransfer.setData('application/reactflow', nodeType);
            event.dataTransfer.effectAllowed = 'move';
      };

    const node_style = nodeStyle(false)

    return(
        <div className="card">
            <div onDragStart={(event) => onDragStart(event, 'customNode')} draggable style={node_style}>
                <p>A</p>
            </div>
        </div>
    )
}

export default SideBar