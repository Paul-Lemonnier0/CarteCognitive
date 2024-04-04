import { FC,useState, KeyboardEvent, useContext, MouseEventHandler, Dispatch, useEffect  } from "react";
import ReactFlow, { Handle, NodeProps, Position, useKeyPress } from "reactflow";
import React from 'react'
import { nodeStyle  } from "../../../styles/Graphes/NodeStyle";
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

const connectionNodeIdSelector = (state: any) => state.connectionNodeId;

export const CustomNode: FC<CustomNodeProps> = ({ data, selected, id}) => {
  const {setIsWriting, colorNode, wantSelectColor } = useContext(AppContext)
  const {updateNodeData, lastSelectedNodeID, changeColorWithField , nodeColorField, colorField} = useContext(GraphContext)
  const [colorToolBar, updateColorToolBar] = useState("white")

  const [nodeData, setNodeData] = useState<CustomNodeData>(data)
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
    console.log("test couleur : ", colorNode)
    updateColorToolBar(color)
    setNodeStyle(nodeStyle(selected, color))
  }

  const clickColorNode = () => {
    setSelectColor(!selectColor);
  }

  const clickColorSibebar = () => {
    wantSelectColor? chooseColorNode(colorNode) : undefined
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
          <div className="customNodeIconContainer">
            <FiTrash2 />
          </div>

          <div className="separator">
          </div> 

          <div className="customNodeIconContainer">
            <div style={{ backgroundColor: colorToolBar, borderRadius: 5, height: 15, aspectRatio: 1, border:"2px solid black" }} 
                onClick={clickColorNode}>
            </div>
          </div>
          
          <div className={`customNodeToolbar ${selectColor ? '' : 'customNodeToolbarHidden'}`}>
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
      }

      <div style={{ 
                  border: selected ? "2px solid black" : "2px solid transparent",
                  padding: 4,
                  borderRadius: 500,
                  opacity: 1
                }}  >
        <div style={node_style} className="customNode" onClick={clickColorSibebar}>
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