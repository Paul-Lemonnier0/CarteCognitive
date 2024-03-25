import { useEffect, useState } from "react";
import theme, { ThemeType } from "../constantes/Colors";

export function useThemeColor(isDarkMode: boolean): ThemeType {
    const [colors, setColors] = useState(theme.light)

    useEffect(() => {
        setColors(isDarkMode ? theme.dark : theme.light)
    }, [isDarkMode])

    return colors
}
