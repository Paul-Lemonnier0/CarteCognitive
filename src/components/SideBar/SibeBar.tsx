import React from "react"
import { nodeStyle } from "../../styles/Graphes/NodeStyle";
import "./SideBarStyle.css"

const SideBar = () => {

    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
            event.dataTransfer.setData('application/reactflow', nodeType);
            event.dataTransfer.effectAllowed = 'move';
      };

    const node_style = nodeStyle(false)

    return(
        <div className="sideBar" style={{
            backgroundColor: "#ebedee",
            padding: 15,
            paddingBottom: 0,
            flexDirection: "column",
        }}>
            <div className="sideBarItem">
                <div onDragStart={(event) => onDragStart(event, 'customNode')} 
                    draggable style={{
                        backgroundColor: "#858585", 
                        strokeWidth: 2,
                        border: "2px solid ${bgColor}",
                        borderWidth: 2,
                        stroke: "green",
                        cursor: "pointer",
                        width: 40,
                        height: 40,
                        borderRadius: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <p style={{fontSize: 11}}>A</p>
                </div>

                <p style={{fontSize: 11, marginTop: 5}}>Node</p>
            </div>
        </div>
    )
}

export default SideBar