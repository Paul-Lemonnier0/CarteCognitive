import React, { CSSProperties, Dispatch } from "react"
import { GraphType } from "../../types/Graph/GraphType"
import GraphPresentation from "./GraphPresentation"
import { HugeText, TitleText } from "../Text/CustomText"


interface ListGraphInterface {
    graphs : GraphType[],
    title? : string,
    style? : CSSProperties,
    favorites: string[],
    setFavorites: Dispatch<string[]>,
}

const ListGraph = ({graphs, title, style, favorites, setFavorites} : ListGraphInterface) => {
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