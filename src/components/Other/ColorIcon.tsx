import React, { FC } from "react";
import "./ColorIconStyle.css"

interface ColorIconProps {
    onPress: () => void,
    color: string,
    isSelected?: boolean,
    small?: boolean
}

const ColorIcon: FC<ColorIconProps> = ({ onPress, isSelected, small, color = "white" }) => {
    const borderColor = isSelected ? "black" : color
    const borderWidth = small ? 3 : 4
    return (
        <div className="customNodeIconContainer" style={{padding: small ? 3 : 5}}>
        <div
            style={{
                backgroundColor: color,
                padding: 1,
                borderRadius: 500,
                height: small ? 12 : 18,
                aspectRatio: 1,
                border: `${borderWidth}px solid ${borderColor}`,
            }}
            onClick={onPress}
        ></div>
        </div>
    );
};

export default ColorIcon