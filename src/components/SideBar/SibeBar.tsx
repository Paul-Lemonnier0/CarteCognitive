import React, { useState, FC, useContext, useEffect } from "react"
import { nodeStyle } from "../../styles/Graphes/NodeStyle";
import "./SideBarStyle.css"
import { GraphContext } from "../../context/GraphContext";
import { AppContext } from "../../context/AppContext";
import { CustomZoneIcon } from "../graphs/Zones/CustomZoneIcon";
import { CustomNodeIcon } from "../graphs/Nodes/CustomNodeIcon";
import { FillColorSideBarIcon } from "./Icons/FillColorSideBarIcon";
import ColorIcon from "../Other/ColorIcon";
import { baseColors } from "../../constantes/Colors";



const SideBar = () => {
    const {colorNode, setColorNode, setWantSelectColor, wantSelectColor } = useContext(AppContext)
    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
            event.dataTransfer.setData('application/reactflow', nodeType);
            event.dataTransfer.effectAllowed = 'move';
    };
    const [chooseColor, setChooseColor] = useState(false)
    const [colorSibeBar, setColorSibeBar] = useState("white")
    const node_style = nodeStyle(false)

    const ChooseColor = () => {
        setWantSelectColor(!wantSelectColor);
        setChooseColor(!chooseColor);
    }


    const chooseColorNode = (color = "white") => {
        setColorSibeBar(color);
        setColorNode(color);
    }

    return(
        <div className="sideBar" style={{
            backgroundColor: "#ebedee",
            padding: 15,
            paddingBottom: 0,
            flexDirection: "column",
        }}>
             <div className="sideBarItem">
                <div onDragStart={(event) => onDragStart(event, 'customNode')} draggable>
                    <CustomNodeIcon/>
                </div>

                <p>Node</p>
            </div>

            <div className="sideBarItem">
                <div onDragStart={(event) => onDragStart(event, 'fieldsetNode')} draggable>
                    <CustomZoneIcon/>
                </div>

                <p>Zone</p>
            </div>

            <div style={{display: "flex", flexDirection: "row"}}>
                <div className="sideBarItem" onClick={ChooseColor}>
                    <FillColorSideBarIcon color={colorNode}/>
                    <p>Couleur</p>
                </div>

                <div className={`customSibeToolbar ${chooseColor ? '' : 'customSibeToolbarHidden'}`}>
                    {
                        baseColors.map(baseColor =>
                            <ColorIcon isSelected={baseColor === colorNode} color={baseColor} onPress={() => chooseColorNode(baseColor)}/>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default SideBar