import React, { FC, SyntheticEvent, useEffect, useState } from "react"
import "./GraphPresentation.css"
import { Link } from "react-router-dom"
import { GraphType } from "../../types/Graph/GraphType"
import { deleteDocument } from "../../firebase/FireStore.tsx/FirestoreDB"

interface GraphPresentationProps {
    graph: GraphType
    style?: React.CSSProperties
}


const GraphPresentation: FC<GraphPresentationProps> = ({ graph, style }) => {
    const [isSelect, setIsSelect] = useState(false)

    const handleClickEffacer = () => {
        deleteDocument("Default", graph.id)
        console.log("id : ", graph.id, "effacée !")
        setIsSelect(false)
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