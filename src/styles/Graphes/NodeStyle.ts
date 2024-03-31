import { CSSProperties } from "react"
import theme from "../../constantes/Colors"

export const nodeStyle = (isSelected: boolean): CSSProperties => {
    const colors = theme.light

    const bgColor = isSelected ? "#444c57" : "#eff0f4"

    return {
        backgroundColor: "#ffffff", 
        border: `2px solid ${bgColor}`,
        width: 70,
        height: 70,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none"
    }
}