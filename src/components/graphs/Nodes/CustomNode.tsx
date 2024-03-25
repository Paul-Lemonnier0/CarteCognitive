import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import React from 'react'
import { nodeStyle } from "../../../styles/Graphes/NodeStyle";

interface CustomNodeProps extends NodeProps {
  data: { label: string };
}

export const CustomNode: FC<CustomNodeProps> = ({ data }) => {
  const node_style = nodeStyle()
  
  return (
    <>
      <Handle type="target" position={Position.Top} />
        <div style={node_style}>
            <p>{data.label}</p>
        </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}