import React, { useEffect, useState } from "react"
import AppTopBar from "../components/TopBar/TopBar"
import { CreateDoc, getCollection } from "../firebase/FireStore.tsx/FirestoreDB"
import { getGraphFromJSON } from "../primitives/GraphMethods"
import ListGraph from "../components/graphs/ListGraph"
import { GraphType } from "../types/Graph/GraphType"

const FireBaseScreenTest =() => {

    const graphTest = getGraphFromJSON(require("../constantes/Graph/DefaultGraph2.json"))
    const [listGraph, setListGraph] = useState<GraphType[]>([])


    async function fetchGraphData(user : string) {
        const graphCollection = await getCollection(user);
        setListGraph(graphCollection);
    }
    useEffect(() => {
        fetchGraphData;
    }, []);
    
    return(
        <div>
        <AppTopBar/>
        
        <h1>FireBase Test</h1>
        
        <button onClick={()=>(CreateDoc("Default", graphTest))}>Ajout Graphe</button>
        <button onClick={()=>(fetchGraphData("Default"))}>récupération Graphe</button>
        <ListGraph graphs={listGraph} title={"Graphes d'exemple"}/>
        </div>
    )
}

export default FireBaseScreenTest