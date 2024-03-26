import { CSSProperties } from "react"
import theme from "../../constantes/Colors"

export const nodeStyle = (isSelected: boolean): CSSProperties => {
    const colors = theme.light

    const bgColor = isSelected ? colors.SelectedNodeColor : colors.NodeColor

    return {
        backgroundColor: bgColor, 
        strokeWidth: 2,
        border: "2px solid ${bgColor}",
        borderWidth: 2,
        stroke: "green",
        width: 70,
        height: 70,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}