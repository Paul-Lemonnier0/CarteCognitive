import React, { FC } from 'react'
import { MidTextBold, NormalText, TitleText } from '../Text/CustomText'
import "./ProfilButtonStyle.css"

interface ProfilButtonProps {
    name: string,
    onClick? : ()=>void,
}

const ProfilButton: FC<ProfilButtonProps> = ({name, onClick}) => {
  return (
    <div onClick={onClick} className='profilButton'>
        <NormalText bold color='white' text={name.substring(0,1).toUpperCase()}/>
    </div>
  )
}

export default ProfilButton