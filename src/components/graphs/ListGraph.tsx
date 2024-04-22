import React, { CSSProperties, useContext, Dispatch } from "react"
import { GraphType } from "../../types/Graph/GraphType"
import GraphPresentation from "./GraphPresentation"
import { IconButton } from "../Buttons/IconButtons"
import { FiRefreshCcw } from "react-icons/fi";
import { getUserGraphs } from "../../firebase/FireStore.tsx/FirestoreDB";
import { AppContext } from "../../context/AppContext";
import { HugeText, TitleText } from "../Text/CustomText"


interface ListGraphInterface {
    graphs : GraphType[],
    title? : string,
    style? : CSSProperties,
    favorites: string[],
    setFavorites: Dispatch<string[]>,
}

const ListGraph = ({graphs, title, style, favorites, setFavorites} : ListGraphInterface) => {
    const {user, setGraphsUser} =useContext(AppContext)

    return (
    <div style={style} className="graphPresentationListContainer">
        <div style={{marginLeft: 20}}>
            <HugeText text={title ?? ""}/>
        </div>
        <div className="ListGraph" style={{flex: 1, gap: 20, flexWrap: "wrap"}}>
            {
                graphs.map(graph => (
                    <GraphPresentation 
                        favorites={favorites}
                        setFavorites={setFavorites}
                        graph={graph}/>
                ))
            }
        </div>

    </div>
    )
}

export default ListGraph