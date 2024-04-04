import React, { FC, ReactElement, ReactNode } from 'react'
import { IoChevronBack } from "react-icons/io5";
import "./IconButtonsStyle.css"
import { IconType } from 'react-icons';

interface IconButtonProps {
    onPress: () => void,
    Icon: IconType
}

export const IconButton: FC<IconButtonProps>  = ({Icon, onPress}) => {
    return (
      <span className='iconButton' onClick={onPress}>
          <span>
              <Icon/>
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
