import React, { FC, SyntheticEvent, useContext, useEffect, useState } from "react"
import "./GraphPresentation.css"
import { Link } from "react-router-dom"
import { GraphType } from "../../types/Graph/GraphType"
import { deleteGraph } from "../../firebase/FireStore.tsx/FirestoreDB"
import { AppContext } from "../../context/AppContext"

interface GraphPresentationProps {
    graph: GraphType
    style?: React.CSSProperties
}


const GraphPresentation: FC<GraphPresentationProps> = ({ graph, style }) => {
    const [isSelect, setIsSelect] = useState(false)
    const {user, graphsUser, setGraphsUser} = useContext(AppContext)

    const handleClickEffacer = () => {
        if (user?.uid === "")
            console.log("utilisateur introuvable")
        else{
        deleteGraph(user?user.uid : "", graph.id)
        const updatedGraphsUser = graphsUser.filter((g)=>g.id !== graph.id)
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
        if (e.ctrlKey || e.metaKey) {
            setIsSelect(!isSelect);
            e.preventDefault()
        } 
    };
    

    return (
        
        <Link to={'/graphDetails'} state={{ ...graph }}>
            <div className={isSelect ? 'graphPresentationContainerselected': `graphPresentationContainer`} style={style} onClick={handleSelectClick}>
                <h2 style={{
                    textAlign: "left",
                    color: "black",
                    fontFamily: "PoppinsBold"
                }}>{graph.title}</h2>
            </div>
        </Link>
        
    )
}

export default GraphPresentation