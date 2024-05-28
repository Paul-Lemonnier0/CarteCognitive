import React, { FC } from 'react'
import { baseColors } from '../../../constantes/Colors'
import ColorIcon from '../../Other/ColorIcon'
import './ColorToolBarStyle.css'

interface ColorToolBarProps {
    isVisible: boolean,
    onColorPressed: (color: string) => void,
    selectedColor: string,
    bottom?: boolean
}

const ColorToolBar: FC<ColorToolBarProps> = ({isVisible, bottom, onColorPressed, selectedColor}) => {

    const nbLignes = 2
    const nbColonnes = Math.floor(baseColors.length / nbLignes)

    return (
        <div style={{ 
            position: "absolute",
            display: "grid", 
            gridTemplateColumns: `repeat(${nbColonnes}, 1fr)`, 
            gridTemplateRows: `repeat(${nbLignes}, auto)`, 
            gap: 0, 
            flex: 1,
            top: `${bottom ? "" : "-"} 120% `
        }} className={`customColorToolBar ${isVisible ? '' : 'hidden'}`}>
            {
                baseColors.map(baseColor =>
                    <ColorIcon 
                        grayBorder={baseColor === "white"}
                        key={baseColor} 
                        small 
                        isSelected={baseColor === selectedColor} 
                        color={baseColor} 
                        onPress={() => onColorPressed(baseColor)} 
                    />
                )
            }
        </div>
    )
}

// 

export default ColorToolBar