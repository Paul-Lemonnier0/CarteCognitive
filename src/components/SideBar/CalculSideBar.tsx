import React, { FC, useContext } from "react"
import { GraphContext } from "../../context/GraphContext"
import { IconButton } from "../Buttons/IconButtons"
import { TitleText } from "../Text/CustomText";
import { SlCalculator } from "react-icons/sl";

import "./CalculSideBarStyle.css"
import "./EditSideBarStyle.css"

interface CalculSideBarProps {
    isExpanded: boolean
}

const CalculSideBar: FC<CalculSideBarProps> = ({isExpanded}) => {
    const {} = useContext(GraphContext)
    
    if(!isExpanded) return null

    return (
        <div className={`subSideBarContainer`}>
            <div id="header"> 
                <TitleText text="Calculs" flex/> 
                <IconButton Icon={SlCalculator} onPress={() => {}}/> 
            </div>

            <div id="body">
                
            </div>
        </div>
    )
}

export default CalculSideBar

