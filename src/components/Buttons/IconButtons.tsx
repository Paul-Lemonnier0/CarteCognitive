import React, { FC, ReactNode } from 'react'
import { IoChevronBack } from "react-icons/io5";
import "./IconButtonsStyle.css"
import { IconType } from 'react-icons';

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
  hiddenIcon?: boolean,
  iconHover?: boolean
}

export const BackgroundIcon: FC<BackgroundIconProps> = ({
  Icon, 
  color, 
  selectedBorderColor,
  size, 
  isSelected,
  squared,
  hiddenIcon,
  iconHover
}) => {
  return(
    <div style={{
        backgroundColor: color ?? "#ebedee",
        width: size ?? 40,
        padding: 10,
        borderRadius: squared ? 10 : 500,
        aspectRatio: 1/1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: isSelected ? `3px solid ${selectedBorderColor ?? "black"}` : `3px solid ${color ?? "#ebedee"}`
      }}>
        <div style={{display: "flex"}} className={iconHover ? "iconHover" : ""}>
          <Icon size={25} color={hiddenIcon ? "transparent" : "black"}/>
        </div>
    </div>
  )
}
