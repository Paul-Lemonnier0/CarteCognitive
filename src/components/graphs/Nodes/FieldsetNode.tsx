import { FC, useEffect, useState, useContext} from "react";
import {
  NodeProps,
  NodeResizer,
  useKeyPress
} from "reactflow";
import React from 'react'
import "./FieldsetNodeStyle.css"
import { GraphContext } from "../../../context/GraphContext";
import { AppContext } from "../../../context/AppContext";
import { baseColors } from "../../../constantes/Colors";
import ColorIcon from "../../Other/ColorIcon";
import { getStringRGBAFromHexa, getStringRGBFromHexa } from "../../../primitives/ColorMethods";
import ColorToolBar from "./ColorToolBar";


export type FieldsetNodeData = {
  label: string;
  resizable: boolean;
  rotatable: boolean;
  couleur?: string;
  date: string ;
};

export interface FieldsetNodeProps extends NodeProps {
  data: FieldsetNodeData;
}

export const FieldsetNode: FC<FieldsetNodeProps> = ({ data, selected, id, xPos, yPos}) => {
  
  const {setIsWriting} = useContext(AppContext)

  const {lastSelectedNodeID, selectNodesInPositionRange, updateNodeData} = useContext(GraphContext)
  
  const [isSelectingColor, setIsSelectingColor] = useState(false)

  const [label, setLabel] = useState(data.label ?? "")
  const [selectedColor, setSelectedColor] = useState(data.couleur ?? "white")
  
  const [resizable, setResizable] = useState(true)

  useEffect(() => {
    setLabel(data.label)
  }, [data.label])

  
  useEffect(() => {
    setSelectedColor(data.couleur ?? "white")
  }, [data.couleur])

  useEffect(() => {
    if(selected) setResizable(true)
    else setResizable(false)

  }, [selected])

  const handleStartWriting = () => {
    setIsWriting(true)
  }

  const handleEndWriting = () => {
    if(!data.label || label !== data.label) {
      updateNodeData(id, {...data, label})
    }
    
    setIsWriting(false)
  }

  const handleWritting = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value)
  }

  const chooseColorNode = (color = "white") => {
    if(!data.couleur || color !== data.couleur) {
      updateNodeData(id, {...data, couleur: color})
    }
  }

  const clickColorNode = () => {
    setIsSelectingColor(!isSelectingColor);
  }

  const backgroundColorRGBA = getStringRGBAFromHexa(selectedColor, 0.2)
  const backgroundColorRGB = getStringRGBFromHexa(selectedColor, 0.2)

  const shiftKeyPressed = useKeyPress("Shift")

  const handleHoleNodesSelection = () => {
    if(shiftKeyPressed) {
      const containerHeight = document.getElementById(`fieldsetNodeContainer_${id}`)?.clientHeight;
      const containerWidth = document.getElementById(`fieldsetNodeContainer_${id}`)?.clientWidth;

      if(containerHeight && containerWidth) { 
        selectNodesInPositionRange(
          xPos, 
          xPos + containerWidth, 
          yPos, 
          yPos + containerHeight,
          selectedColor,
        )
      }
    }
  }

  return (
    <>
      <div onClick={handleHoleNodesSelection} className="fieldset-container" id={`fieldsetNodeContainer_${id}`} style={{backgroundColor: backgroundColorRGBA}}>
          <NodeResizer 
            isVisible={resizable} 
            minWidth={150} 
            minHeight={150}
          />

          {
            !selected || shiftKeyPressed ?

            <div className="textLegendFieldsetNodeContainer" style={{backgroundColor: backgroundColorRGB}}>
                <p className="customNodeText">{label === "" ? " " : label}</p>
            </div>

            :    

            <div className="inputLegendFieldsetNodeContainer" style={{backgroundColor: backgroundColorRGB}}>
              <input 
                className="inputLegendFieldsetNode" 
                onChange={handleWritting}
                disabled={!selected} 
                onFocus={handleStartWriting}
                onBlur={handleEndWriting}
                type="text" 
                value={label}
              />
            </div>
          }

          {
            <div className={`customFieldToolbar ${lastSelectedNodeID === id ? '' : 'customNodeToolbarHidden'}`}>
              <div className="customFieldIconContainer">
                <ColorIcon small isSelected color={selectedColor ?? "white"} onPress={clickColorNode}/>
              </div>

              <ColorToolBar 
                onColorPressed={(color: string) => chooseColorNode(color)} 
                isVisible={isSelectingColor}
                selectedColor={selectedColor}
                bottom
              />
            </div>
          }
      </div>
    </>
  );

}