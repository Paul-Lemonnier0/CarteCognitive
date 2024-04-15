import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useStore, getStraightPath, Node, ReactFlowState, EdgeProps, EdgeLabelRenderer, BaseEdge, getBezierPath,  MarkerType, Position } from 'reactflow';
import { getEdgeParams } from '../../../utils/utils';
import { GraphContext } from '../../../context/GraphContext';

import { AppContext } from '../../../context/AppContext';
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



  const {showEdge,edges,setEdges, lastSelectedEdgeID, setLastSelectedEdgeID, cyclique} = useContext(GraphContext)

  const isBiDirectionEdge = useStore((s: ReactFlowState) => {
    const edgeExists = s.edges.some(
      (e) =>
        (e.source === target && e.target === source) || (e.target === source && e.source === target)
    );

    return edgeExists;
  });



  let path = '';

  const {sx, sy, tx, ty} = getEdgeParams(sourceNode, targetNode);

  if(isBiDirectionEdge) {
    const previousEdge = edges.filter((edge) => edge.source !== source || edge.target !== target)
    setEdges(previousEdge)
  }

  
  const [cycle, setCycle] = useState(false)
  const [visited, setVisited] = useState<string[]>([source])

  if(source === target) return null

  if (!sourceNode || !targetNode) {
    return null;
  }

  const nextEdgeToSource = (IDSource:string, IDFind:string) => {
    if(!cycle) {
      if(!cycle && !visited.find((elem) => elem===IDSource)) {
        setVisited([...visited,IDSource])
        const nextEdges = edges.filter((edge) => edge.source === IDSource)
        nextEdges.forEach((edge) => {
          if(!cycle) {
            if(edge.target === IDFind ) {
              setCycle(true)
              console.log("Visited :" , visited)
              return null
            }
            else if (!visited.find((edg) => edg==edge.source)) {
              return nextEdgeToSource(edge.target,IDFind)
            }
          }
        })
      }
    }
    }

  if(!cyclique) nextEdgeToSource(target,source)
  if(cycle && !cyclique) {
    const currentEdge = edges.filter((edge) => edge.id != id);
    setEdges(currentEdge);
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
      <BaseEdge id={id} path={path} markerEnd={markerEnd}/>
      {showEdge && 
        <EdgeLabelRenderer>
          <CustomEdgeLabel label={data ? data.label : ""} labelX={labelX} labelY={labelY}/>
        </EdgeLabelRenderer>
      }
    </>
  );
}

export default FloatingEdge;

