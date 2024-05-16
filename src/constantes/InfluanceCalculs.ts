import { Edge } from "reactflow";

export enum SYMBOLIC_SYMBOL {
    PLUS = "+",
    MINUS = "-",
    UNKNOWN =  "?",
}

export enum BOOLEAN_SYMBOL {
    VRAI = "1",
    FAUX = "0"
}

export const SYMBOLIC_TABLE: { [outerKey in SYMBOLIC_SYMBOL]: { [innerKey in SYMBOLIC_SYMBOL]: SYMBOLIC_SYMBOL } } = {
    [SYMBOLIC_SYMBOL.PLUS] : {
        [SYMBOLIC_SYMBOL.PLUS]: SYMBOLIC_SYMBOL.PLUS,
        [SYMBOLIC_SYMBOL.MINUS]: SYMBOLIC_SYMBOL.MINUS,
        [SYMBOLIC_SYMBOL.UNKNOWN]: SYMBOLIC_SYMBOL.UNKNOWN,
    },
    [SYMBOLIC_SYMBOL.MINUS]: {
        [SYMBOLIC_SYMBOL.PLUS]: SYMBOLIC_SYMBOL.MINUS,
        [SYMBOLIC_SYMBOL.MINUS]: SYMBOLIC_SYMBOL.PLUS,
        [SYMBOLIC_SYMBOL.UNKNOWN]: SYMBOLIC_SYMBOL.UNKNOWN,
    },
    [SYMBOLIC_SYMBOL.UNKNOWN]: {
        [SYMBOLIC_SYMBOL.PLUS]: SYMBOLIC_SYMBOL.UNKNOWN,
        [SYMBOLIC_SYMBOL.MINUS]: SYMBOLIC_SYMBOL.UNKNOWN,
        [SYMBOLIC_SYMBOL.UNKNOWN]: SYMBOLIC_SYMBOL.UNKNOWN,
    },
};

export enum PropagationAgretationType {
    ADD = "+",
    SUBSCTRACT = "-",
    MULTIPLY = "*",
    MIN = "min",
    MAX = "max",
    AVG = "moyenne",
    OR = "∧",
    AND = "V"
}

export const getMax = (a: number, b: number): number => {
    return a > b ? a : b
}

export const getMin = (a: number, b: number): number => {
    return a > b ? b : a
}

export const isEdgeLabelNull = (edge: Edge): boolean => {
    if(!edge.data.label || edge.data.label === "") {
        return true
    }

    return false
}

export const calculPropAgreg = (propagation: PropagationAgretationType, previousValue: number, nextValue: number): number => {
    switch (propagation) {
        case PropagationAgretationType.ADD:
            return previousValue + nextValue
        
        case PropagationAgretationType.SUBSCTRACT:
            return previousValue - nextValue
        
        case PropagationAgretationType.AVG:
            return (previousValue + nextValue) / 2
        
        case PropagationAgretationType.MULTIPLY:
            return previousValue * nextValue
        
        case PropagationAgretationType.MIN:
            return getMin(previousValue, nextValue)
        
        case PropagationAgretationType.MAX:
            return getMax(previousValue, nextValue)
    }

    console.log("propa : ", propagation)
    return 0
}

export const calculBoolPropAgreg = (propagation: PropagationAgretationType, val1: boolean, val2: boolean,) => {
    return propagation === PropagationAgretationType.OR ?
            val1 || val2 : val1 && val2
}

export const getIntPathsValue = (paths: Edge[][], propagationValue: PropagationAgretationType, agregrationValue: PropagationAgretationType): number | null => {
    const pathsValues: number[] = []

    for (const path of paths) {
        let currentPathValue = 0
        let isFirstElement = true

        for(const edge of path) {
            if(isEdgeLabelNull(edge)) {
                return null
            }

            const currentEdgeValue = parseFloat(edge.data.label)
            if(isFirstElement) {
                currentPathValue = currentEdgeValue
                isFirstElement = false
            }

            else currentPathValue = calculPropAgreg(propagationValue, currentPathValue, currentEdgeValue)
        }

        pathsValues.push(currentPathValue)
    }

    let finalValue = 0
    pathsValues.forEach((pathVal, index) => {
        if(index === 0) {
            finalValue = pathVal
        }

        else finalValue = calculPropAgreg(agregrationValue, finalValue, pathVal)
    })

    return finalValue
}

export const getSymbolicPathsValue = (paths: Edge[][]): SYMBOLIC_SYMBOL | null => {
    const pathsValues: SYMBOLIC_SYMBOL[] = []

    for (const path of paths) {
        let currentPathValue: SYMBOLIC_SYMBOL = SYMBOLIC_SYMBOL.PLUS
        let isFirstElement = true

        for(const edge of path) {
            if(isEdgeLabelNull(edge)) {
                return null
            }

            const currentEdgeValue = edge.data.label
            if(isFirstElement) {
                currentPathValue = currentEdgeValue as SYMBOLIC_SYMBOL
                isFirstElement = false
            }

            else currentPathValue = SYMBOLIC_TABLE[currentPathValue][edge.data.label as SYMBOLIC_SYMBOL]
        }

        pathsValues.push(currentPathValue)
    }

    let finalValue: SYMBOLIC_SYMBOL = SYMBOLIC_SYMBOL.PLUS
    pathsValues.forEach((pathVal, index) => {
        if(index === 0) {
            finalValue = pathVal
        }

        else finalValue = SYMBOLIC_TABLE[finalValue][pathVal]
    })

    return finalValue
}

export const getBooleanPathsValue = (paths: Edge[][], propagationValue: PropagationAgretationType, agregrationValue: PropagationAgretationType): boolean | null => {
    const pathsValues: boolean[] = []

    for (const path of paths) {
        let currentPathValue = false
        let isFirstElement = true

        for(const edge of path) {
            if(isEdgeLabelNull(edge)) {
                return null
            }

            const currentEdgeValue = edge.data.label === BOOLEAN_SYMBOL.VRAI ? true : false

            if(isFirstElement) {
                currentPathValue = currentEdgeValue
                isFirstElement = false
            }

            else currentPathValue = calculBoolPropAgreg(propagationValue, currentPathValue, currentEdgeValue)
        }

        pathsValues.push(currentPathValue)
    }

    let finalValue = false
    pathsValues.forEach((pathVal, index) => {
        if(index === 0) {
            finalValue = pathVal
        }

        else finalValue = calculBoolPropAgreg(agregrationValue, finalValue, pathVal)
    })

    return finalValue
}