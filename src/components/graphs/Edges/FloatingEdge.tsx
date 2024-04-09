import React, { useCallback, useContext } from 'react';
import { useStore, getStraightPath, Node, ReactFlowState, EdgeProps, EdgeLabelRenderer, BaseEdge, getBezierPath, MarkerType, Position } from 'reactflow';
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

const FloatingEdge: React.FC<EdgeProps> = ({   
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


  const {showEdge,edges} = useContext(GraphContext)
  
  const isBiDirectionEdge = useStore((s: ReactFlowState) => {
    const edgeExists = s.edges.some(
      (e) =>
        (e.source === target && e.target === source) || (e.target === source && e.source === target)
    );

    return edgeExists;
  });

  if(source === target) return null

  if (!sourceNode || !targetNode) {
    return null;
  }


  let path = '';

  const {sx, sy, tx, ty} = getEdgeParams(sourceNode, targetNode);

  if(isBiDirectionEdge) {
    let second = false
    let first = false
    edges.forEach((edge) =>{
      if(!first && !second) {
        if(edge.source===source && edge.target===target) { first = true}
        else if(edge.source===target && edge.target===source) {second=true }
      }
    })
    if(second) return null
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
    <EdgeLabelRenderer>
    { showEdge ? 
        <div
        style={{position: 'absolute',
        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
        background: '#FFFFFF',
        border: "2px solid #b1b1b7",
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 8,
        paddingTop: 8,
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 700,}} 
        >
        <p className="customEdgeText" >{id}</p> </div>
         : undefined
    }     

    </EdgeLabelRenderer> 

      <BaseEdge id={id} path={path} markerEnd={markerEnd}/>
      {showEdge && 
        <EdgeLabelRenderer>
          <CustomEdgeLabel label={id} labelX={labelX} labelY={labelY}/>
        </EdgeLabelRenderer>
      }

    </>
  );
}

export default FloatingEdge;

