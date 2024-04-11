import React, { useState, useContext, } from "react"
import "./SideBarStyle.css"
import { GraphContext } from "../../context/GraphContext";
import { AppContext } from "../../context/AppContext";
import { CustomZoneIcon } from "../graphs/Zones/CustomZoneIcon";
import { CustomNodeIcon } from "../graphs/Nodes/CustomNodeIcon";
import ColorIcon from "../Other/ColorIcon";
import { baseColors } from "../../constantes/Colors";
import { BackgroundIcon } from "../Buttons/IconButtons";
import { BiColorFill } from "react-icons/bi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdOutlineQuestionMark } from "react-icons/md";
import HelpModal from "../Modal/HelpModal";
import { GraphType } from "../../types/Graph/GraphType";
import { setDocument } from "../../firebase/FireStore.tsx/FirestoreDB";
import { GrUpgrade } from "react-icons/gr";



const SideBar = () => {
    const {colorNode, setColorNode, setWantSelectColor, wantSelectColor } = useContext(AppContext)
    const {showEdge,setShowEdge, nodes, edges, graphTitle, id, isGraphModified, setIsGraphModified} = useContext(GraphContext)
    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
            event.dataTransfer.setData('application/reactflow', nodeType);
            event.dataTransfer.effectAllowed = 'move';
    };
    
    const [chooseColor, setChooseColor] = useState(false)
    const [isHelpModalVisible, setIsHelpModalVisible] = useState<boolean>(false)

    const ChooseColor = () => {
        setWantSelectColor(!wantSelectColor);
        setChooseColor(!chooseColor);
    }


    const chooseColorNode = (color = "#ebedee") => {
        setColorNode(color);
    }

    const clickShowEdge = () => {
        setShowEdge(!showEdge)
    }

    const upGradeGraph = () =>{
        let newGraph: GraphType = {
            nodes: nodes,
            edges: edges,
            id: id,
            title: graphTitle
        }
        setDocument("Default", newGraph, newGraph.id)
        console.log("sauvegarde effectué")
        setIsGraphModified(false)
    }

    const handleShowHelpModal = () => {
        setIsHelpModalVisible(true)
    }

    const onCloseHelpModal = () => {
        setIsHelpModalVisible(false)
    }

    return(
        <div className="sideBar">
             <div className="sideBarItem">
                <div onDragStart={(event) => onDragStart(event, 'customNode')} draggable>
                    <CustomNodeIcon color="#ebedee"/>
                </div>

                <p>Node</p>
            </div>

            <div className="sideBarItem">
                <div onDragStart={(event) => onDragStart(event, 'fieldsetNode')} draggable>
                    <CustomZoneIcon color="#ebedee"/>
                </div>

                <p>Zone</p>
            </div>

            <div style={{display: "inline-block", flexDirection: "row"}}>
                <div className="sideBarItem" onClick={ChooseColor}>
                    <BackgroundIcon 
                        Icon={BiColorFill} 
                        size={25} 
                        color={colorNode}/>
                    <p>Couleur</p>
                </div>

                <div className={`customSibeToolbar ${chooseColor ? '' : 'customSibeToolbarHidden'}`}>
                    {
                        baseColors.map(baseColor =>
                            <ColorIcon key={baseColor} isSelected={baseColor === colorNode} color={baseColor} onPress={() => chooseColorNode(baseColor)}/>
                        )
                    }
                </div>
            </div>

            <div className="sideBarItem" onClick={clickShowEdge}>
                <BackgroundIcon 
                    Icon={showEdge ? FiEye : FiEyeOff} 
                    size={25} 
                    color={colorNode}/>
                <p>Etiquettes</p>
            </div>

            <div className="sideBarItem" onClick={upGradeGraph}>
                <BackgroundIcon 
                    Icon={GrUpgrade} 
                    size={25} 
                    color={colorNode}/>
                <p>Sauvegarde</p>
            </div>

            <div id="footer">
                <div className="sideBarItem" onClick={handleShowHelpModal}>
                    <span style={{marginBottom: 15}}>
                        <BackgroundIcon 
                            Icon={MdOutlineQuestionMark} 
                            size={25} 
                            color={colorNode}/>
                    </span>
                    
                </div>
                <span className="rightTooltip">Aide</span>

            </div>

            {isHelpModalVisible && <HelpModal onClose={onCloseHelpModal}/>}
        </div>
    )
}

export default SideBar