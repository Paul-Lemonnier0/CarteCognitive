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
import { FiEye, FiEyeOff,FiItalic,FiTag } from "react-icons/fi";
import { MdOutlineQuestionMark } from "react-icons/md";
import HelpModal from "../Modal/HelpModal";
import { GraphType } from "../../types/Graph/GraphType";
import { setGraph } from "../../firebase/FireStore.tsx/FirestoreDB";
import { GrUpgrade } from "react-icons/gr";
import { TbFileExport } from "react-icons/tb";
import { getRectOfNodes, getTransformForBounds, useReactFlow } from "reactflow";
import { toPng } from "html-to-image";
import { RxValueNone,RxUpdate,RxFontRoman  } from "react-icons/rx";



const SideBar = () => {
    const {colorNode, setColorNode, setWantSelectColor, wantSelectColor,cyclique,setCyclique,user, personnalDataUser} = useContext(AppContext)
    const {graphCalculType, propagationValue, agregationValue, showEdge, setShowEdge, upgrade, nodes, edges, graphTitle, id, isGraphModified, setIsGraphModified, proprio, setProprio } = useContext(GraphContext)
  
    const { getNodes } = useReactFlow();

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

    const clickCyclique = () => {
        setCyclique(!cyclique)
    }



    const upGradeGraph = () =>{
        let newGraph: GraphType = {
            nodes: nodes,
            edges: edges,
            id: id,
            title: graphTitle,
            upgrade : upgrade,
            proprio : proprio,
            graphCalculType,
            propagation: propagationValue,
            aggregation: agregationValue
        }
        
        setGraph(newGraph, personnalDataUser)
        console.log("sauvegarde effectué")
        setIsGraphModified(false)
    }

    const handleShowHelpModal = () => {
        setIsHelpModalVisible(true)
    }

    const onCloseHelpModal = () => {
        setIsHelpModalVisible(false)
    }

    function downloadImage(dataUrl: string) {
        const a = document.createElement('a');
      
        a.setAttribute('download', 'reactflow.png');
        a.setAttribute('href', dataUrl);
        a.click();
    }

    const imageWidth = 1024;
    const imageHeight = 768;

    const handleDownloadGraph = () => {
        console.log("ok download graph")
        const nodesBounds = getRectOfNodes(getNodes());
        const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);
        const viewport = document.querySelector('.react-flow__viewport')
        if(viewport) {
            console.log("ok viewport")
            toPng(viewport as HTMLElement, {
                backgroundColor: '#e2e2e2',
                width: imageWidth,
                height: imageHeight,
                style: {
                  width: imageWidth.toString(),
                  height: imageHeight.toString(),
                  transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
                },
              }).then(downloadImage);
        }

        else console.log("pas de viewport")
    }

    return(
        <div className="sideBar">
            <div id="body">
                <div id="tooltipContainer">
                    <div className="sideBarItem">
                        <div onDragStart={(event) => onDragStart(event, 'customNode')} draggable>
                            <CustomNodeIcon/>
                        </div>

                        <span className="rightTooltip">Sommet</span>
                    </div>
                </div>

                <div id="tooltipContainer">
                    <div className="sideBarItem">
                        <div onDragStart={(event) => onDragStart(event, 'fieldsetNode')} draggable>
                            <CustomZoneIcon/>
                        </div>

                        <span className="rightTooltip">Zone</span>
                    </div>
                </div>
                <div id="tooltipContainer">
                    <div style={{display: "inline-block", flexDirection: "row"}}>
                        <div className="sideBarItem" onClick={ChooseColor}>
                            <BackgroundIcon 
                                Icon={BiColorFill} 
                                size={25} 
                                color={colorNode}/>
                        <span className="rightTooltip">Couleur</span>
                        </div>

                        <div className={`customSibeToolbar ${chooseColor ? '' : 'customSibeToolbarHidden'}`}>
                            {
                                baseColors.map(baseColor =>
                                    <ColorIcon key={baseColor} isSelected={baseColor === colorNode} color={baseColor} onPress={() => chooseColorNode(baseColor)}/>
                                )
                            }
                        </div>
                    </div>
                </div>

                <div id="tooltipContainer">
                    <div className="sideBarItem" onClick={clickShowEdge}>
                        <BackgroundIcon 
                            Icon={showEdge ? FiEye : FiEyeOff} 
                            size={25}/>
                        <span className="rightTooltip">Etiquettes</span>
                    </div>
                </div>

                <div id="tooltipContainer">
                    <div className="sideBarItem" onClick={clickCyclique}>
                        <BackgroundIcon 
                            Icon={cyclique ? RxUpdate : RxValueNone} 
                            size={25}/>
                        <span className="rightTooltip">Cyclique</span>
                    </div>
                </div>

                

                
                
            </div>

            <div id="tooltipContainer">
                    <div className="sideBarItem" onClick={upGradeGraph}>
                        <BackgroundIcon 
                            Icon={GrUpgrade} 
                            size={25}/>
                        <span className="rightTooltip">Sauvegarde</span>
                    </div>
            </div>

            <div id="tooltipContainer" style={{marginBottom:10, marginTop:10}}>
                    <div className="sideBarItem" onClick={handleDownloadGraph}>
                        <BackgroundIcon 
                            Icon={TbFileExport} 
                            size={25}/>
                    </div>
                    <span className="rightTooltip">Exporter</span>
            </div>


            <div id="footer">
                <div className="sideBarItem" onClick={handleShowHelpModal}>
                    <span style={{marginBottom: 15}}>
                        <BackgroundIcon 
                            Icon={MdOutlineQuestionMark} 
                            size={25} />
                    </span>
                    
                </div>
                <span className="rightTooltip">Aide</span>

            </div>

            {isHelpModalVisible && <HelpModal onClose={onCloseHelpModal}/>}
        </div>
    )
}

export default SideBar