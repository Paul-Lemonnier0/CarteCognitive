import React, { FC } from 'react'
import { LuText } from "react-icons/lu";
import { BackgroundIcon } from '../../Buttons/IconButtons';

interface CustomZoneIconProps {
    size?: number,
    color?: string,
    isSelected?: boolean,
    isSecondary?: boolean
}

export const CustomZoneIcon: FC<CustomZoneIconProps> = ({size, color, isSecondary, isSelected}) => {  
    return (
        <BackgroundIcon
            Icon={LuText} 
            size={size ?? 25} 
            isSelected={isSelected}
            isSecondary={isSecondary}
            color={color}
            squared
        />
  )
}

