export interface ThemeType {
    NodeColor: string,
    NodeBorderColor: string,
    EdgeColor: string,
    Primary: string,
    Secondary: string,
}

export interface ThemeObjectType {
    light: ThemeType,
    dark: ThemeType
}

const theme: ThemeObjectType = {
    light: {
        NodeColor: "#f8b13f",
        NodeBorderColor: "#f8b13f",
        EdgeColor: "##E5E9EC",
        Primary: "#202938",
        Secondary: "#39434f"
    },

    dark: {
        NodeColor: "#f8b13f",
        NodeBorderColor: "#f8b13f",
        EdgeColor: "##E5E9EC",
        Primary: "#202938",
        Secondary: "#39434f"
    }
}

export default theme