import React, { useContext, useEffect, useState } from "react"
import "./HomeScreen.css"
import AppTopBar from "../components/TopBar/TopBar"
import { GraphType } from "../types/Graph/GraphType"
import { getGraphFromJSON } from "../primitives/GraphMethods"
import ListGraph from "../components/graphs/ListGraph"
import { getUserGraphs } from "../firebase/FireStore.tsx/FirestoreDB"
import { ValidationButton } from "../components/Buttons/Buttons"
import ComposantsModal from "../components/Modal/ComposantsModal"
import { AppContext } from "../context/AppContext"

const HomeScreen = () => {
    const graph1 = getGraphFromJSON(require("../constantes/Graph/DefaultGraph1.json") as GraphType)
    const graph2 = getGraphFromJSON(require("../constantes/Graph/DefaultGraph2.json") as GraphType)
    const graph3 = getGraphFromJSON(require("../constantes/Graph/DefaultGraph3.json") as GraphType)
    const graph4 = getGraphFromJSON(require("../constantes/Graph/DefaultGraph4.json") as GraphType)
    const graphs = [graph1, graph2, graph3, graph4]

    //parie firestore
    const {user} = useContext(AppContext)
    const userid = user.uid
    const [graphsUser, setGraphsUser] = useState<GraphType[]>([])
    async function fetchGraphData(user : string) {
        const graphCollection = await getUserGraphs(userid)
        setGraphsUser(graphCollection)
    }

    useEffect(() => {
        //récupération des graph du User "Default" au chargement de la page
        fetchGraphData("Default");
    }, []);

    const [showComposants, setShowComposants] = useState<boolean>(false)

    const handleShowComposants = () => {
        setShowComposants(true)
    }

    const handleCloseComposants = () => {
        setShowComposants(false)
    }

    return (
        <>
            <AppTopBar />
            <div className="homeScreenContainer">
                <ListGraph graphs={graphs} title={"Graphes d'exemple"}/>
                <ListGraph graphs={graphsUser} title = {`Graphes de ${user.email}`}/>
            </div>
            <div style={{padding: 20}}>
                <ValidationButton text="Composants" onPress={handleShowComposants}/>
            </div>
            {
                showComposants &&
                <ComposantsModal onClose={handleCloseComposants}/>
            }
        </>
    )
}

export default HomeScreen