import React, { Dispatch, FC, SyntheticEvent, useContext, useEffect, useMemo, useState } from "react"
import "./GraphPresentation.css"
import { Link } from "react-router-dom"
import { GraphType } from "../../types/Graph/GraphType"
import { addFavorite, delFavorite, deleteGraph } from "../../firebase/FireStore.tsx/FirestoreDB"
import { AppContext } from "../../context/AppContext"
import ReactFlow, { Background, BackgroundVariant } from "reactflow"
import { defaultEdgeOptions } from "../../styles/Graphes/Edge"
import CustomConnectionLine from "./Edges/CustomConnectionLine"
import { connectionLineStyle } from "../../styles/Graphes/GraphStyle"
import FloatingEdge from "./Edges/FloatingEdge"
import { CustomNode } from "./Nodes/CustomNode"
import { FieldsetNode } from "./Nodes/FieldsetNode"
import { NormalText, SmallText, TitleText } from "../Text/CustomText"
import { IconButton, IconText } from "../Buttons/IconButtons"
import { IoIosMore, IoMdMore } from "react-icons/io";
import { AiOutlineNodeIndex } from "react-icons/ai";
import { PiFlowArrowDuotone } from "react-icons/pi";
import { IoChevronForward } from "react-icons/io5"
import { FaRegStar, FaStar } from "react-icons/fa6"

interface GraphPresentationProps {
    graph: GraphType
    style?: React.CSSProperties,
    favorites: string[],
    setFavorites: Dispatch<string[]>
}


const GraphPresentation: FC<GraphPresentationProps> = ({
    graph,
    style,
    favorites,
    setFavorites
}) => {
    const [isSelect, setIsSelect] = useState(false)
    const { user, graphsUser, setGraphsUser, personnalDataUser} = useContext(AppContext)

    const handleClickEffacer = () => {
        if (user?.uid === "")
            console.log("utilisateur introuvable")
        else {
            deleteGraph(user ? user.uid : "", graph.id)
            const updatedGraphsUser = graphsUser.filter((g) => g.id !== graph.id)
            setGraphsUser(updatedGraphsUser)

            console.log("id : ", graph.id, "effacée !")
            setIsSelect(false)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleDeleteKeyDown);
        return () => {
            document.removeEventListener('keydown', handleDeleteKeyDown);
        };
    }, [isSelect]);

    const handleDeleteKeyDown = (e: KeyboardEvent) => {
        if ((e.key === "Delete" || e.key === "Backspace") && isSelect) {
            handleClickEffacer();
        }
    }
    const handleSelectClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsSelect(!isSelect);
    };

    const isFavorite = favorites.includes(graph.id)

    const handleFavoriteState = async () => {
        if (isFavorite) {
            setFavorites(favorites.filter(fav => fav !== graph.id))
        }

        else {
            setFavorites([...favorites, graph.id])
        }

    }

    return (
        <div className={`graphPresentationContainer ${isSelect ? 'selected' : ""}`} style={{
            flex: 1,
            borderRadius: 15,
            display: "flex",
        }} onClick={handleSelectClick}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 40,
                flex: 1,
                alignItems: "flex-start",
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 10,
                    flex: 1,
                    width: "100%",
                    alignItems: "flex-start",
                }}>
                    <div style={{ flex: 1, boxSizing: "border-box" }} tabIndex={0}>
                        <TitleText text={graph.title} />
                        <NormalText bold text={graph.title} />
                    </div>

                    <Link to={'/graphDetails'} state={{ ...graph }}>
                        <IconButton Icon={IoChevronForward} onPress={() => { }} />
                    </Link>
                </div>

                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 10,
                    width: "100%"
                }}>
                    <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                        <IconText secondary Icon={AiOutlineNodeIndex} text={graph.nodes.length.toString()} />
                        <IconText secondary Icon={PiFlowArrowDuotone} text={graph.edges.length.toString()} />
                    </div>

                    <IconButton Icon={isFavorite ? FaStar : FaRegStar}
                        color={isFavorite ? "#313443" : "black"}
                        onPress={handleFavoriteState} stopPropagation />

                </div>
            </div>
        </div>
    )
}

export default GraphPresentation