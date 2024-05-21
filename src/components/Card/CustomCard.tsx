import React, { FC, ReactNode } from 'react'
import "./CustomCardStyle.css"

interface CustomCardProps {
    children: ReactNode,
    customPadding?: boolean,
    isWhite?: boolean,
    disabled?: boolean
}

export const CustomCard: FC<CustomCardProps> = ({children, customPadding, isWhite, disabled}) => {

  const bgStyle = isWhite ? {backgroundColor: "white"} : undefined

  return (
    <div className={`customCardContainer ${disabled ? 'disabled' : ''}`}
      style={{
        ...bgStyle,
        paddingBlock: customPadding ? 0 : 0, 
        paddingInline: customPadding ? 0 : 10,
        minWidth: 44,
        minHeight: 44,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {children}
    </div>
  )
}
