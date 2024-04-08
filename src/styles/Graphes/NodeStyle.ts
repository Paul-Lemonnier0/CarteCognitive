import { CSSProperties } from "react"
import theme from "../../constantes/Colors"

export const nodeStyle = (isSelected: boolean, color = "white"): CSSProperties => {

    return {
        backgroundColor: color, 
        width: 70,
        height: 70,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
    }
}

