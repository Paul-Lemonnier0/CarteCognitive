import { FC, useEffect, useState, useRef, useContext} from "react";
import {Handle, NodeProps, Position , useUpdateNodeInternals,
  NodeResizer,} from "reactflow";
import React from 'react'
import "./FieldsetNodeStyle.css"
import { FiEdit3 } from "react-icons/fi";
import { GraphContext } from "../../../context/GraphContext";
import { AppContext } from "../../../context/AppContext";


export type FieldsetNodeData = {
  label: string;
  resizable: boolean;
  rotatable: boolean
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


export const FieldsetNode: FC<FieldsetNodeProps> = ({ data, selected, id}) => {
  const [title, setTitle] = useState("Titre Zone")
  const [resizable, setResizable] = useState(true)
  
  const [wantWhrite, setWantWhrite] = useState(false)
  const {setIsWriting} = useContext(AppContext)

  const {updateNodeData, lastSelectedNodeID} = useContext(GraphContext)

  const [selectColor, setSelectColor] = useState(false)
  const [colorFieldSetNode, setcolorFieldSetNode] = useState("3px solid black")
  const [colorToolBar, updateColorToolBar] = useState("black")

  const handleStartWriting = () => {
    setIsWriting(true)
  }

  const handleEndWriting = () => {
    setIsWriting(false)
  }

  const handleWritting = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle( e.target.value)
  }

  useEffect(() => {
    if(selected) setResizable(true)
    else setResizable(false)

  }, [selected])

  const chooseColorNode = (color = "black") => {
    console.log(color)
    updateColorToolBar(color)
    setcolorFieldSetNode(`3px solid ${color}`)
  }

  const clickColorNode = () => {
    if(wantWhrite) setWantWhrite(false)
    setSelectColor(!selectColor);
  }

  const clickInputNode = () => {
    if(selectColor)  setSelectColor(false)
    setWantWhrite(!wantWhrite);
  }

  return (
    
    <>
      <div className="fieldset-container" style={{border: colorFieldSetNode}}>
          <legend className="legend">{title}</legend>
           <NodeResizer isVisible={resizable} minWidth={100} minHeight={100} />

          <span style={{marginLeft : "100px"}}></span>

          {
            <div className={`customFieldToolbar ${lastSelectedNodeID === id ? '' : 'customNodeToolbarHidden'}`}>
              <div className="customFieldIconContainer">
                <FiEdit3 onClick={clickInputNode}/>
              </div>
              {
                wantWhrite ?
                  <div className={`InputFieldSetNode`}>
                    <input 
                      onChange={handleWritting}
                      disabled={!selected} 
                      onFocus={handleStartWriting}
                      onBlur={handleEndWriting}
                      type="text" 
                      value={title}
                      className={`inputCustomNode`}
                      style={{width: "auto", backgroundColor: "transparent", borderRadius: "0%"}}
                    />
                  </div>
                  :
                  null
              }

              <div className="separator">
              </div> 

              <div className="customFieldIconContainer">
                <div style={{ backgroundColor: colorToolBar, borderRadius: 5, height: 15, aspectRatio: 1, border:"2px solid black" }} 
                    onClick={clickColorNode}>
                </div>
              </div>
              
              <div className={`customFieldToolbar ${selectColor ? '' : 'customFieldToolbarHidden'}`}>
                <ColorIcon color="black" onPress={() => chooseColorNode("black")} />
                <ColorIcon color="blue" onPress={() => chooseColorNode("blue")} />
                <ColorIcon color="red" onPress={() => chooseColorNode("red")} />
                <ColorIcon color="magenta" onPress={() => chooseColorNode("magenta")} />
              </div>
            </div>
          }
      </div>
    </>
  );

}