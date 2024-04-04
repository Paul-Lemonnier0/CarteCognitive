import { FC,useState, KeyboardEvent, useContext, MouseEventHandler, Dispatch, useEffect  } from "react";
import ReactFlow, { Handle, NodeProps, Position, useKeyPress } from "reactflow";
import React from 'react'
import { nodeStyle  } from "../../../styles/Graphes/NodeStyle";
import {useStore } from 'reactflow';
import "./CustomNodeStyle.css"
import theme, { baseColors } from "../../../constantes/Colors";
import { FiCopy, FiEdit3, FiLink, FiTrash2 } from "react-icons/fi";
import { AppContext } from "../../../context/AppContext";
import { GraphContext } from "../../../context/GraphContext";
import ColorIcon from "../../Other/ColorIcon";

export type CustomNodeData = {
  label: string;
  couleur?: string;
};

export interface CustomNodeProps extends NodeProps {
  data: CustomNodeData;
}

const connectionNodeIdSelector = (state: any) => state.connectionNodeId;

export const CustomNode: FC<CustomNodeProps> = ({ data, selected, id}) => {

  const {setIsWriting, colorNode, wantSelectColor } = useContext(AppContext)
  const {
    updateNodeData, 
    lastSelectedNodeID, 
    changeColorWithField , 
    nodeColorField, 
    colorField, 
    deleteSelectedNodes
  } = useContext(GraphContext)

  const [colorToolBar, updateColorToolBar] = useState("white")

  const [nodeData, setNodeData] = useState<CustomNodeData>(data)
  const [selectColor, setSelectColor] = useState(false)

  const connectionNodeId = useStore(connectionNodeIdSelector);
  const ctrlKeyPressed = useKeyPress("Control")

  const isConnecting = !!connectionNodeId;

  const [node_style, setNodeStyle] = useState(nodeStyle(selected))


  useEffect(() => {
    updateNodeData(id, nodeData)
  }, [nodeData])

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
    console.log("test couleur : ", colorNode)
    updateColorToolBar(color)
    setNodeStyle(nodeStyle(selected, color))
    setNodeData((prevData) => ({...prevData, couleur: color}))
  }

  const clickColorNode = () => {
    setSelectColor(!selectColor);
  }

  const clickColorSibebar = () => {
    chooseColorNode(colorNode)
  }

  useEffect(() => {
    console.log(nodeColorField)
    nodeColorField.map((node,index) => {
      console.log("ID : " , node)
      if(node === id) chooseColorNode(colorField)

    })
  }, [changeColorWithField])

  return (
    <div className="customNodeContainer" >  
      {
        <div className={`customNodeToolbar ${lastSelectedNodeID === id ? '' : 'customNodeToolbarHidden'}`} >
          <div className="customNodeIconContainer">
            <FiLink />
          </div>
          <div className="customNodeIconContainer">
            <FiCopy />
          </div>
          <div className="customNodeIconContainer" onClick={deleteSelectedNodes}>
            <FiTrash2 />
          </div>

          <div className="separator"/>

          <div className="customNodeIconContainer">
            <ColorIcon small isSelected color={nodeData.couleur ?? "white"} onPress={clickColorNode}/>
          </div>
          
          <div className={`customNodeToolbar ${selectColor ? '' : 'customNodeToolbarHidden'}`}>
            {
                baseColors.map(baseColor =>
                    <ColorIcon small isSelected={baseColor === nodeData.couleur} color={baseColor} onPress={() => chooseColorNode(baseColor)}/>
                )
            }
          </div>
        </div>
      }

      <div style={{ 
                  border: selected ? "2px solid black" : "2px solid transparent",
                  padding: 4,
                  borderRadius: 500,
                  opacity: 1
                }}  >
        <div style={node_style} className="customNode" onClick={wantSelectColor ? clickColorSibebar : undefined}>
          {!ctrlKeyPressed && !selected && !wantSelectColor ?
              <>
                {
                  !isConnecting &&
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
                <input 
                  onChange={handleWritting}
                  disabled={!selected} 
                  onFocus={handleStartWriting}
                  onBlur={handleEndWriting}
                  type="text" 
                  value={nodeData.label}
                  className={`inputCustomNode`}
                  style={{color: theme.light.Font, backgroundColor: colorToolBar}}
                />
              </div>
          }
        </div>
      </div>
    </div>
  );

  
}