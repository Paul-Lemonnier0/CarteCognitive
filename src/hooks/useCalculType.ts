import { Dispatch, useContext } from "react"
import { GraphCalculType, GraphContext } from "../context/GraphContext"
import { PropagationAgretationType } from "../constantes/InfluanceCalculs"

export const useCalculType = (
    handleSetGraphCalculType?: Dispatch<GraphCalculType>,
    handleSetAggregation?: Dispatch<PropagationAgretationType>,
    handleSetPropagation?: Dispatch<PropagationAgretationType>
) => {
    const {handleChangeCalculType, setAgregationValue, setPropagationValue, setResultAgregation} = useContext(GraphContext)

    const changeCalculType = (calculType: GraphCalculType) => {   
        let calculTypeTemp = GraphCalculType.Integer
        let propagationTemp = PropagationAgretationType.AND
        let aggragationTemp = PropagationAgretationType.AND

        setResultAgregation && setResultAgregation("")     
        switch(calculType) {
            case GraphCalculType.Boolean:
                calculTypeTemp = GraphCalculType.Boolean
                
                break;
            case GraphCalculType.Symbolic:
                calculTypeTemp = GraphCalculType.Symbolic 
                break;
            default:
                propagationTemp = PropagationAgretationType.MIN
                aggragationTemp = PropagationAgretationType.MAX
                break;
        } 

        handleSetGraphCalculType ? handleSetGraphCalculType(calculTypeTemp) : handleChangeCalculType(calculTypeTemp)
        handleSetAggregation ? handleSetAggregation(aggragationTemp) : setAgregationValue(aggragationTemp)
        handleSetPropagation ? handleSetPropagation(propagationTemp) : setPropagationValue(propagationTemp)
    }

    const changePropagation = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(handleSetPropagation) {
            handleSetPropagation(e.target.value as PropagationAgretationType)
        }
        
        else {
            setPropagationValue(e.target.value as PropagationAgretationType)
            setResultAgregation("")
        }
    }
    const changeAgregation = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(handleSetAggregation) {
            handleSetAggregation(e.target.value as PropagationAgretationType)
        }
        
        else {
            setAgregationValue(e.target.value as PropagationAgretationType)
            setResultAgregation("")
        }
    }

    return {changeCalculType, changePropagation, changeAgregation}
}