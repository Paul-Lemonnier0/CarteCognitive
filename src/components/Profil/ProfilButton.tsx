import React, { FC } from 'react'
import { MidTextBold, NormalText, TitleText } from '../Text/CustomText'

interface ProfilButtonProps {
    name: string
}

const ProfilButton: FC<ProfilButtonProps> = ({name}) => {
  return (
    <div style={{
        borderRadius: 500,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        display: "flex",
        padding: 10, 
        aspectRatio: 1,
        backgroundColor: "#313443",
    }}>
        <NormalText bold color='white' text={name.substring(0,1)}/>
    </div>
  )
}

export default ProfilButton