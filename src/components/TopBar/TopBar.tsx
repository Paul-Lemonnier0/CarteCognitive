import React, { FC, useContext } from "react"
import "./TopBarStyle.css"
import { Link, useNavigate, useNavigation } from "react-router-dom"
import { GrUserSettings} from "react-icons/gr";
import { IoLogoFirebase } from "react-icons/io5";
import ProfilButton from "../Profil/ProfilButton";
import { AppContext } from "../../context/AppContext";
import { FiBell } from "react-icons/fi";
import { GoBackButton, IconButton } from "../Buttons/IconButtons";
import { HugeText } from "../Text/CustomText";

//barre de navigation

interface AppTopBarProps {
    isHomeScreen?: boolean
}

const AppTopBar: FC<AppTopBarProps> = ({isHomeScreen}) => {
    const {user} = useContext(AppContext)

    const navigate = useNavigate()

    return (
        <div className="appTopBar" style={{
            backgroundColor: "#FFFFFF",
            display: 'flex',
            justifyContent: "space-between",
            alignItems: 'center',
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 0,
            zIndex: 100000
        }}>
            {
                !isHomeScreen ?
                <Link to={"/"} style={{ fontFamily: "PoppinsSemiBold" }}>
                    <GoBackButton small onPress={() => navigate(-1)}/>
                </Link>
                :
                <HugeText text="Bienvenue !"/>
            }

            {/* <Link to={"/FireBase"} style={{ fontFamily: "PoppinsSemiBold" }}>
                <IoLogoFirebase style={
                    {
                        fontSize: 20,
                        fontFamily: "PoppinsMedium",
                        color: "black"
                    }
                } />
            </Link> */}

            <div style={{
                flexDirection: "row",
                display: "flex",
                gap: 10,
                alignItems: "center"
            }}>
                <FiBell size={25}/>
                <Link to={"/Profile"} style={{ fontFamily: "PoppinsSemiBold" }}>
                    <ProfilButton name={user.email?.toLocaleUpperCase() ?? "--"}/>
                </Link>
            </div>
                

        </div>

    )
}

interface GraphTopBarProps {
    title: string
}

export const GraphTopBar: FC<GraphTopBarProps> = ({ title }) => {
    return (
        <div className="graphTopBar" style={{
            backgroundColor: "#FFFFFF",
            padding: 0,
            paddingTop: 0,
            zIndex: 100000,
            flexDirection: "column",
            fontFamily: "PoppinsSemiBold",
        }}>
        </div>
    )
}

export default AppTopBar
