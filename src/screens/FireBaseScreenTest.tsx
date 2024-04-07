import React, { useEffect, useState } from "react"
import AppTopBar from "../components/TopBar/TopBar"
import { CreateDoc, getCollection, setDocument } from "../firebase/FireStore.tsx/FirestoreDB"
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
        //récupération des graph du User "Default" au chargement de la page
        fetchGraphData("Default");
    }, []);
    
    return(
        <div>
        <AppTopBar/>
        
        <h1>FireBase Test</h1>
        
        <button onClick={()=>(CreateDoc("Default", graphTest))}>Ajout Graphe</button>
        <button onClick={()=>(fetchGraphData("Default"))}>récupération Graphe</button>
        <button onClick={()=>{
            //btrKTBaNdpHC8fDwrgN4
            const newGraph = listGraph[1]
            newGraph.title = "toto"
            listGraph[1] = newGraph
            setDocument("Default", newGraph, "btrKTBaNdpHC8fDwrgN4")
            console.log(listGraph[1].title)
        }}>modifier Graphe</button>
        <ListGraph graphs={listGraph} title={"Default"}/>
        </div>
    )
}

export default FireBaseScreenTest