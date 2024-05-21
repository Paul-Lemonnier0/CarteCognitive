import React, { FC } from 'react'
import { RxTextAlignCenter } from "react-icons/rx";
import { BackgroundIcon } from '../../Buttons/IconButtons';

interface CustomNodeIconProps {
    size?: number,
    color?: string,
    isSelected?: boolean,
    isPrimary?: boolean
}

export const CustomNodeIcon: FC<CustomNodeIconProps> = ({size, color, isSelected, isPrimary}) => {
    
    return (
        <BackgroundIcon 
            Icon={RxTextAlignCenter} 
            size={size ?? 25} 
            isSelected={isSelected}
            isPrimary={isPrimary}
        />
  )
}
