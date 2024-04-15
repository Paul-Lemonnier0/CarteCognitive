import React, { FC, useContext } from "react"
import { GraphContext } from "../../context/GraphContext"
import { IconButton } from "../Buttons/IconButtons"
import { MidTextBold, NormalText, TitleText } from "../Text/CustomText";
import { SlCalculator } from "react-icons/sl";

import "./CalculSideBarStyle.css"
import "./EditSideBarStyle.css"
import { ValidationButton } from "../Buttons/Buttons";
import CustomNodeListItem from "../graphs/Nodes/CustomNodeListItem";

interface CalculSideBarProps {
    isExpanded: boolean
}

const CalculSideBar: FC<CalculSideBarProps> = ({isExpanded}) => {
    const {influancePath, setInfluancePath, getNodeWithID} = useContext(GraphContext)
    
    if(!isExpanded) return null

    const sourceNode = (influancePath && influancePath?.sourceID) ? getNodeWithID(influancePath?.sourceID) : null
    const targetNode = (influancePath && influancePath?.targetID) ? getNodeWithID(influancePath?.targetID) : null

    const handleCalculate = () => {

    }

    return (
        <div className={`subSideBarContainer`}>
            <div id="header"> 
                <TitleText text="Calculs" flex/> 
                <IconButton Icon={SlCalculator} onPress={() => {}}/> 
            </div>

            <div id="body">
                {
                    sourceNode && 
                    <div style={{flexDirection: "column", display: "flex"}}>
                        <MidTextBold bold text="Source"/>
                        <CustomNodeListItem
                        isVisible
                        node={sourceNode}
                        onPress={() => {}}
                        isSelected={true} />
                    </div>
                }
                {
                    targetNode && 
                    <div style={{flexDirection: "column", display: "flex"}}>
                        <MidTextBold bold text="Cible"/>
                        <CustomNodeListItem
                        isVisible
                        node={targetNode}
                        onPress={() => {}}
                        isSelected={true} />
                    </div>
                }

                <ValidationButton
                    disabled={!sourceNode || !targetNode}
                    text="Calculer" 
                    onPress={handleCalculate}
                />
            </div>
        </div>
    )
}

export default CalculSideBar

