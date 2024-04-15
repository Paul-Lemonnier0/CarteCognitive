import React, { FC, useContext } from "react"
import { GraphContext } from "../../context/GraphContext"
import { IconButton } from "../Buttons/IconButtons"
import { TitleText } from "../Text/CustomText";
import { SlCalculator } from "react-icons/sl";

import "./SettingsSideBarStyle.css"
import "./EditSideBarStyle.css"
import { FiSettings } from "react-icons/fi";

interface SettingsSideBarProps {
    isExpanded: boolean
}

const SettingsSideBar: FC<SettingsSideBarProps> = ({isExpanded}) => {
    const {} = useContext(GraphContext)
    
    if(!isExpanded) return null

    return (
        <div className={`subSideBarContainer`}>
            <div id="header"> 
                <TitleText text="Settings" flex/> 
                <IconButton Icon={FiSettings} onPress={() => {}}/> 
            </div>

            <div id="body">
                
            </div>
        </div>
    )
}

export default SettingsSideBar

