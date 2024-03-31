import { FC,useState, KeyboardEvent, useContext  } from "react";
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

  const [nodeData, setNodeData] = useState<CustomNodeData>(data)

  const connectionNodeId = useStore(connectionNodeIdSelector);
  const ctrlKeyPressed = useKeyPress("Control")


  const isConnecting = !!connectionNodeId;

  const node_style = nodeStyle(selected)

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
            <FiEdit3 />
          </div>
          <div className="customNodeIconContainer">
            <FiTrash2 />
          </div>
{/* 
          <div className="separator">
          </div> */}

          <div className="customNodeIconContainer">
            <div style={{ backgroundColor: "lightseagreen", borderRadius: 5, height: 15, aspectRatio: 1 }}>
            </div>
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
            <input 
              onChange={handleWritting}
              disabled={!selected} 
              onFocus={handleStartWriting}
              onBlur={handleEndWriting}
              type="text" 
              value={nodeData.label}
              className={`inputCustomNode ${selected ? '' : 'inputCustomNodeDisabled'}`}
              style={{color: theme.light.Font}}
            />
        }


      </div>
    </div>
  );
}