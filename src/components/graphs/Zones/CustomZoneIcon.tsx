import React, { FC } from 'react'
import { FaGripLines } from "react-icons/fa";
import { LuText } from "react-icons/lu";
import { BackgroundIcon } from '../../Buttons/IconButtons';

interface CustomZoneIconProps {
    size?: number,
    color?: string,
    isSelected?: boolean
}

export const CustomZoneIcon: FC<CustomZoneIconProps> = ({size, color, isSelected}) => {  
    return (
        <BackgroundIcon
            Icon={LuText} 
            size={size ?? 25} 
            color={color ?? "white"}
            isSelected={isSelected}
            squared
        />
  )
}
