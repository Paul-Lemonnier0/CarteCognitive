import React, { FC, ReactNode } from 'react'
import "./CustomCardStyle.css"

interface CustomCardProps {
    children: ReactNode,
    customPadding?: boolean
}

export const CustomCard: FC<CustomCardProps> = ({children, customPadding}) => {
  return (
    <div className='customCardContainer' 
      style={{
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
