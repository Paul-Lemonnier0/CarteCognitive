import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import React from 'react'
import { nodeStyle } from "../../../styles/Graphes/NodeStyle";
import theme from "../../../constantes/Colors";

interface CustomNodeProps extends NodeProps {
  data: { label: string };
}

export const CustomNode: FC<CustomNodeProps> = ({ data, selected }) => {

  const node_style = nodeStyle(selected)
  
  return (
    <>
      <Handle type="target" position={Position.Top} />
        <div style={node_style}>
            <p style={{color: theme.light.NodeFont}}>{data.label}</p>
        </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}