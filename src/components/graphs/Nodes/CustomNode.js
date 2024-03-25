import { useCallback } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };
 
export function CustomNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
 
  return (
    <>
      <Handle type="target" position={Position.Top} />
        <div style={
            {
                backgroundColor: "transparent", 
                strokeWidth: 2,
                border: "2px solid black",
                borderWidth: 2,
                stroke: "green",
                width: 70,
                height: 70,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }
            }>
            <p>{data.label}</p>
        </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}