import React, { FC } from 'react'
import './ButtonsStyle.css'

interface ButtonProps {
    content: string,
    onClick: () => void
}

export const UsualButton: FC<ButtonProps> = ({content, onClick}) => {
  return (
    <button className='usualButton' onClick={() => onClick()}>
        {content}
    </button>
  )
}

export const ValidationButton: FC<ButtonProps> = ({content, onClick}) => {
    return(
        <button className='validation-button' onClick={onClick}>
            {content}
        </button>
    )
}