import React, { useContext, useEffect, useState } from "react"
import AppTopBar from "../components/TopBar/TopBar"
import { CreateGraph, deleteGraph, getUserGraphs, setgraph } from "../firebase/FireStore.tsx/FirestoreDB"
import { getGraphFromJSON } from "../primitives/GraphMethods"
import ListGraph from "../components/graphs/ListGraph"
import { GraphType } from "../types/Graph/GraphType"
import { AppContext } from "../context/AppContext"

const FireBaseScreenTest =() => {

    const {user} = useContext(AppContext)
    const graphTest = getGraphFromJSON(require("../constantes/Graph/DefaultGraph2.json"))
    const [listGraph, setListGraph] = useState<GraphType[]>([])


    async function fetchGraphData(userid : string) {
        const graphCollection = await getUserGraphs(userid);
        setListGraph(graphCollection);
    }
    useEffect(() => {
        //récupération des graph du User "Default" au chargement de la page
        fetchGraphData(user? user.uid : "Default");
    }, []);
    
    return(
        <div>
        <AppTopBar/>
        
        <h1>FireBase Test</h1>
        
        <button onClick={()=>(CreateGraph(user? user.uid : "Default", graphTest))}>Ajout Graphe</button>
        <button onClick={()=>(fetchGraphData("Default"))}>récupération Graphe</button>
        <ListGraph graphs={listGraph} title={"Default"}/>
        </div>
    )
}

export default FireBaseScreenTest