import React, { FC, MouseEvent, ReactNode } from 'react'
import { IoChevronBack } from "react-icons/io5";
import "./IconButtonsStyle.css"
import { IconType } from 'react-icons';
import { FaCheck } from "react-icons/fa6";
import { MidText, NormalText } from '../Text/CustomText';

interface IconButtonProps {
    onPress: () => void,
    Icon?: IconType,
    isSelected?: boolean,
    children?: ReactNode,
    small?: boolean,
    secondary?: boolean,
    contrast?: boolean,
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
  color,
  contrast
}) => {

    const handleClick = (e: MouseEvent<HTMLSpanElement> ) => {
      if(stopPropagation) {
        e.stopPropagation()
      }
      onPress()
    } 

    return (
        <span 
            className={`iconButton ${(isSelected || contrast) ? 'selected' :''} `}
            onClick={handleClick}>
            <span>
                { Icon &&
                  <Icon size={small ? 15 : 20} color={(isSelected || secondary || contrast) ? "white" : (color ?? "black")}/>
                }

                {children ?? undefined}
                
            </span>

        </span>
    )
}

interface IconTextProps {
  Icon: IconType,
  text: string,
  contrast?: boolean,
}

export const IconText: FC<IconTextProps> = ({Icon, text, contrast}) => {
  return(
    <span className={`iconButton ${contrast ? 'selected' :''} `}>
        <span style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 10}}>
            { Icon &&
              <Icon size={20} color={contrast ? 'white' : "black"}/>
            }
            <NormalText text={text} bold color={contrast ? 'white' : "black"}/>            
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
  iconHover?: boolean,
  isPrimary?: boolean
}

export const BackgroundIcon: FC<BackgroundIconProps> = ({
  Icon, 
  color, 
  selectedBorderColor,
  size, 
  isSelected,
  squared,
  hiddenIcon,
  iconHover,
  isPrimary
}) => {

  const bgColorStyle = color ? {backgroundColor: color, borderColor: color} : undefined
  const selectedStyle = isSelected ? {borderColor: selectedBorderColor ?? "black"} : undefined

  return(
    <div className='backgroundButtonContainer' style={{
        ...bgColorStyle,
        ...selectedStyle,
        width: size ?? 40,
        padding: 10,
        borderRadius: squared ? 10 : 500,
        aspectRatio: 1/1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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

  const handleOnClick = (e: MouseEvent<HTMLSpanElement> ) => {
    if(stopPropagation) {
      e.stopPropagation()
    }
    onPress()
  } 

  return(
    <span className={`iconTextButton ${isSelected ? 'selected' :''} `}
      onClick={handleOnClick}>
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
