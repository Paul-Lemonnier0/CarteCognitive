import React from "react"
import AppTopBar from "../components/TopBar/TopBar"
import { TitleText } from "../components/Text/CustomText"
import CircleImage from "../components/Images/CircleImage"
import "./ProfileScreen"
import { FaUser } from "react-icons/fa6"

interface ProfileScreenInterface {
    user: string
}

function ProfileScreen({ user }: ProfileScreenInterface) {

    return (
        <div className="ProfileScreenBody">
            <AppTopBar></AppTopBar>
            <CircleImage defaultIcon={FaUser} />
            <TitleText text={user}></TitleText>
        </div>
    )

}

export default ProfileScreen