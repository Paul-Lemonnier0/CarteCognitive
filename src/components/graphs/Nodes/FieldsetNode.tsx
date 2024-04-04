import { FC, useEffect, useState, useRef, useContext} from "react";
import {Handle, NodeProps, Position , useUpdateNodeInternals,
  NodeResizer,
  useKeyPress,} from "reactflow";
import React from 'react'
import "./FieldsetNodeStyle.css"
import { FiEdit3 } from "react-icons/fi";
import { GraphContext } from "../../../context/GraphContext";
import { AppContext } from "../../../context/AppContext";


export type FieldsetNodeData = {
  label: string;
  resizable: boolean;
  rotatable: boolean;
  color?: string;
};

export interface FieldsetNodeProps extends NodeProps {
  data: FieldsetNodeData;
}

interface ColorIconProps {
  onPress: () => void,
  color: string
}
const ColorIcon: FC<ColorIconProps> = ({ onPress, color = "black" }) => {
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

export const FieldsetNode: FC<FieldsetNodeProps> = ({ data, selected, id, xPos, yPos}) => {
  const [resizable, setResizable] = useState(true)
  
  const {setIsWriting} = useContext(AppContext)

  const {lastSelectedNodeID, selectNodesInPositionRange} = useContext(GraphContext)

  const [fieldsetData, setFieldsetData] = useState<FieldsetNodeData>({...data, color: data.color ?? "#FFFFFF"})

  const [selectColor, setSelectColor] = useState(false)
  const [colorToolBar, updateColorToolBar] = useState(fieldsetData.color)



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

  const chooseColorNode = (color = "#FFFFFF") => {
    updateColorToolBar(color)
    setFieldsetData((prevData) => ({...prevData, color}))
  }

  const clickColorNode = () => {
    setSelectColor(!selectColor);
  }


  interface RGBtype {
    r: number,
    g: number,
    b: number,
  }

  interface RGBAtype extends RGBtype {
    a: number
  }

  function hexToRgba(hex: string, opacity: number): RGBAtype | null {

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      a: opacity ?? 1
    } : null;
  }

  const backgroundColor = hexToRgba(fieldsetData.color ?? "#FFFFFF", 0.2)
  const backgroundColorRGBA = backgroundColor ? "rgba(" + 
    backgroundColor.r + "," +
    backgroundColor.g + "," +
    backgroundColor.b + "," +
    backgroundColor.a + ")" : "rgba(256,256,256,0.2)" 

  const backgroundColorRGB = backgroundColor ? "rgba(" + 
    backgroundColor.r + "," +
    backgroundColor.g + "," +
    backgroundColor.b + ")" : "rgb(256,256,256)" 

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
                <div style={{ backgroundColor: colorToolBar, borderRadius: 5, height: 15, aspectRatio: 1, border:"2px solid black" }} 
                    onClick={clickColorNode}>
                </div>
              </div>
              
              <div className={`subCustomFieldToolbar ${selectColor ? '' : 'customFieldToolbarHidden'}`}>
                <ColorIcon color="#FFFFFF" onPress={() => chooseColorNode("#FFFFFF")} />
                <ColorIcon color="#C8E6C9" onPress={() => chooseColorNode("#C8E6C9")} />
                <ColorIcon color="#F8BBD0" onPress={() => chooseColorNode("#F8BBD0")} />
                <ColorIcon color="#FFF9C4" onPress={() => chooseColorNode("#FFF9C4")} />
                <ColorIcon color="#B3E5FC" onPress={() => chooseColorNode("#B3E5FC")} />
              </div>
            </div>
          }
      </div>
    </>
  );

}