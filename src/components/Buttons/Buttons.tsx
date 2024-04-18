import React, { CSSProperties, FC } from 'react'
import './ButtonsStyle.css'
import { NormalText } from '../Text/CustomText'

interface ButtonProps {
    text: string,
    onPress: () => void,
    disabled?: boolean,
    style ? : CSSProperties
}

export const UsualButton: FC<ButtonProps> = ({text, onPress}) => {
  return (
    <button className='usualButton' onClick={() => onPress()}>
        {text}
    </button>
  )
}

export const ValidationButton: FC<ButtonProps> = ({text, onPress, disabled, style}) => {
    return(
        <button style={style} disabled={disabled} className={`validation-button ${disabled ? "disabled" : ""}`} onClick={onPress}>
            <NormalText center bold text={text}/>
        </button>
    )
}