export interface RGBtype {
    r: number,
    g: number,
    b: number,
  }

export interface RGBAtype extends RGBtype {
    a: number
  }

export function hexToRgba(hex: string, opacity: number): RGBAtype | null {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: opacity ?? 1
    } : null;
}

export const getStringRGBAFromHexa = (hex: string, opacity: number): string => {
    const rgba = hexToRgba(hex, opacity)

    return rgba ? "rgba(" + 
    rgba.r + "," +
    rgba.g + "," +
    rgba.b + "," +
    rgba.a + ")" : "rgba(256,256,256," + opacity + ")"
}

export const getStringRGBFromHexa = (hex: string, opacity: number): string => {
    const rgba = hexToRgba(hex, opacity)

    return rgba ? "rgb(" + 
    rgba.r + "," +
    rgba.g + "," +
    rgba.b + ")" : "rgba(256,256,256)"
}

