import React from 'react';
import { ConnectionLineComponentProps, getStraightPath } from 'reactflow';

const CustomConnectionLine: React.FC<ConnectionLineComponentProps> = ({ fromX, fromY, toX, toY, connectionLineStyle }) => {
  const [edgePath] = getStraightPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
  });

  
  return (
    <g>
      <path style={{stroke: "black", strokeWidth: 1}} fill="none" d={edgePath} />
      <circle cx={toX} cy={toY} fill="black" r={1} stroke="black" strokeWidth={1.5} />
    </g>
  );
}

export default CustomConnectionLine;
