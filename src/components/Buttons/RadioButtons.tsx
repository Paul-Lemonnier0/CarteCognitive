import React, { Dispatch, FC, useContext } from 'react'
import { MidTextBold } from '../Text/CustomText'
import "./RadioButtonsStyle.css"
import { GraphCalculType, GraphContext } from '../../context/GraphContext'
import { useCalculType } from '../../hooks/useCalculType'



type RadioButtonProps<T> = {
    value: T,
    label: string,
    isChecked: boolean,
    onPress: (value: T) => void,
    index: number,
    name?: string
}

const RadioButton = <T,>({ value, label, isChecked, onPress, index, name }: RadioButtonProps<T>) => {
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
        onPress(e.target.value as T)
    }
    
    return (
        <div style={{    
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10
        }}>
            <input 
                value={value as any}
                checked={isChecked}
                onChange={handleOnChange} 
                className="customRadioButton" 
                id={"radio-" + index}
                name={name ?? "radio"}
                type="radio"
            />
            <MidTextBold text={label}/>
        </div>
    )
}

interface GRAPH_TYPE_ITEM {
    value: GraphCalculType,
    label: string
}

export const GRAPH_TYPES_ARRAY: GRAPH_TYPE_ITEM[] = [
    {
        value: GraphCalculType.Integer,
        label: "Entier"
    },
    {
        value: GraphCalculType.Boolean,
        label: "Booléen"
    },
    {
        value: GraphCalculType.Symbolic,
        label: "Symbolique"
    }
]

interface GraphTypeRadioButtonsProps {
    handleSetGraphCalculType?: Dispatch<GraphCalculType>,
    customGraphCalculType?: GraphCalculType
}

const GraphTypeRadioButtons: FC<GraphTypeRadioButtonsProps> = ({customGraphCalculType, handleSetGraphCalculType}) => {

    const {graphCalculType} = useContext(GraphContext)
    const {changeCalculType} = useCalculType(handleSetGraphCalculType)

    const isChecked = (val: GraphCalculType) => {
        if(customGraphCalculType) return customGraphCalculType === val
        return graphCalculType === val
    }

    return (
        <div className="settingsSideBarBody">
            {
                GRAPH_TYPES_ARRAY.map((calculType, index) => (
                    <RadioButton
                        {...calculType}
                        onPress={changeCalculType}
                        isChecked={isChecked(calculType.value)}
                        index={index}
                    />
                ))
            }
        </div>
    )
}

RadioButton.GraphType = GraphTypeRadioButtons;


export default RadioButton