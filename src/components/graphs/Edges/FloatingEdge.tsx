import { useCallback } from 'react';
import { useStore, getStraightPath, Node, ReactFlowState, EdgeProps } from 'reactflow';
import { getEdgeParams } from '../../../utils/utils';
import React from 'react';

const FloatingEdge: React.FC<EdgeProps> = ({ id, source, target, markerEnd, style }) => {
  const sourceNode = useStore(useCallback((store: ReactFlowState) => store.nodeInternals.get(source), [source])) as Node;
  const targetNode = useStore(useCallback((store: ReactFlowState) => store.nodeInternals.get(target), [target])) as Node;

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

  const [edgePath] = getStraightPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
  });

  return (
    <path
      id={id}
      className="react-flow__edge-path"
      d={edgePath}
      markerEnd={markerEnd}
      style={style}
    />
  );
}

export default FloatingEdge;
