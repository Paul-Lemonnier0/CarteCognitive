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
                        backgroundColor: "#ffffff", 
                        border: `1px solid black`,
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        userSelect: "none"
                    }}>
                    <p style={{fontSize: 11}}>...</p>
                </div>

                <p style={{fontSize: 11, marginTop: 5}}>Node</p>
            </div>
        </div>
    )
}

export default SideBar