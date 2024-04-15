import React, { FC } from 'react'
import './ButtonsStyle.css'
import { NormalText } from '../Text/CustomText'

interface ButtonProps {
    text: string,
    onPress: () => void,
    disabled?: boolean
}

export const UsualButton: FC<ButtonProps> = ({text, onPress}) => {
  return (
    <button className='usualButton' onClick={() => onPress()}>
        {text}
    </button>
  )
}

export const ValidationButton: FC<ButtonProps> = ({text, onPress, disabled}) => {
    return(
        <button disabled={disabled} className={`validation-button ${disabled ? "disabled" : ""}`} onClick={onPress}>
            <NormalText center bold text={text}/>
        </button>
    )
}