import React, { Dispatch, FC, useContext, useState } from "react"
import "./HomeSideBarStyle.css"
import { GoBackButton, IconButton, IconTextButton } from "../Buttons/IconButtons"
import { Link, useNavigate } from "react-router-dom"
import { IoChevronForward, IoReload, IoReloadOutline, IoSettingsOutline } from "react-icons/io5"
import { FiEdit3, FiSettings } from "react-icons/fi"
import { VscSymbolOperator } from "react-icons/vsc";
import { HiOutlineCog } from "react-icons/hi";
import EditSideBar from "./EditSideBar"
import CalculSideBar from "./CalculSideBar"
import SettingsSideBar from "./SettingsSideBar"
import { SlCalculator } from "react-icons/sl"
import { GraphContext } from "../../context/GraphContext"
import { GraphType } from "../../types/Graph/GraphType"
import { setgraph } from "../../firebase/FireStore.tsx/FirestoreDB"
import { AppContext } from "../../context/AppContext"
import ProfilButton from "../Profil/ProfilButton"
import { CiLogout } from "react-icons/ci";
import { MdLogout } from "react-icons/md"
import { MidText, MidTextBold, NormalText, TitleText } from "../Text/CustomText"
import { PiGraph } from "react-icons/pi"
import { FaRegStar } from "react-icons/fa6"
import { TbTemplate } from "react-icons/tb"
import { HomeSideBarMenu } from "../../screens/HomeScreen"
import { UsualButton } from "../Buttons/Buttons"

enum SideBarMenuType {
    Edit = "Edit",
    Calcul = "Calcul",
    Settings = "Settings"
}

interface HomeSideBarProps {
    menu: HomeSideBarMenu,
    setMenu: Dispatch<HomeSideBarMenu>,
}

const HomeSideBar: FC<HomeSideBarProps> = ({
    menu,
    setMenu
}) => {

    const { isCalculating, setIsCalculating, isGraphModified, nodes, edges, id, graphTitle, upgrade } = useContext(GraphContext)
    const { user, personnalDataUser, Deconnection } = useContext(AppContext)
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const navigation = useNavigate()
    const handleChangeExpandState = () => {
        setIsExpanded(!isExpanded)
    }

    const handleChangeMenu = (menu: HomeSideBarMenu) => {
        setMenu(menu)
    }

    return (

        <div className={`homeSideBarContainer ${isExpanded ? "expanded" : ""}`}>
            {personnalDataUser.name !== "" ? (
                //cas ou connecté
                <div  id="header" style={{ userSelect: "none", cursor: "pointer" }}>
                    <ProfilButton name={personnalDataUser.name} />
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 0 }}>
                        <MidText bold text={personnalDataUser.name} />
                        <NormalText bold text={personnalDataUser.firstName} />
                    </div>

                </div>
            ) :
                //cas non connecté
                //TODO faire un composant SignIn SignUp
                <div id="header" style={{ userSelect: "none" }}>
                    <UsualButton text="Connexion" onPress={() => navigation("SignIn")}></UsualButton>
                    <UsualButton text="Inscription" onPress={() => navigation("SignUp")}></UsualButton>
                </div>}


            <div id="body">
                <div className="homeSideBarListItem">
                    <IconTextButton
                        text="Vos cartes"
                        isSelected={menu === HomeSideBarMenu.Graphs}
                        onPress={() => handleChangeMenu(HomeSideBarMenu.Graphs)}
                        Icon={PiGraph} />
                </div>

                <div className="homeSideBarListItem">
                    <IconTextButton
                        text="Modèles"
                        isSelected={menu === HomeSideBarMenu.Templates}
                        onPress={() => handleChangeMenu(HomeSideBarMenu.Templates)}
                        Icon={TbTemplate} />
                </div>

                <div className="homeSideBarListItem">
                    <IconTextButton
                        text="Favoris"
                        isSelected={menu === HomeSideBarMenu.Favorites}
                        onPress={() => handleChangeMenu(HomeSideBarMenu.Favorites)}
                        Icon={FaRegStar} />
                </div>
            </div>

            <div id="footer">
                <li className="utilsSideBarItem" onClick={handleChangeExpandState}>
                    <span style={{ marginLeft: -15 }}>
                        <IconButton Icon={IoSettingsOutline} onPress={() => { }} />
                    </span>
                    <MidText bold text="Paramètres" />


                </li>
                <li className="utilsSideBarItem" onClick={handleChangeExpandState}>
                    <span style={{ marginLeft: -15 }}>
                        <IconButton Icon={MdLogout} onPress={() => {
                            Deconnection()
                        }} />
                    </span>
                    <MidText bold text="Déconnexion" />

                </li>
            </div>
        </div>
    )
}

export default HomeSideBar