import { FC,useState, useContext, useEffect  } from "react";
import { Handle, NodeProps, NodeToolbar, Position, useKeyPress } from "reactflow";
import React from 'react'
import { nodeStyle  } from "../../../styles/Graphes/NodeStyle";
import {useStore } from 'reactflow';
import "./CustomNodeStyle.css"
import theme, { baseColors } from "../../../constantes/Colors";
import { FiUser, FiLink, FiTrash2, FiClock } from "react-icons/fi";
import { AppContext } from "../../../context/AppContext";
import { GraphContext } from "../../../context/GraphContext";
import ColorIcon from "../../Other/ColorIcon";
import { LuCopy } from "react-icons/lu";

export type CustomNodeData = {
  label: string;
  couleur?: string;
  date?: string;
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
    deleteSelectedNodes,
    duplicateNode,
    deleteNode
  } = useContext(GraphContext)

  const [label, setLabel] = useState(data.label ?? "")
  const [selectedColor, setSelectedColor] = useState(data.couleur ?? "white")

  const [isSelectingColor, setIsSelectingColor] = useState(false)
  const [showCreator, setShowCreator] = useState(false)

  const [node_style, setNodeStyle] = useState(nodeStyle(selected))

  const connectionNodeId = useStore(connectionNodeIdSelector);
  const ctrlKeyPressed = useKeyPress("Control")

  const isConnecting = !!connectionNodeId;

  data.date = data.date ?? "Non Definis"

  useEffect(() => {
    setLabel(data.label)
  }, [data.label])

  
  useEffect(() => {
    setSelectedColor(data.couleur ?? "white")
    setNodeStyle(nodeStyle(selected, data.couleur ?? "white"))

  }, [data.couleur, selected])

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
    setSelectedColor(color)

    setNodeStyle(nodeStyle(selected, color))

    if(!data.couleur || selectedColor !== data.couleur) {
      updateNodeData(id, {...data, couleur: selectedColor})
    }
  }

  const clickColorNode = () => {
    setIsSelectingColor(!isSelectingColor);
  }

  const clickColorSibebar = () => {
    chooseColorNode(colorNode)
  }

  //TODO : a revoir ça pcq je pense que ça peut etre plus propre (plus haut en hierarchie)

  // useEffect(() => {
  //   setNodeColorField([])
  //   nodeColorField.forEach(node => {
  //     if(node === id) chooseColorNode(colorField)
  //   })
  // }, [changeColorWithField, id, chooseColorNode, nodeColorField, colorField, setNodeColorField])

  const ShowCreator = () => {
    setShowCreator(!showCreator)
  }

  const handleDuplicateNode = () => {
    duplicateNode(id)
  }

  const handleDeleteNode = () => {
    deleteNode(id)
  }

  return (
    <div className="customNodeContainer" >  
      {
        <NodeToolbar nodeId={id} offset={50} align="start" isVisible={lastSelectedNodeID === id}> 
          <div className={`customNodeToolbar ${lastSelectedNodeID === id ? '' : 'customNodeToolbarHidden'}`} >
            <div className="customNodeIconContainer">
              <FiLink size={20}/>
              <span className="verticalTooltip">Lien</span>
            </div>
            <div className="customNodeIconContainer" onClick={handleDuplicateNode}>
              <LuCopy size={20}/>
              <span className="verticalTooltip">Dupliquer</span>
            </div>
            {
              showCreator ?
              <div className="nodeCreator">
                <div className="nodeCreatorIcon">
                  <FiUser size={20}/>
                  <span>Nicolas Mdr</span>
                  
                </div>
                <div className="nodeCreatorIcon">
                  <FiClock size={20}/>
                  {data.date}
                </div>
              </div>
              : undefined
            }
            <div className="customNodeIconContainer" onClick={handleDeleteNode}>
              <FiTrash2 size={20}/>
              <span className="verticalTooltip">Supprimer</span>

            </div>

            <div className="separator"/>

            <div className="customNodeIconContainer">
              <ColorIcon small isSelected color={selectedColor} onPress={clickColorNode}/>
              <span className="verticalTooltip">Couleur</span>

            </div>
            
            <div className={`customNodeToolbar ${isSelectingColor ? '' : 'customNodeToolbarHidden'}`}>
              {
                  baseColors.map(baseColor =>
                      <ColorIcon key={baseColor} small isSelected={baseColor === selectedColor} color={baseColor} onPress={() => chooseColorNode(baseColor)}/>
                  )
              }
            </div>
          </div>
        </NodeToolbar>
      }

      <div style={{ border: selected ? "2px solid black" : "2px solid transparent", padding: 4, borderRadius: 500, opacity: 1}}  >
        <div style={node_style} className="customNode" onClick={wantSelectColor ? clickColorSibebar : undefined}>
          {!ctrlKeyPressed && !selected && !wantSelectColor &&
              <>
                {
                  !isConnecting &&
                  <Handle className="customHandle" position={Position.Bottom} type="source" /> 
                }

                <Handle className="customHandle" position={Position.Left} type="target" isConnectableStart={false}/>
              </>
          }

          {
            !selected ?
              <p className="customNodeText">{label}</p>
              :
              <div>
                <input 
                  onChange={handleWritting}
                  disabled={!selected} 
                  onFocus={handleStartWriting}
                  onBlur={handleEndWriting}
                  type="text" 
                  value={label}
                  className={`inputCustomNode`}
                  style={{color: theme.light.Font, backgroundColor: selectedColor}}
                />
              </div>
          }
        </div>
      </div>
    </div>
  );

  
}