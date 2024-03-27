import { FC } from "react";
import { Handle, NodeProps, Position, useKeyPress } from "reactflow";
import React from 'react'
import { nodeStyle } from "../../../styles/Graphes/NodeStyle";
import {useStore } from 'reactflow';
import "./CustomNodeStyle.css"
import theme from "../../../constantes/Colors";

interface CustomNodeProps extends NodeProps {
  data: { label: string },
}

const connectionNodeIdSelector = (state: any) => state.connectionNodeId;

export const CustomNode: FC<CustomNodeProps> = ({ data, selected }) => {
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const ctrlKeyPressed = useKeyPress("Control")

  const isConnecting = !!connectionNodeId;

  const node_style = nodeStyle(selected)
  return (
    <>
      <div style={node_style}>
        {!ctrlKeyPressed && !selected ?
            <>
              {!isConnecting &&
                <Handle className="customHandle" position={Position.Bottom} type="source" />
              }

              <Handle
                className="customHandle"
                position={Position.Left}
                type="target"
                isConnectableStart={false}
              />
            </>

            :

            undefined

        }

        <p style={{color: selected ? theme.light.NodeFont : theme.light.Font}}>{data.label}</p>
      </div>
    </>
  );
}
