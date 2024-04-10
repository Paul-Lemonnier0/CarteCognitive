import React, { FC } from "react";
import "./ColorIconStyle.css"

interface ColorIconProps {
    onPress: () => void,
    color: string,
    isSelected?: boolean,
    small?: boolean
}

const ColorIcon: FC<ColorIconProps> = ({ onPress, small, color = "white" }) => {
    return (
        <div className="customNodeIconContainer" style={{padding: small ? 3 : 5}}>
        <div
            style={{
                backgroundColor: color,
                padding: 1,
                borderRadius: 5,
                height: small ? 12 : 18,
                aspectRatio: 1,
                border: `3px solid black`,
            }}
            onClick={onPress}
        ></div>
        </div>
    );
};

export default ColorIcon