import React, { FC, useContext, useState } from "react"
import { GraphCalculType, GraphContext } from "../../context/GraphContext"
import { IconButton } from "../Buttons/IconButtons"
import { MidTextBold, NormalText, TitleText } from "../Text/CustomText";

import "./SettingsSideBarStyle.css"
import "./EditSideBarStyle.css"
import { FiSettings } from "react-icons/fi";

interface SettingsSideBarProps {
    isExpanded: boolean
}

const SettingsSideBar: FC<SettingsSideBarProps> = ({isExpanded}) => {
    const {handleChangeCalculType, graphCalculType} = useContext(GraphContext)
    
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {        
        switch(e.target.value) {
            case GraphCalculType.Boolean:
                handleChangeCalculType(GraphCalculType.Boolean)
                break;
            case GraphCalculType.Symbolic:
                handleChangeCalculType(GraphCalculType.Symbolic)
                break;
            default:
                handleChangeCalculType(GraphCalculType.Integer)
                break;
        } 
    }

    const isChecked = (val: GraphCalculType) => {
        return graphCalculType === val
    }

    if(!isExpanded) return null

    return (
        <div className={`subSideBarContainer`}>
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
        </div>
    )
}

export default SettingsSideBar

