import React, { useContext, useEffect, useState } from "react"
import AppTopBar from "../components/TopBar/TopBar"
import { CreateGraph, deleteGraph, getUserGraphs, setgraph } from "../firebase/FireStore.tsx/FirestoreDB"
import { getGraphFromJSON } from "../primitives/GraphMethods"
import ListGraph from "../components/graphs/ListGraph"
import { GraphType } from "../types/Graph/GraphType"
import { AppContext } from "../context/AppContext"

const FireBaseScreenTest = () => {

    const { user } = useContext(AppContext)
    const graphTest = getGraphFromJSON(require("../constantes/Graph/DefaultGraph2.json"))
    const { graphsUser, setGraphsUser } = useContext(AppContext)



    return (
        <div>
            <AppTopBar />

            <h1>FireBase Test</h1>

            <button onClick={() => {
                CreateGraph(user ? user.uid : "Default", graphTest)
                const updateGraphsUser = [...graphsUser, graphTest]
                
                setGraphsUser(updateGraphsUser)
            }}>Ajout Graphe</button>
            {/* <ListGraph graphs={graphsUser} title={"Default"} /> */}
        </div>
    )
}

export default FireBaseScreenTest