import React, { MouseEventHandler } from "react"
import { NormalText } from "../Text/CustomText"

interface OtherUserProfileInterface {
    name : string,
    firstName : string,
    uid : string,
    onClick : MouseEventHandler<HTMLDivElement>
}

export default function OtherUserProfile({name, firstName, uid, onClick} : OtherUserProfileInterface){
    return(
        <div onClick={onClick} style={{
            display : "flex",
            flexDirection : "row", 
            alignItems : "center",
            alignContent : "center",
            border: "1px solid black",
            borderRadius : 10,
            padding : 10,
            margin : 5,}}>
            <NormalText text={name + " " + firstName}></NormalText>

        </div>
    )
}