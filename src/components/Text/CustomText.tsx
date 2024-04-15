import React, { FC } from "react"
import "./CustomTextStyles.css"

interface TextProps {
    text: string,
    wrap?: boolean,
    center?: boolean,
    bold?: boolean,
    flex?: boolean
}

export const SmallText: FC<TextProps> = ({text, wrap, center, bold, flex}) => {
    const classe = "baseText smallText" 
        + (wrap ? " wrap" : "" )
        + (center ? " center" : "" )
        + (bold ? " bold" : "" )
        + (flex ? " flex" : "" )

    return(
        <p className={classe}>{text}</p>
    )
}

export const NormalText: FC<TextProps> = ({text, wrap, center, bold, flex}) => {
    const classe = "baseText normalText" 
        + (wrap ? " wrap" : "" )
        + (center ? " center" : "" )
        + (bold ? " bold" : "" )
        + (flex ? " flex" : "" )

    return(
        <p className={classe}>{text}</p>
    )
}

export const MidText: FC<TextProps> = ({text, wrap, center, bold, flex}) => {
    const classe = "baseText midText" 
        + (wrap ? " wrap" : "" )
        + (center ? " center" : "" )
        + (bold ? " bold" : "" )
        + (flex ? " flex" : "" )

    return(
        <p className={classe}>{text}</p>
    )
}

export const MidTextBold: FC<TextProps> = ({text, wrap, center, bold, flex}) => {
    const classe = "baseText midTextBold" 
        + (wrap ? " wrap" : "" )
        + (center ? " center" : "" )
        + (bold ? " bold" : "" )
        + (flex ? " flex" : "" )

    return(
        <p className={classe}>{text}</p>
    )
}

export const TitleText: FC<TextProps> = ({text, wrap, center, bold, flex}) => {
    const classe = "baseText titleText" 
        + (wrap ? " wrap" : "" )
        + (center ? " center" : "" )
        + (bold ? " bold" : "" )
        + (flex ? " flex" : "" )

    return(
        <p className={classe}>{text}</p>
    )
}