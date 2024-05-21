import React, { FC } from 'react'
import { RxArrowRight, RxTextAlignCenter } from "react-icons/rx";
import { BackgroundIcon } from '../../Buttons/IconButtons';

interface CustomEdgeIconProps {
    color?: string,
    size?: number,
    isSelected?: boolean,
}

export const CustomEdgeIcon: FC<CustomEdgeIconProps> = ({color, size=25, isSelected=false}) => {  
    return (
        <BackgroundIcon 
            Icon={RxArrowRight} 
            size={size ?? 25} 
            color={color}
            isSelected={isSelected}
        />
  )
}