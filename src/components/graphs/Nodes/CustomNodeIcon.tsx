import React, { FC } from 'react'
import { RxTextAlignCenter } from "react-icons/rx";

interface CustomNodeIconProps {
    size?: number,
    color?: string,
    isSelected?: boolean
}

export const CustomNodeIcon: FC<CustomNodeIconProps> = ({size, color, isSelected}) => {  
    return (
    <div style={{
        backgroundColor: color ?? "white",
        borderRadius: 500,
        width: size ?? 40,
        aspectRatio: 1/1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: isSelected ? "3px solid black" : undefined
    }}>
        <RxTextAlignCenter size={25}/>
    </div>
  )
}
