import { FC, useEffect, useState, useRef, useContext} from "react";
import {Handle, NodeProps, Position , useUpdateNodeInternals,
  NodeResizer,
  useKeyPress,} from "reactflow";
import React from 'react'
import "./FieldsetNodeStyle.css"
import { GraphContext } from "../../../context/GraphContext";
import { AppContext } from "../../../context/AppContext";
import { baseColors } from "../../../constantes/Colors";
import ColorIcon from "../../Other/ColorIcon";
import { getStringRGBAFromHexa, getStringRGBFromHexa } from "../../../primitives/ColorMethods";


export type FieldsetNodeData = {
  label: string;
  resizable: boolean;
  rotatable: boolean;
  couleur?: string;
};

export interface FieldsetNodeProps extends NodeProps {
  data: FieldsetNodeData;
}

export const FieldsetNode: FC<FieldsetNodeProps> = ({ data, selected, id, xPos, yPos}) => {
  const [resizable, setResizable] = useState(true)
  
  const {setIsWriting} = useContext(AppContext)

  const {lastSelectedNodeID, selectNodesInPositionRange, updateNodeData} = useContext(GraphContext)

  const [fieldsetData, setFieldsetData] = useState<FieldsetNodeData>({...data, couleur: data.couleur ?? "#FFFFFF"})

  const [selectColor, setSelectColor] = useState(false)
  const [colorToolBar, updateColorToolBar] = useState(fieldsetData.couleur)

  const handleStartWriting = () => {
    setIsWriting(true)
  }

  const handleEndWriting = () => {
    setIsWriting(false)
  }

  const handleWritting = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldsetData((prevData) => ({...prevData, label: e.target.value}))
  }

  useEffect(() => {
    if(selected) setResizable(true)
    else setResizable(false)

  }, [selected])

  useEffect(() => {
    updateNodeData(id, fieldsetData)
  }, [fieldsetData])

  const chooseColorNode = (color = "#FFFFFF") => {
    updateColorToolBar(color)
    setFieldsetData((prevData) => ({...prevData, couleur: color}))
  }

  const clickColorNode = () => {
    setSelectColor(!selectColor);
  }

  const backgroundColorRGBA = getStringRGBAFromHexa(fieldsetData.couleur ?? "#FFFFFF", 0.2)
  const backgroundColorRGB = getStringRGBFromHexa(fieldsetData.couleur ?? "#FFFFFF", 0.2)

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
          colorToolBar,
        )
        const temp = selectNodesInPositionRange(
          xPos, 
          xPos + containerWidth, 
          yPos, 
          yPos + containerHeight,
          colorToolBar,
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
              <div style={{padding: 8}}>
                <p className="customNodeText">{fieldsetData.label === "" ? " " : fieldsetData.label}</p>
              </div>
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
                value={fieldsetData.label}
              />
            </div>
          }

          {
            <div className={`customFieldToolbar ${lastSelectedNodeID === id ? '' : 'customNodeToolbarHidden'}`}>
              <div className="customFieldIconContainer">
                <ColorIcon small isSelected color={fieldsetData.couleur ?? "white"} onPress={clickColorNode}/>
              </div>
              
              <div className={`subCustomFieldToolbar ${selectColor ? '' : 'customFieldToolbarHidden'}`}>
                {
                  baseColors.map(baseColor =>
                      <ColorIcon small isSelected={baseColor === fieldsetData.couleur} color={baseColor} onPress={() => chooseColorNode(baseColor)}/>
                  )
                }
              </div>
            </div>
          }
      </div>
    </>
  );

}