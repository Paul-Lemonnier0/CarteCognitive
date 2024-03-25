import { CSSProperties } from "react"
import theme from "../../constantes/Colors"

export const nodeStyle = (): CSSProperties => {
    const colors = theme.light

    return {
        backgroundColor: colors.NodeColor, 
        strokeWidth: 2,
        border: "2px solid ${colors.NodeColor}",
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