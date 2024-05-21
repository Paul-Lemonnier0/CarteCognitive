import React, { CSSProperties, FC } from "react"
import "./CustomTextStyles.css"

interface TextProps {
    text: string,
    wrap?: boolean,
    center?: boolean,
    bold?: boolean,
    flex?: boolean,
    color?: string,
    gray?: boolean,
    style?: CSSProperties,
    error?: boolean
}

export const SmallText: FC<TextProps> = ({text, wrap, center, bold, flex, color, gray, error}) => {
    const classe = "baseText smallText" 
        + (wrap ? " wrap" : "" )
        + (center ? " center" : "" )
        + (bold ? " bold" : "" )
        + (flex ? " flex" : "" )        
        + (error ? " error" : "" )
        + (gray ? " gray" : "" )

    return(
        <p className={classe} style={{color: color}}>{text}</p>
    )
}

export const NormalText: FC<TextProps> = ({text, wrap, center, bold, flex, color, gray, error}) => {
    const classe = "baseText normalText" 
        + (wrap ? " wrap" : "" )
        + (center ? " center" : "" )
        + (bold ? " bold" : "" )
        + (flex ? " flex" : "" )        
        + (error ? " error" : "" )
        + (gray ? " gray" : "" )

    return(
        <p className={classe} style={{color: color}}>{text}</p>
    )
}

export const MidText: FC<TextProps> = ({text, wrap, center, bold, flex, color, gray, error}) => {
    const classe = "baseText midText" 
        + (wrap ? " wrap" : "" )
        + (center ? " center" : "" )
        + (bold ? " bold" : "" )
        + (flex ? " flex" : "" )        
        + (error ? " error" : "" )
        + (gray ? " gray" : "" )

    return(
        <p className={classe} style={{color: color}}>{text}</p>
    )
}

export const MidTextBold: FC<TextProps> = ({text, wrap, center, bold, flex, color, gray, error}) => {
    const classe = "baseText midTextBold" 
        + (wrap ? " wrap" : "" )
        + (center ? " center" : "" )
        + (bold ? " bold" : "" )
        + (flex ? " flex" : "" )        
        + (error ? " error" : "" )
        + (gray ? " gray" : "" )

    return(
        <p className={classe} style={{color: color}}>{text}</p>
    )
}

export const TitleText: FC<TextProps> = ({text, wrap, center, bold, flex, color, gray, error, style}) => {
    const classe = "baseText titleText" 
        + (wrap ? " wrap" : "" )
        + (center ? " center" : "" )
        + (bold ? " bold" : "" )
        + (flex ? " flex" : "" )        
        + (error ? " error" : "" )
        + (gray ? " gray" : "" )

    return(
        <p className={classe} style={style? style :{color: color}}>{text}</p>
    )
}

export const HugeText: FC<TextProps> = ({text, wrap, center, bold, flex, color, gray, error, style}) => {
    const classe = "baseText hugeText" 
        + (wrap ? " wrap" : "" )
        + (center ? " center" : "" )
        + (bold ? " bold" : "" )
        + (error ? " error" : "" )        
        + (flex ? " flex" : "" )

    return(
        <p className={classe} style={style? style :{color: color}}>{text}</p>
    )
}