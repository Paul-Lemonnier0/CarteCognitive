import React, { FC, ReactNode } from 'react'
import "./CustomCardStyle.css"

interface CustomCardProps {
    children: ReactNode
}

export const CustomCard: FC<CustomCardProps> = ({children}) => {
  return (
    <div className='customCardContainer'>
        {children}
    </div>
  )
}
