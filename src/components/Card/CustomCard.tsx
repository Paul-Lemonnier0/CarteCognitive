import React, { FC, ReactNode } from 'react'
import "./CustomCardStyle.css"

interface CustomCardProps {
    children: ReactNode,
    customPadding?: boolean,
    isWhite?: boolean
}

export const CustomCard: FC<CustomCardProps> = ({children, customPadding, isWhite}) => {

  const bgStyle = isWhite ? {backgroundColor: "white"} : undefined

  return (
    <div className='customCardContainer' 
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
