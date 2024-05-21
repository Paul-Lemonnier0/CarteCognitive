import React, { FC, useContext } from "react"
import { GraphCalculType, GraphContext } from "../../context/GraphContext"
import { IconButton } from "../Buttons/IconButtons"
import { NormalText, TitleText } from "../Text/CustomText";

import "./SettingsSideBarStyle.css"
import "./EditSideBarStyle.css"
import { FiSettings } from "react-icons/fi";
import CustomSelect from "../SelectMenu/CustomSelect";
import RadioButton from "../Buttons/RadioButtons";
import { useCalculType } from "../../hooks/useCalculType";

interface SettingsSideBarProps {
    isExpanded: boolean
}

const SettingsSideBar: FC<SettingsSideBarProps> = ({isExpanded}) => {
    const { graphCalculType, propagationValue, agregationValue } = useContext(GraphContext)
    const {changePropagation, changeAgregation} = useCalculType()

    if(!isExpanded) return null

    return (
        <div className={`subSideBarContainer`} style={{ height: "100vh"}}>
            <div id="header"> 
                <TitleText text="Paramètres" flex/> 
                <IconButton Icon={FiSettings}/> 
            </div>

            <div id="body" style={{gap: 40}}>
                <RadioButton.GraphType/>

                {
                    graphCalculType !== GraphCalculType.Symbolic &&                    
                    <div style={{display: "flex", flexDirection: "column", gap: 15}}>
                        <CustomSelect.AggregationPropagation 
                            value={propagationValue} setValue={changePropagation} graphCalculType={graphCalculType}/>
                        
                        <CustomSelect.AggregationPropagation aggregation
                            value={agregationValue} setValue={changeAgregation} 
                            graphCalculType={graphCalculType}/>
                    </div>
                } 
            </div>

            <div id="settingsSideBarFooter" style={{height: 60}}>
                <NormalText error bold text={WARNING_GRAPH_CALCUL_CHANGE_STATEMENT}/>
            </div>
        </div>
    )
}

const WARNING_GRAPH_CALCUL_CHANGE_STATEMENT = "Un changement de type entraîne une réinitilisation irréversible des valeurs des arrêtes"

export default SettingsSideBar

