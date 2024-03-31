export interface ThemeType {
    NodeColor: string,
    SelectedNodeColor: string,
    NodeBorderColor: string,
    SelectedNodeBorderColor: string,
    EdgeColor: string,
    Primary: string,
    Secondary: string,
    Font: string,
    NodeFont: string,
}

export interface ThemeObjectType {
    light: ThemeType,
    dark: ThemeType
}

const theme: ThemeObjectType = {
    light: {
        NodeColor: "rgba(0, 0, 0, 0.35)",
        NodeBorderColor: "#12161b",
        SelectedNodeColor: "#000000",
        SelectedNodeBorderColor: "#000000",
        EdgeColor: "#000000",
        Primary: "#FFFFFF",
        Secondary: "#39434f",
        Font: "#000000",
        NodeFont: "#FFFFFF",
    },

    dark: {
        NodeColor: "rgba(0, 0, 0, 0.35)",
        NodeBorderColor: "#12161b",
        SelectedNodeColor: "#000000",
        SelectedNodeBorderColor: "#000000",
        EdgeColor: "#000000",
        Primary: "#202938",
        Secondary: "#39434f",
        Font: "#000000",
        NodeFont: "#FFFFFF",
    }
}

export default theme