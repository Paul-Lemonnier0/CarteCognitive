import React, { FC } from 'react'

interface CustomEdgeLabelProps {
    label: string,
    labelX: number,
    labelY: number,
}

const CustomEdgeLabel: FC<CustomEdgeLabelProps> = ({label, labelX, labelY}) => {
  return (
    <div
        style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX+10}px,${labelY+10}px)`,
            // border: "2px solid #b1b1b7",
            // backgroundColor: "white",
            paddingLeft: 12,
            paddingRight: 12,
            paddingBottom: 8,
            paddingTop: 8,
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 700,
        }}      
        className="nodrag nopan"
    >
    {label}
  </div>
  )
}

export default CustomEdgeLabel