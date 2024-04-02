import React from "react"
import { Link } from "react-router-dom"


const NotFoundScreen = () => {
    return(
        <div>
            <h1>Destination introuvable !</h1>
            <Link to={"/"}>Retour à l'accueil</Link>
        </div>
    )
}

export default NotFoundScreen