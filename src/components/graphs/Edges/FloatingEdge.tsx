import { useCallback, useContext } from 'react';
import { 
  useStore, 
  getStraightPath, 
  Node, 
  ReactFlowState, 
  EdgeProps, 
  EdgeLabelRenderer, 
  BaseEdge
} from 'reactflow';
import { getEdgeParams } from '../../../utils/utils';
import React from 'react';
import { GraphContext } from '../../../context/GraphContext';
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
  markerEnd, }) => {
  const sourceNode = useStore(useCallback((store: ReactFlowState) => store.nodeInternals.get(source), [source])) as Node;
  const targetNode = useStore(useCallback((store: ReactFlowState) => store.nodeInternals.get(target), [target])) as Node;


  const {showEdge} = useContext(GraphContext)



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

  // const edgePathParams = {
  //   sourceX,
  //   sourceY,
  //   sourcePosition,
  //   targetX,
  //   targetY,
  //   targetPosition,
  // };

  let path = '';

  const {sx, sy, tx, ty} = getEdgeParams(sourceNode, targetNode);
  const offset = isBiDirectionEdge ? (sx < tx ? 50 : -50) : 0

  if (isBiDirectionEdge) {
    path = getSpecialPath({
      sourceX: sx,
      sourceY: sy,
      targetX: tx,
      targetY: ty,
    }, offset);
  } else {
    [path] = getStraightPath({
      sourceX: sx,
      sourceY: sy,
      targetX: tx,
      targetY: ty,
    });
  }

  const labelX = (sx + tx) / 2; // Position X du label (milieu de l'edge)
  const labelY = (sy + ty) / 2 + offset; // Position Y du label (milieu de l'edge)

  return (
    <>
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
