import React, { useState, FC, useContext, useEffect } from "react"
import { nodeStyle } from "../../styles/Graphes/NodeStyle";
import "./SideBarStyle.css"
import { GraphContext } from "../../context/GraphContext";
import { AppContext } from "../../context/AppContext";

interface ColorIconProps {
    onPress: () => void,
    color: string
  }
  const ColorIcon: FC<ColorIconProps> = ({ onPress, color = "white" }) => {
    return (
      <div className="customNodeIconContainer">
        <div
          style={{
            backgroundColor: color,
            borderRadius: 5,
            height: 15,
            aspectRatio: 1,
            border: "1px solid black",
          }}
          onClick={onPress}
        ></div>
      </div>
    );
  };


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

            <div className="sideBarItem">
                <div onDragStart={(event) => onDragStart(event, 'fieldsetNode')} 
                    draggable style={{
                        backgroundColor: "#ffffff", 
                        border: `1px solid black`,
                        width: 40,
                        height: 40,
                        borderRadius: 5,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        userSelect: "none"
                    }}>
                    <div style={{justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                        <p style={{fontSize: 11, margin: 0}}>---</p>
                        <p style={{fontSize: 11, margin: 0}}>---</p>
                    </div>
                </div>

                <p style={{fontSize: 11, marginTop: 5}}>Zone</p>
            </div>

            <div className="sideBarItem" onClick={ChooseColor}>
                <div style={{
                    backgroundColor: colorSibeBar, 
                    border: `1px solid black`,
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    userSelect: "none"
                }} ></div>
                <p style={{fontSize: 11, marginTop: 5}}>Couleur</p>
            </div>

            <div className={`customSibeToolbar ${chooseColor ? '' : 'customSibeToolbarHidden'}`}>
            <ColorIcon color="#FFFFFF" onPress={() => chooseColorNode("#FFFFFF")} />
            <ColorIcon color="#F09EA7" onPress={() => chooseColorNode("#F09EA7")} />
            <ColorIcon color="#F6CA94" onPress={() => chooseColorNode("#F6CA94")} />
            <ColorIcon color="#FAFABE" onPress={() => chooseColorNode("#FAFABE")} />
            <ColorIcon color="#C1EBC0" onPress={() => chooseColorNode("#C1EBC0")} />
            <ColorIcon color="#C7CAFF" onPress={() => chooseColorNode("#C7CAFF")} />
            <ColorIcon color="#CDABEB" onPress={() => chooseColorNode("#CDABEB")} />
            <ColorIcon color="#F6C2F3" onPress={() => chooseColorNode("#F6C2F3")} />
          </div>
        </div>
    )
}

export default SideBar