import React, { useContext } from "react"
import AppTopBar from "../components/TopBar/TopBar"
import { TitleText } from "../components/Text/CustomText"
import CircleImage from "../components/Images/CircleImage"
import "./ProfileScreen"
import { FaUser } from "react-icons/fa6"
import { SignInEmailPassword, SignUpEmailPassword } from "../firebase/Authentification/Auth"
import { Link } from "react-router-dom"
import { AppContext } from "../context/AppContext"


interface ProfileScreenInterface {
    user: string
}

function GotoSingIn() {

}

function ProfileScreen() {
    const {user} = useContext(AppContext)



    return (
        <div className="ProfileScreenBody">
            <AppTopBar></AppTopBar>

            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-picture">
                        <CircleImage defaultIcon={FaUser} />
                    </div>
                    <h1>Utilisateur</h1>
                    <p>{user? user.email : "pas d'email"}</p>
                </div>
                <div className="profile-actions">
                    <Link to={"/SignIn"}><p>SignIn</p></Link>
                    <Link to={"/SignUp"}><p>SignUp</p></Link>
                </div>
                <div className="profile-settings">
                    <h2>Paramètres</h2>
                    <ul>
                        <li>Modifier le mot de passe</li>
                        <li>Modifier l'email</li>
                    
                    </ul>
                </div>
            </div>

        </div>
    )

}

export default ProfileScreen