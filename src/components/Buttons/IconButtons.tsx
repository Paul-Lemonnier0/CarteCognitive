import React, { FC, ReactElement, ReactNode } from 'react'
import { IoChevronBack } from "react-icons/io5";
import "./IconButtonsStyle.css"
import { IconType } from 'react-icons';
import { BiColorFill } from 'react-icons/bi';

interface IconButtonProps {
    onPress: () => void,
    Icon?: IconType
    children?: ReactNode
}

export const IconButton: FC<IconButtonProps>  = ({Icon, children, onPress}) => {
    return (
      <span className='iconButton' onClick={onPress}>
          <span>
              { Icon &&
                <Icon/>
              }

              {children ?? undefined}
              
          </span>
      </span>
    )
}

interface PremadeButtonProps {
    onPress: () => void,
}

export const GoBackButton: FC<PremadeButtonProps>  = ({onPress}) => {
  return (
    <IconButton onPress={onPress} Icon={IoChevronBack}/>
  )
}

interface BackgroundIconProps {
  squared?: boolean,
  color?: string,
  selectedBorderColor?: string,
  size?: number,
  isSelected?: boolean,
  Icon: IconType,

}

export const BackgroundIcon: FC<BackgroundIconProps> = ({
  Icon, 
  color, 
  selectedBorderColor,
  size, 
  isSelected,
  squared
}) => {
  return(
    <div style={{
        backgroundColor: color ?? "#ebedee",
        width: size ?? 40,
        padding: 10,
        borderRadius: squared ? 8 : 500,
        aspectRatio: 1/1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: isSelected ? `3px solid ${selectedBorderColor ?? "black"}` : `3px solid ${color}`
      }}>
        <Icon size={25}/>
    </div>
  )
}
