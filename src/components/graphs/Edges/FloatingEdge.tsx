import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useStore, getStraightPath, Node, ReactFlowState, EdgeProps, EdgeLabelRenderer, BaseEdge} from 'reactflow';
import { getEdgeParams } from '../../../utils/utils';
import {GraphContext } from '../../../context/GraphContext';

import "./FloatingEdgeStyle.css"

import CustomEdgeLabel from './CustomEdgeLabel';




export type GetSpecialPathParams = {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
};

export const getSpecialPath = (
  { sourceX, sourceY, targetX, targetY }: GetSpecialPathParams,
  offset: number
) => {
  const centerX = (sourceX + targetX) / 2;
  const centerY = (sourceY + targetY) / 2;

  return `M ${sourceX} ${sourceY} Q ${centerX} ${centerY + offset} ${targetX} ${targetY}`;
};

export type CustomEdgeData = {
  label: "t";
  couleur?: string;
};

export interface CustomEdgeProps extends EdgeProps {
  data: CustomEdgeData;
}


const FloatingEdge: React.FC<EdgeProps> = ({ 
  data,
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  selected }) => {
  const sourceNode = useStore(useCallback((store: ReactFlowState) => store.nodeInternals.get(source), [source])) as Node;
  const targetNode = useStore(useCallback((store: ReactFlowState) => store.nodeInternals.get(target), [target])) as Node;
  
  

  const {showEdge,edges,setEdges, lastSelectedEdgeID, setLastSelectedEdgeID, pathEdges, graphCalculType } = useContext(GraphContext)

  let path = '';
  
  const {sx, sy, tx, ty} = getEdgeParams(sourceNode, targetNode);
  const [colorEdge, setColorEdge] = useState("grey")

  useEffect(() => {
    if(pathEdges.find((edge) => edge.id === id)) setColorEdge("blue")
    else {
      if(data.label !== "") setColorEdge("grey")
        else setColorEdge("red")
    }
  },[pathEdges])

  useEffect(() => {
    if(data.label) {
        // if(graphCalculType === GraphCalculType.Integer) {
        //   const numberPattern = /^-?\d*\.?\d+$/;
        //   const fractionPattern = /^-?\d+\/\d+$/;
        //   if(!numberPattern(data.label) && !fractionPattern.test(data.label)) data.label = ""
        // }
        // else {
        //   if(data.label !== '+' && data.label !== '-' && data.label !== '?') data.label = ""
        // }
    }
  },[graphCalculType, data.label])


  useEffect(() => {
    if(data.label) {
      if(data.label !== "") setColorEdge("grey")
      else setColorEdge("red")
    }
    else setColorEdge("red")
    
  },[data.label])


  if (!sourceNode || !targetNode) {
    return null;
  }



  [path] = getStraightPath({
      sourceX: sx,
      sourceY: sy,
      targetX: tx,
      targetY: ty,
    });
  

  const labelX = (sx + tx) / 2; // Position X du label (milieu de l'edge)
  const labelY = (sy + ty) / 2; // Position Y du label (milieu de l'edge)

  return (
    <>
      <BaseEdge id={id} path={path} interactionWidth={25} style={{
        backgroundColor: "red",
        borderColor: "red",
        stroke: colorEdge,
        strokeWidth: 2
        
      }} markerEnd={markerEnd}/>
      {showEdge && 
        <EdgeLabelRenderer>
          <CustomEdgeLabel label={data ? data.label : ""} labelX={labelX} labelY={labelY}/>
        </EdgeLabelRenderer>
      }
    </>
  );
}

export default FloatingEdge;

