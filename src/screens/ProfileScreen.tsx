import React, { CSSProperties, useContext } from "react"
import AppTopBar from "../components/TopBar/TopBar"
import { NormalText, TitleText } from "../components/Text/CustomText"
import CircleImage from "../components/Images/CircleImage"
import "./ProfileScreen.css"
import { FaUser } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import { ValidationButton } from "../components/Buttons/Buttons"
import { getPersonnalData } from "../firebase/FireStore.tsx/FirestoreDB"


const ValidationButtonStyle: CSSProperties = {
    flex: 1,
    margin: "10px"

}

const TitleTextStyle: CSSProperties = {
    textAlign: "center"
}

function ProfileScreen() {
    const { user, personnalDataUser, setPersonnalDataUser, Deconnection } = useContext(AppContext)



    return (
        <div className="ProfileScreenBody">
            <AppTopBar></AppTopBar>

            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-picture">
                        {/*<CircleImage defaultIcon={FaUser} />*/}
                    </div>
                    <TitleText text="Utilisateur" style={TitleTextStyle} />
                    {user.uid == "Default" ?
                        (<div className="ConnectionButton">
                            <Link to={"/SignIn"}><ValidationButton style={ValidationButtonStyle} text="SignIn" onPress={() => { }}></ValidationButton></Link>
                            <Link to={"/SignUp"}><ValidationButton style={ValidationButtonStyle} text="SignUp" onPress={() => { }}></ValidationButton></Link>
                        </div>) : 
                        (
                            <div className="ConnectionButton">
                            <ValidationButton style={ValidationButtonStyle} text="Deconnection" onPress={Deconnection}></ValidationButton>
                            
                        </div>
                        )

                    }
                    <div className="PersonnalInformation">
                        <NormalText text={user.email ? user.email : ""}></NormalText>
                        <NormalText bold text={"Prénom : " + personnalDataUser.name} />
                        <NormalText bold text={"Nom : " + personnalDataUser.firstName} />

                    </div>

                </div>
            </div>

        </div>
    )

}

export default ProfileScreen