import React, { CSSProperties, useContext } from "react"
import { GraphType } from "../../types/Graph/GraphType"
import GraphPresentation from "./GraphPresentation"
import { IconButton } from "../Buttons/IconButtons"
import { FiRefreshCcw } from "react-icons/fi";
import { getUserGraphs } from "../../firebase/FireStore.tsx/FirestoreDB";
import { AppContext } from "../../context/AppContext";


interface ListGraphInterface {
    graphs : GraphType[],
    title? : string,
    style? : CSSProperties
}

const ListGraph = ({graphs, title, style} : ListGraphInterface) => {
    const {user, setGraphsUser} =useContext(AppContext)

    return (
    <div style={style}
        className="graphPresentationListContainer">
        <h2>{title}</h2>
        <div className="ListGraph" style={{position : "relative"}}>
            <div style={{
                position : "absolute",
                right : 10,
                top: 10
            }}>
            <IconButton Icon={FiRefreshCcw} onPress={async () =>{
                const graphCollection = await getUserGraphs(user.uid);
                setGraphsUser(graphCollection);
            }}/>
            </div>
            {
                graphs.map(graph => (
                    <GraphPresentation graph={graph} style={{
                    }} />
                ))
            }
        </div>

    </div>
    )
}

export default ListGraph