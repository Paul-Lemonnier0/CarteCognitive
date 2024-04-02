import { FC,useState, KeyboardEvent, useContext, MouseEventHandler, Dispatch  } from "react";
import ReactFlow, { Handle, NodeProps, Position, useKeyPress } from "reactflow";
import React from 'react'
import { nodeStyle } from "../../../styles/Graphes/NodeStyle";
import {useStore } from 'reactflow';
import "./FieldsetNodeStyle.css"
import theme from "../../../constantes/Colors";
import { FiCopy, FiEdit3, FiLink, FiTrash2 } from "react-icons/fi";
import { AppContext } from "../../../context/AppContext";
import { GraphContext } from "../../../context/GraphContext";

export type FieldsetNodeData = {
  label: string;
};

export interface FieldsetNodeProps extends NodeProps {
  data: FieldsetNodeData;
}

interface ColorIconProps {
  onPress: () => void,
  color: string
}
const ColorIcon: FC<ColorIconProps> = ({ onPress, color = "white" }) => {
  return (
    <div className="fieldsetNodeIconContainer">
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

const connectionNodeIdSelector = (state: any) => state.connectionNodeId;

export const FieldsetNode: FC<FieldsetNodeProps> = ({ data, selected, id}) => {
  const {setIsWriting} = useContext(AppContext)
  const {updateNodeData, lastSelectedNodeID} = useContext(GraphContext)

  const [colorToolBar, updateColorToolBar] = useState("white")

  const [nodeData, setNodeData] = useState<FieldsetNodeData>(data)
  const [selectColor, setSelectColor] = useState(false)

  const connectionNodeId = useStore(connectionNodeIdSelector);
  const ctrlKeyPressed = useKeyPress("Control")

  const isConnecting = !!connectionNodeId;

  const [node_style, setNodeStyle] = useState(nodeStyle(selected))

  const handleStartWriting = () => {
    setIsWriting(true)
  }

  const handleEndWriting = () => {
    if(nodeData != data) {
      updateNodeData(id, nodeData)
    }

    setIsWriting(false)
  }

  const handleWritting = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNodeData((prevData) => ({...prevData, label: e.target.value}))
  }

  const chooseColorNode = (color = "white") => {
    console.log(color)
    updateColorToolBar(color)
    setNodeStyle(nodeStyle(selected, color))
  }

  const clickColorNode = () => {
    setSelectColor(!selectColor);
  }
  
  return (
    <>
      {/* {
        <div className={`fieldsetNodeToolbar ${lastSelectedNodeID === id ? '' : 'fieldsetNodeToolbarHidden'}`}>

          <div className="fieldsetNodeIconContainer">
            <FiCopy />
          </div>
          <div className="fieldsetNodeIconContainer">
            <FiTrash2 />
          </div>

          <div className="separator">
          </div> 

          <div className="fieldsetNodeIconContainer">
            <div style={{ backgroundColor: colorToolBar, borderRadius: 5, height: 15, aspectRatio: 1, border:"2px solid black" }} 
                onClick={clickColorNode}>
            </div>
          </div>
          
          <div className={`fieldsetNodeToolbar ${selectColor ? '' : 'fieldsetNodeToolbarHidden'}`}>
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
      } */}


      <div className="fieldset-container">
          <fieldset className="fieldset">
              <legend className="legend">Titre zone</legend>
              <div className="content">
                  <br/> 
                  <br/> 
              </div>
          </fieldset>
      </div>
    </>
  );

  
}