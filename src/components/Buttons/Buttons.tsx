import React, { CSSProperties, FC } from 'react'
import './ButtonsStyle.css'
import { MidText, MidTextBold, NormalText } from '../Text/CustomText'

interface ButtonProps {
    text: string,
    onPress: () => void,
    disabled?: boolean,
    style ? : CSSProperties
    big?: boolean
}

export const UsualButton: FC<ButtonProps> = ({text, onPress}) => {
  return (
    <button className='usualButton' onClick={() => onPress()}>
        {text}
    </button>
  )
}

export const ValidationButton: FC<ButtonProps> = ({text, onPress, disabled, style ,big}) => {
    return(
        <button style={style} disabled={disabled} className={`validation-button ${disabled ? "disabled" : ""}`} onClick={onPress}>
            {
                big ? <MidText bold center text={text} style={{fontSize: 14}}/>
                : <NormalText bold center text={text} style={{fontSize: 14}}/>
            }
        </button>
    )
}