import React, { useContext, useState, FC, useCallback } from "react";
import "./AutomatingSideBarStyle.css"
import { MidText, TitleText } from "../Text/CustomText"
import { IconButton } from "../Buttons/IconButtons";
import { FiCpu } from "react-icons/fi";
import { MdLabel } from "react-icons/md";
import { ValidationButton } from "../Buttons/Buttons";
import { AppContext } from "../../context/AppContext";
import { GraphContext } from "../../context/GraphContext";


interface AutomatingSideBarProps {
    isExpanded: boolean
}


const AutomatingSideBar: FC<AutomatingSideBarProps> = ({isExpanded}) => {

    const {graphCalculType, edges, setEdges} = useContext(GraphContext)
    const [borneMin, setBorneMin] = useState(0)
    const [borneMax, setBorneMax] = useState(1)
    const clickAutoComplete = () => {
    
        if(graphCalculType === "Integer"){
             const newEdge =  edges.map((edge) => {
                    if(edge.data.label === ""){
                        const randomNumber = Math.random() * (borneMax - borneMin) + borneMin

                        return {
                            ...edge,
                            data: {
                                ...edge.data,
                                label : randomNumber.toFixed(2)
                            }
                        }
                    }
                    return edge
                })
            setEdges(newEdge)
        }
        if(graphCalculType === "Symbolic") {
            setEdges(
                edges.map((edge) => {
                    if(edge.data.label === "") {
                        const randomNumber = Math.floor(Math.random() * 3)
                        if(randomNumber === 0) edge.data.label = "+"
                        else if(randomNumber === 1) edge.data.label = "-"
                        else if(randomNumber === 2) edge.data.label = "?"
                    }
                    return edge
                })
            )
        }
        if(graphCalculType === "Boolean") {
            setEdges(
                edges.map((edge) => {
                    if(edge.data.label === "") {
                        if(Math.round(Math.random()) === 0) edge.data.label = "0"
                        else edge.data.label = "1"
                    }
                    return edge
                })
            )
        }  
    }

    const changeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
         setBorneMin(parseFloat(event.target.value))
    }
    const changeMax = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBorneMax(parseFloat(event.target.value))
    }


    if (!isExpanded) return null
    return (
        <div className={`subSideBarContainer`} style={{ height: "100vh" }}>
            <div id="header">
                <TitleText text="Automatisation" flex />
                <IconButton Icon={FiCpu} onPress={() => { }} />
            </div>

            <div id="body">
                <div className="autoComplete">
                    {
                        graphCalculType === "Integer" ? 
                        <div className="">
                            <div className="borne">
                                <input className="inputBorne" type="number" max={borneMax-1} onChange={changeMin} value={borneMin}/>
                                <MidText text="Borne Inferieur"/>
                            </div>
                            <div className="borne">
                                <input className="inputBorne" type="number" min={borneMin+1} onChange={changeMax} value={borneMax}/>
                                <MidText text="Borne Superieur"/>
                            </div>
                        </div>
                            : undefined
                    }
                    <ValidationButton text="Completer les arretes non définis" onPress={clickAutoComplete}/>
                </div>
            </div>
         </div>
    )
}

export default AutomatingSideBar