import React, { FC } from 'react'
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
            isSelected={isSelected}
            squared
        />
  )
}

