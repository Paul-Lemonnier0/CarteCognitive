import React, { FC } from "react";
import "./ColorIconStyle.css"

interface ColorIconProps {
    onPress: () => void,
    color: string,
    isSelected?: boolean,
    small?: boolean,
    grayBorder?: boolean
}

const ColorIcon: FC<ColorIconProps> = ({ onPress, small, isSelected, grayBorder, color = "white" }) => {
    
    const borderStyle = (isSelected || !grayBorder) ? {
        border: `3px solid ${isSelected ? "black" : color}`
    } : undefined
    
    return (
        <div className={`customNodeIconContainer ${grayBorder ? "grayBorder" : ""}`} style={{padding: small ? 3 : 5}}>
            <div
                style={{
                    backgroundColor: color,
                    padding: 1,
                    borderRadius: 5,
                    height: small ? 12 : 18,
                    aspectRatio: 1,
                    ...borderStyle
                }}

                className={`${grayBorder ? "colorIconGrayBorder" : ""}`}
                onClick={onPress}
            />
        </div>
    );
};

export default ColorIcon