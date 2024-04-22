import React, { FC, MouseEvent, ReactNode } from 'react'
import { IoChevronBack } from "react-icons/io5";
import "./IconButtonsStyle.css"
import { IconType } from 'react-icons';
import { FaCheck } from "react-icons/fa6";
import { MidText, NormalText, SmallText } from '../Text/CustomText';

interface IconButtonProps {
    onPress: () => void,
    Icon?: IconType,
    isSelected?: boolean,
    children?: ReactNode,
    small?: boolean,
    secondary?: boolean,
    stopPropagation?: boolean,
    color?: string
}

export const IconButton: FC<IconButtonProps>  = ({
  Icon, 
  children, 
  onPress, 
  isSelected, 
  small, 
  secondary,
  stopPropagation,
  color
}) => {
    return (
        <span className='iconButton' style={{
          border: `2px solid ${(isSelected || secondary) ? "#313443" : "transparent"}`,
          backgroundColor: (isSelected || secondary) ? "#313443" : "white"
          }} onClick={(e: MouseEvent<HTMLSpanElement> ) => {
            if(stopPropagation) {
              e.stopPropagation()
            }
            onPress()
          } }>
            <span>
                { Icon &&
                  <Icon size={small ? 15 : 20} color={(isSelected || secondary) ? "white" : (color ?? "black")}/>
                }

                {children ?? undefined}
                
            </span>

        </span>
    )
}

interface IconTextProps {
  Icon: IconType,
  text: string,
  secondary?: boolean
}

export const IconText: FC<IconTextProps> = ({Icon, text, secondary}) => {
  return(
    <span className='iconButton' style={{
      border: `2px solid "transparent"`,
      backgroundColor: secondary ? "#313443" : "white"
      }}>
        <span style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 10}}>
            { Icon &&
              <Icon size={20} color={secondary ? 'white' : "black"}/>
            }
            <NormalText text={text} bold color={secondary ? 'white' : "black"}/>            
        </span>
    </span>
  )
}

interface PremadeButtonProps {
    onPress: () => void,
    small?: boolean
}

export const GoBackButton: FC<PremadeButtonProps>  = ({onPress, small}) => {
  return (
    <IconButton onPress={onPress} Icon={IoChevronBack} small={small}/>
  )
}

export const CheckButton: FC<PremadeButtonProps>  = ({onPress, small}) => {
  return (
    <IconButton onPress={onPress} Icon={FaCheck} small={small}/>
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

interface IconTextButtonProps extends IconButtonProps {
  text: string
}

export const IconTextButton: FC<IconTextButtonProps> = ({
  Icon, 
  children, 
  onPress, 
  isSelected, 
  small, 
  secondary,
  stopPropagation,
  text
}) => {
  return(
    <span className='iconTextButton' style={{
      border: `2px solid ${(isSelected || secondary) ? "#313443" : "transparent"}`,
      backgroundColor: (isSelected || secondary) ? "#313443" : "white",
      flex: 1,
      }} onClick={(e: MouseEvent<HTMLSpanElement> ) => {
        if(stopPropagation) {
          e.stopPropagation()
        }
        onPress()
      } }>
        <span style={{display: "flex", flexDirection: "row", gap: 25}}>
            { Icon &&
              <Icon size={small ? 15 : 20} color={(isSelected || secondary) ? "white" : "black"}/>
            }

            <MidText text={text} bold color={isSelected ? "white" : "black"}/>

            {children ?? undefined}
            
        </span>

    </span>
  )
} 
