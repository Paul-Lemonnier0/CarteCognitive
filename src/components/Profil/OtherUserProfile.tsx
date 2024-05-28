import React, { MouseEventHandler, useState } from "react"
import { NormalText } from "../Text/CustomText"
import "./OtherUserProfile.css"


interface OtherUserProfileInterface {
    name: string,
    firstName: string,
    uid: string,
}

export default function OtherUserProfile({ name, firstName, uid }: OtherUserProfileInterface) {
    
    return (
            <div className={"OtherUserProfile"}>
                <NormalText text={name + " " + firstName}></NormalText>

            </div>
    )
}