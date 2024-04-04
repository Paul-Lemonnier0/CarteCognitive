import React, { FC } from 'react'
import { FaGripLines } from "react-icons/fa";
import { LuText } from "react-icons/lu";

interface CustomZoneIconProps {
    size?: number,
    color?: string,
    isSelected?: boolean
}

export const CustomZoneIcon: FC<CustomZoneIconProps> = ({size, color, isSelected}) => {  
    return (
        <div style={{
            backgroundColor: color ?? "white",
            borderRadius: 8,
            width: size ?? 40,
            aspectRatio: 1/1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: isSelected ? "3px solid black" : undefined
        }}>
            <LuText size={25}/>
        </div>
  )
}
