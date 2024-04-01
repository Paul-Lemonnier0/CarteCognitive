import { FC,useState, KeyboardEvent, useContext, MouseEventHandler  } from "react";
import ReactFlow, { Handle, NodeProps, Position, useKeyPress } from "reactflow";
import React from 'react'
import { nodeStyle } from "../../../styles/Graphes/NodeStyle";
import {useStore } from 'reactflow';
import "./CustomNodeStyle.css"
import theme from "../../../constantes/Colors";
import { FiCopy, FiEdit3, FiLink, FiTrash2 } from "react-icons/fi";
import { AppContext } from "../../../context/AppContext";
import { GraphContext } from "../../../context/GraphContext";

export type CustomNodeData = {
  label: string;
};

export interface CustomNodeProps extends NodeProps {
  data: CustomNodeData;
}

const connectionNodeIdSelector = (state: any) => state.connectionNodeId;

export const CustomNode: FC<CustomNodeProps> = ({ data, selected, id}) => {
  const {setIsWriting} = useContext(AppContext)
  const {updateNodeData} = useContext(GraphContext)


  const [colorToolBar, updateColorToolBar] = useState("white")

  const [nodeData, setNodeData] = useState<CustomNodeData>(data)
  const [selectColor, setSelectColor] = useState(false)

  const connectionNodeId = useStore(connectionNodeIdSelector);
  const ctrlKeyPressed = useKeyPress("Control")

  const borderStyle: React.CSSProperties = {
    backgroundColor: 'transparent', 
    border: '4px solid black', 
    width: "90px", 
    height: '90px', 
    borderRadius: '50%', 
    position: 'absolute', 
    top: '-12px', 
    left: '-12px', 
  };

  const isConnecting = !!connectionNodeId;

  const [node_style,updateNodeStyle] = useState(nodeStyle(selected))

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
    updateColorToolBar(color)
    updateNodeStyle(nodeStyle(selected,color))
  }
  const icone = (color = "white") => {
    return (
    <div className="customNodeIconContainer">
        <div style={{ backgroundColor: color, borderRadius: 5, height: 15, aspectRatio: 1, border:"1px solid black"}} onClick={() => chooseColorNode(color)}>           
        </div>
    </div>
    )
  }
  const clickColorNode = () => {
    selectColor ? setSelectColor(false) : setSelectColor(true);

  }
  

  

  return (
    <div className="customNodeContainer">
      
      {
        <div className={`customNodeToolbar ${selected ? '' : 'customNodeToolbarHidden'}`}>
          <div className="customNodeIconContainer">
            <FiLink />
          </div>
          <div className="customNodeIconContainer">
            <FiCopy />
          </div>
          <div className="customNodeIconContainer">
            <FiTrash2 />
          </div>

          <div className="separator">
          </div> 

          <div className="customNodeIconContainer">
            <div style={{ backgroundColor: colorToolBar, borderRadius: 5, height: 15, aspectRatio: 1, border:"2px solid black" }} onClick={clickColorNode}>
            </div>
          </div>
          
          <div className={`customNodeToolbar ${selectColor ? '' : 'customNodeToolbarHidden'}`}>
              {icone("white")}
              {icone("green")}
              {icone("blue")}
              {icone("yellow")}
              {icone("red")}
              {icone("pink")}
            </div>

        </div>
      }

      <div style={node_style} className="customNode">
        {!ctrlKeyPressed && !selected ?
            <>
            {
            //La position des handles ici ne change rien, c'est juste pour ne pas avoir l'erreur de paramètres
            }

              {!isConnecting &&
                <Handle className="customHandle" position={Position.Bottom} type="source" /> 
              }
              

              <Handle
                className="customHandle" 
                position={Position.Left}
                type="target"
                isConnectableStart={false}
              />
            </>
            :
            undefined
        }

        {
          !selected ?
            <p className="customNodeText">{nodeData.label}</p>
            :
            
            <div>
              <div style={{...borderStyle}} />
              <input 
                onChange={handleWritting}
                disabled={!selected} 
                onFocus={handleStartWriting}
                onBlur={handleEndWriting}
                type="text" 
                value={nodeData.label}
              
                className={`inputCustomNode`}
                style={{color: theme.light.Font, backgroundColor: colorToolBar,}}
    
              />
            </div>
            
        }


      </div>
    </div>
  );

  
}