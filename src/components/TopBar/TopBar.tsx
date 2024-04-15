import React, { FC } from "react"
import "./TopBarStyle.css"
import { Link } from "react-router-dom"
import { GrUserSettings} from "react-icons/gr";
import { IoLogoFirebase } from "react-icons/io5";

//barre de navigation
const AppTopBar = () => {
    return (
        <div className="appTopBar" style={{
            backgroundColor: "#FFFFFF",
            display: 'flex',
            justifyContent: "space-between",
            alignItems: 'center',
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 0,
            height: 40,
            zIndex: 100000
        }}>
            <Link to={"/"} style={{ fontFamily: "PoppinsSemiBold" }}>
                <p style={{
                    fontSize: 14,
                    textAlign: "left",
                    fontFamily: "PoppinsMedium",
                    color: "black",
                }}>
                    Accueil
                </p>
            </Link>
            <Link to={"/FireBase"} style={{ fontFamily: "PoppinsSemiBold" }}>
                <IoLogoFirebase style={
                    {
                        fontSize: 20,
                        fontFamily: "PoppinsMedium",
                        color: "black"
                    }
                } />
            </Link>
                
            <Link to={"/Profile"} style={{ fontFamily: "PoppinsSemiBold" }}>
                <GrUserSettings style={
                    {
                        fontSize: 20,
                        fontFamily: "PoppinsMedium",
                        color: "black"
                    }
                } />

            </Link>
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
