import React, { FC } from 'react'
import './ButtonsStyle.css'

interface ButtonProps {
    text: string,
    onPress: () => void
}

export const UsualButton: FC<ButtonProps> = ({text, onPress}) => {
  return (
    <button className='usualButton' onClick={() => onPress()}>
        {text}
    </button>
  )
}

export const ValidationButton: FC<ButtonProps> = ({text, onPress}) => {
    return(
        <button className='validation-button' onClick={onPress}>
            {text}
        </button>
    )
}