import React, { useEffect, useState } from "react"
import "./HomeScreen.css"
import AppTopBar from "../components/TopBar/TopBar"
import { GraphType } from "../types/Graph/GraphType"
import { getGraphFromJSON } from "../primitives/GraphMethods"
import ListGraph from "../components/graphs/ListGraph"
import { getCollection } from "../firebase/FireStore.tsx/FirestoreDB"

const HomeScreen = () => {
    const graph1 = getGraphFromJSON(require("../constantes/Graph/DefaultGraph1.json") as GraphType)
    const graph2 = getGraphFromJSON(require("../constantes/Graph/DefaultGraph2.json") as GraphType)
    const graph3 = getGraphFromJSON(require("../constantes/Graph/DefaultGraph3.json") as GraphType)
    const graph4 = getGraphFromJSON(require("../constantes/Graph/DefaultGraph4.json") as GraphType)
    const graphs = [graph1, graph2, graph3, graph4]

    //parie firestore
    const user = "Default"
    const [graphsUser, setGraphsUser] = useState<GraphType[]>([])
    async function fetchGraphData(user : string) {
        const graphCollection = await getCollection(user)
        setGraphsUser(graphCollection)
    }

    useEffect(() => {
        //récupération des graph du User "Default" au chargement de la page
        fetchGraphData("Default");
    }, []);

    return (
        <>
            <AppTopBar />
            <div className="homeScreenContainer">
                <ListGraph graphs={graphs} title={"Graphes d'exemple"}/>
                <ListGraph graphs={graphsUser} title = {`Graphes de ${user}`}/>
            </div>
        </>
    )
}

export default HomeScreen