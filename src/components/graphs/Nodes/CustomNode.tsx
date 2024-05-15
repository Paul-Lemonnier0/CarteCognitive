import { FC, useState, useContext, useEffect } from "react";
import { Handle, NodeProps, NodeToolbar, Position, useKeyPress } from "reactflow";
import React from 'react'
import { useStore } from 'reactflow';
import "./CustomNodeStyle.css"
import { baseColors } from "../../../constantes/Colors";
import { FiUser, FiLink, FiTrash2, FiClock } from "react-icons/fi";
import { AppContext } from "../../../context/AppContext";
import { GraphContext } from "../../../context/GraphContext";
import ColorIcon from "../../Other/ColorIcon";
import { LuCopy } from "react-icons/lu";
import { MidTextBold, NormalText } from "../../Text/CustomText";

export type CustomNodeData = {
  label: string;
  couleur?: string;
  date?: string;
};

export interface CustomNodeProps extends NodeProps {
  data: CustomNodeData;
}

const connectionNodeIdSelector = (state: any) => state.connectionNodeId;

export const CustomNode: FC<CustomNodeProps> = ({ data, selected, id }) => {
  const { colorNode, wantSelectColor } = useContext(AppContext)

  const {
    updateNodeData,
    lastSelectedNodeID,

    isCalculating,
    duplicateNode,
    deleteNode,
    breakLinks,
    influancePath,
    setInfluancePath,
    setSelectedNodesIDs,

  } = useContext(GraphContext)

  const [label, setLabel] = useState(data.label ?? "")
  const [selectedColor, setSelectedColor] = useState(data.couleur ?? "white")

  const [isSelectingColor, setIsSelectingColor] = useState(false)
  const [showCreator, setShowCreator] = useState(false)

  const connectionNodeId = useStore(connectionNodeIdSelector);
  const ctrlKeyPressed = useKeyPress("Control")

  const isConnecting = !!connectionNodeId;

  data.date = data.date ?? "Non Definis"

  useEffect(() => {
    setLabel(data.label)
  }, [data.label])


  useEffect(() => {
    setSelectedColor(data.couleur ?? "white")

  }, [data.couleur, selected])


  const chooseColorNode = (color = "white") => {
    setSelectedColor(color)

    if (!data.couleur || (color !== data.couleur)) {
      updateNodeData(id, { ...data, couleur: color })
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



  const handleDuplicateNode = () => {
    duplicateNode(id)
  }

  const handleDeleteNode = () => {
    deleteNode(id)
  }

  const handleBreakLinks = () => {
    breakLinks(id)
    console.log("TEST")
  }

  const handleSelectColor = (color: string) => {
    chooseColorNode(color)
    setIsSelectingColor(false)
  }

  const isSourceOfInfluanceCalcul = ((isCalculating && influancePath && influancePath.nodesID && influancePath.nodesID.length > 0) && influancePath.nodesID[0] === id) as boolean
  const isTargetOfInfluanceCalcul = ((isCalculating && influancePath && influancePath.nodesID && influancePath.nodesID.length > 1) && influancePath.nodesID[influancePath.nodesID.length - 1] === id) as boolean
  const isInInfluanceCalcul = !isSourceOfInfluanceCalcul && !isTargetOfInfluanceCalcul && ((isCalculating && influancePath && influancePath.nodesID) && influancePath.nodesID.includes(id)) as boolean
  const indexOfNodeInInflancePath = (isCalculating && influancePath && influancePath.nodesID) ? influancePath.nodesID.indexOf(id) : 0

  const isPartOfInfluanceCalcul = isSourceOfInfluanceCalcul || isTargetOfInfluanceCalcul || isInInfluanceCalcul

  const isHighLighted = (isCalculating && isPartOfInfluanceCalcul) || selected
  const isToolbarVisible = (isCalculating && isPartOfInfluanceCalcul) || lastSelectedNodeID === id

  const middleInfluantePathNodeName = "Noeud " + indexOfNodeInInflancePath

  let borderColor = "transparent"

  if (isCalculating) {
    if (isPartOfInfluanceCalcul) borderColor = "black"
  }

  else {
    if (isHighLighted) borderColor = "black"
  }

  const handleOnClick = () => {
    if (isCalculating) {
      if (influancePath && influancePath.nodesID && influancePath.nodesID.includes(id)) {
        const prevNodesID = influancePath?.nodesID ? [...influancePath?.nodesID] : []
        const newSelectedNodeIds = prevNodesID.filter(nodeID => nodeID !== id)

        setInfluancePath({ nodesID: newSelectedNodeIds, edges: [] })

        setSelectedNodesIDs(newSelectedNodeIds)

        // setNodes((previousNodes) => (previousNodes.map((node) => {
        //     if (node.id === id) {
        //         return { ...node, selected: false }
        //     }

        //     return { ...node }
        // })));
      }

      else {
        const prevNodesID = influancePath?.nodesID ? [...influancePath?.nodesID] : []
        const newSelectedNodeIds = [...prevNodesID, id]

        setInfluancePath({ nodesID: newSelectedNodeIds, edges: [] })

        setSelectedNodesIDs(newSelectedNodeIds)

        // setNodes((previousNodes) => (previousNodes.map((node) => {
        //     if (node.id === id) {
        //         return { ...node, selected: true }
        //     }

        //     return { ...node }
        // })));
      }
    }
  }

  return (
    <div className="customNodeContainer" onClick={handleOnClick}>
      {
        <NodeToolbar nodeId={id} offset={50} align="start" isVisible={isToolbarVisible}>
          {
            isCalculating ?

              <div className={`customNodeToolbar ${isPartOfInfluanceCalcul ? '' : 'customNodeToolbarHidden'}`}
                style={{ backgroundColor: "#313443", width: 90 }}>
                <MidTextBold text={
                  isSourceOfInfluanceCalcul ? "Source" :
                    isTargetOfInfluanceCalcul ? "Cible" : middleInfluantePathNodeName} color="white" />
              </div>

              :

              <div className={`customNodeToolbar ${lastSelectedNodeID === id ? '' : 'customNodeToolbarHidden'}`} >
                <div className="customNodeIconContainer" onClick={handleBreakLinks}>
                  <FiLink size={20} />
                  <span className="verticalTooltip">Casser les liens</span>
                </div>
                <div className="customNodeIconContainer" onClick={handleDuplicateNode}>
                  <LuCopy size={20} />
                  <span className="verticalTooltip">Dupliquer</span>
                </div>
                {
                  showCreator ?
                    <div className="nodeCreator">
                      <div className="nodeCreatorIcon">
                        <FiUser size={20} />
                        <span>Nicolas Mdr</span>

                      </div>
                      <div className="nodeCreatorIcon">
                        <FiClock size={20} />
                        {data.date}
                      </div>
                    </div>
                    : undefined
                }
                <div className="customNodeIconContainer" onClick={handleDeleteNode}>
                  <FiTrash2 size={20} />
                  <span className="verticalTooltip">Supprimer</span>

                </div>

                <div className="separator" />

                <div className="customNodeIconContainer">
                  <ColorIcon small isSelected color={selectedColor} onPress={clickColorNode} />
                  <span className="verticalTooltip">Couleur</span>

                </div>

                <div style={{ top: -50 }} className={`customNodeToolbar ${isSelectingColor ? '' : 'customNodeToolbarHidden'}`}>
                  {
                    baseColors.map(baseColor =>
                      <ColorIcon key={baseColor} small isSelected={baseColor === selectedColor} color={baseColor} onPress={() => handleSelectColor(baseColor)} />
                    )
                  }
                </div>
              </div>
          }
        </NodeToolbar>
      }

      <div style={{
        backgroundColor: selectedColor,
        border: `3px solid ${isHighLighted ? "black" : "transparent"}`,
        // opacity: isPartOfInfluanceCalcul ? 1 : 0.25
      }}
        className="customNode"
        onClick={wantSelectColor ? clickColorSibebar : undefined}>

        {!ctrlKeyPressed && !selected && !wantSelectColor && !isCalculating &&
          <>
            {
              !isConnecting &&
              <Handle id={"handle_A_" + id} className="customHandle" position={Position.Bottom} type="source" />
            }

            <Handle id={"handle_B_" + id} className="customHandle" position={Position.Left} type="target" isConnectableStart={false} />
          </>
        }

        <NormalText text={label} wrap center bold />
      </div>
    </div>
  );


}

{/* <input 
onChange={handleWritting}
disabled={!selected} 
onFocus={handleStartWriting}
onBlur={handleEndWriting}
type="text" 
value={label}
className={`inputCustomNode`}
style={{color: theme.light.Font, backgroundColor: selectedColor}}
/> */}