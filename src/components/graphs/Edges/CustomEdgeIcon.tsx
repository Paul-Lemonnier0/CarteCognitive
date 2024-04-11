import React, { FC } from 'react'
import { RxArrowRight, RxTextAlignCenter } from "react-icons/rx";
import { BackgroundIcon } from '../../Buttons/IconButtons';


export const CustomEdgeIcon = ({size=25,color = "white", isSelected=false}) => {  
    return (
        <BackgroundIcon 
            Icon={RxArrowRight} 
            size={size ?? 25} 
            color={color}
            isSelected={isSelected}
        />
  )
}