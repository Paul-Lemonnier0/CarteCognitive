import React, { useState } from "react"
import "./MainSideBar.css"
import { GoBackButton, IconButton } from "../Buttons/IconButtons"
import { useNavigate } from "react-router-dom"
import { IoChevronForward } from "react-icons/io5"
import { FiEdit3 } from "react-icons/fi"
import { VscSymbolOperator } from "react-icons/vsc";
import { HiOutlineCog } from "react-icons/hi";
import EditSideBar from "./EditSideBar"

enum SideBarMenuType {
    Edit = "Edit",
    Calcul = "Calcul",
    Settings = "Settings"
}

const MainSideBar = () => {

    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    const [selectedMenu, setSelectedMenu] = useState<SideBarMenuType>(SideBarMenuType.Edit)

    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(-1)
    }

    const handleChangeExpandState = () => {
        setIsExpanded(!isExpanded)
    }

    const handleChangeMenu = (menu: SideBarMenuType) => {
        if(!isExpanded) {
            setIsExpanded(true)
        }
        setSelectedMenu(menu)
    }

    return (
        <div className="mainSideBarContainer">
            <div className={`mainSideBarSubContainer ${isExpanded ? "expanded" : ""}`}>
                <div id="header">
                    <div>
                        <GoBackButton onPress={handleGoBack} />
                    </div>
                </div>

                <div id="body">
                    <div className="mainSideBarListItem">
                        <IconButton 
                            isSelected={selectedMenu === SideBarMenuType.Edit}
                            onPress={() => handleChangeMenu(SideBarMenuType.Edit)}
                            Icon={FiEdit3} />
                        <span className="tooltip">Modifier</span>
                    </div>
                    <div className="mainSideBarListItem">
                        <IconButton 
                            isSelected={selectedMenu === SideBarMenuType.Calcul} 
                            onPress={() => handleChangeMenu(SideBarMenuType.Calcul)}
                            Icon={VscSymbolOperator}/>
                        <span className="tooltip">Calculer</span>
                    </div>
                    <div className="mainSideBarListItem">
                        <IconButton 
                            isSelected={selectedMenu === SideBarMenuType.Settings} 
                            onPress={() => handleChangeMenu(SideBarMenuType.Settings)}
                            Icon={HiOutlineCog} />
                        <span className="tooltip">Paramètres</span>
                    </div>
                </div>

                <div id="footer">
                    <li className="utilsSideBarItem" onClick={handleChangeExpandState}>
                        <span style={{ marginLeft: -15 }}>
                            <IconButton onPress={handleChangeExpandState}>
                                <IoChevronForward size={20} id="developIcon" />
                            </IconButton>
                        </span>
                        {/* <div id="title" style={{ marginLeft: 15 }}>
                            Réduire
                        </div> */}

                    </li>
                </div>
            </div>


            <div className={`mainSideBarContentContainer ${isExpanded ? "expanded" : ""}`}>
                {(selectedMenu == SideBarMenuType.Edit) && <EditSideBar isExpanded={isExpanded}/>}
            </div>
        </div>
    )
}

export default MainSideBar