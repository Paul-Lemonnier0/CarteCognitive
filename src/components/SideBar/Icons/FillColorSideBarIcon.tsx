import React, { FC } from 'react'
import { BiColorFill } from "react-icons/bi";

interface FillColorSideBarIconProps {
  size?: number,
  color?: string,
  isSelected?: boolean
}

export const FillColorSideBarIcon: FC<FillColorSideBarIconProps> = ({size, color, isSelected}) => {  
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
        <BiColorFill size={25}/>
    </div>
  )
}
