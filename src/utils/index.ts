// Group by function
// Object.groupBy works in this version of Node.js (21.6.1) but this typescript version doesn't recognize it
export const groupBy = (x: any[], f: (arg: any) => any): Record<string, any[]> =>
    x.reduce((a, b) => {
        (a[f(b)] ||= []).push(b)
        return a
    }, {})

// Hexa to ARGB
// Example: #FF0000 -> 'FFFF0000'
export const hexaToArgb = (hexa: string = '#FF0000'): string => hexa.slice(1).padStart(8, 'F')