import React, { FC, useContext, useState } from "react"
import { GraphCalculType, GraphContext } from "../../context/GraphContext"
import { IconButton } from "../Buttons/IconButtons"
import { MidTextBold, NormalText, TitleText } from "../Text/CustomText";
import { CustomCard } from "../Card/CustomCard";

import "./SettingsSideBarStyle.css"
import "./EditSideBarStyle.css"
import { FiAlertTriangle, FiSettings } from "react-icons/fi";

interface SettingsSideBarProps {
    isExpanded: boolean
}

const SettingsSideBar: FC<SettingsSideBarProps> = ({isExpanded}) => {
    const {handleChangeCalculType, graphCalculType, setAgregationValue, setPropagationValue, propagationValue, agregationValue} = useContext(GraphContext)
    
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {        
        switch(e.target.value) {
            case GraphCalculType.Boolean:
                handleChangeCalculType(GraphCalculType.Boolean)
                setPropagationValue("∧")
                setAgregationValue("∧")
                break;
            case GraphCalculType.Symbolic:
                handleChangeCalculType(GraphCalculType.Symbolic)
                setPropagationValue("∧")
                setAgregationValue("∧")
                break;
            default:
                handleChangeCalculType(GraphCalculType.Integer)
                setPropagationValue("min")
                setAgregationValue("max")
                break;
        } 
    }

    const isChecked = (val: GraphCalculType) => {
        return graphCalculType === val
    }

    const changePropagation = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPropagationValue(e.target.value)
    }
    const changeAgregation = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAgregationValue(e.target.value)
    }

    if(!isExpanded) return null

    return (
        <div className={`subSideBarContainer`} style={{ height: "100vh"}}>
            <div id="header"> 
                <TitleText text="Settings" flex/> 
                <IconButton Icon={FiSettings} onPress={() => {}}/> 
            </div>

            <div id="body">
                <div className="settingsSideBarBody">
                    <div className="settingsSideBarRadio">
                        <input 
                            value={GraphCalculType.Integer}
                            checked={isChecked(GraphCalculType.Integer)}
                            onChange={handleOnChange} 
                            className="customRadioButton" 
                            id="radio-1" 
                            name="radio" 
                            type="radio"
                        />
                        <MidTextBold text="Entier"/>
                    </div>

                    <div className="settingsSideBarRadio">
                        <input
                            value={GraphCalculType.Symbolic}
                            checked={isChecked(GraphCalculType.Symbolic)}
                            onChange={handleOnChange} 
                            className="customRadioButton" 
                            id="radio-2" 
                            name="radio" 
                            type="radio"
                        />
                        <MidTextBold text="Symbolique"/>
                    </div>

                    <div className="settingsSideBarRadio">
                        <input 
                            value={GraphCalculType.Boolean}
                            checked={isChecked(GraphCalculType.Boolean)}
                            onChange={handleOnChange} 
                            className="customRadioButton" 
                            id="radio-3" 
                            name="radio" 
                            type="radio"
                        />
                        <MidTextBold text="Booléen"/>
                    </div>
                </div>
            </div>

            <div id="SelectedCalculWay">
                <div id="SelectPropagation">
                    <MidTextBold text="Propagation" />
                    <CustomCard customPadding>
                        <select name="PropagationVal" id="edgeBoolVals" value={propagationValue} onChange={changePropagation}>
                            
                            {
                                graphCalculType==="Integer" ? 
                                <>
                                    <option value="min">min</option>
                                    <option value="max">max</option>
                                    <option value="*">*</option>
                                    <option value="+">+</option>
                                    <option value="moyenne">moyenne</option>
                                </>
                                : 
                                <>
                                    <option value="∧">∧</option>
                                    <option value="V">V</option>
                                </>

                            }
                        
                            
                        </select>
                    </CustomCard>
                </div>
                <div id="SelectAgregation">
                    <MidTextBold text="Agregation" />
                    <CustomCard customPadding >
                        <select name="AgregationVal" id="edgeBoolVals" value={agregationValue}onChange={changeAgregation}>
                            
                            {
                                graphCalculType==="Integer" ? 
                                <>
                                    <option value="min">min</option>
                                    <option value="max">max</option>
                                    <option value="*">*</option>
                                    <option value="+">+</option>
                                    <option value="moyenne">moyenne</option>
                                </>
                                : 
                                <>
                                    <option value="∧" >∧</option>
                                    <option value="V">V</option>
                                </>

                            }
                        </select>
                    </CustomCard>
                </div>
            </div>

            <div id="settingsSideBarFooter" style={{height: 60}}>
                <FiAlertTriangle size={65} color="#D44C47"/>
                <NormalText color="#D44C47" bold text="Un changement de type entraîne une réinitilisation irréversible des valeurs des arrêtes"/>
            </div>
        </div>
    )
}

export default SettingsSideBar

