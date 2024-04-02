import { CSSProperties } from "react"
import theme from "../../constantes/Colors"

export const nodeStyle = (isSelected: boolean, color = "white"): CSSProperties => {
    const colors = theme.light

    const bgColor = isSelected ? "#000000" : "#ffffff"

    return {
        backgroundColor: color, 
        border: `2px solid ${bgColor}`,
        width: 70,
        height: 70,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
    }
}