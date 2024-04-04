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

export const baseColors = [
    "#1f77b4", // Bleu
    "#ff7f0e", // Orange
    "#2ca02c", // Vert
    "#d62728", // Rouge
    "#9467bd", // Violet
    "#8c564b", // Marron
    "#e377c2", // Rose
    "#7f7f7f", // Gris
];
