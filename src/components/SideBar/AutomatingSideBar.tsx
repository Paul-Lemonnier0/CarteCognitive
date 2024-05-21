import React, { useContext, useState, FC, useCallback } from "react";
import "./AutomatingSideBarStyle.css"
import { MidText, TitleText } from "../Text/CustomText"
import { IconButton } from "../Buttons/IconButtons";
import { FiCpu } from "react-icons/fi";
import { MdLabel } from "react-icons/md";
import { ValidationButton } from "../Buttons/Buttons";
import { AppContext } from "../../context/AppContext";
import { GraphContext } from "../../context/GraphContext";
import { createNewNodeObject } from "../../primitives/NodesMethods";
import { TypesNode } from "../../context/GraphContext";
import { SizeType } from "../../context/GraphContext";
import { PositionType } from "../../context/AppContext";
import { Edge } from "reactflow";

interface AutomatingSideBarProps {
    isExpanded: boolean
}


const AutomatingSideBar: FC<AutomatingSideBarProps> = ({isExpanded}) => {

    const {graphCalculType, edges, setEdges, nodes, setNodes,addNewEdge} = useContext(GraphContext)
    const [borneMin, setBorneMin] = useState(0)
    const [borneMax, setBorneMax] = useState(1)
    const [nbrNode, setNbrNode] = useState(1)
    const [density, setDensity] = useState(0)
    const [generation, setGeneration] = useState(0)
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

    const changeNbrNode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNbrNode(parseInt(event.target.value))
    }
    const changeNbrDensity = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(parseInt(event.target.value) <= 100) setDensity(parseInt(event.target.value))
    }

    const clickAutoCreate = () => {
        let x = 0
        let y = 0
        const currentNodes = nodes
        for(let i = 0; i < nbrNode; i++) {
            if(i%5 === 0) {
                x = 0
                y += 500
            }
            const node = createNewNodeObject(`${i}${generation}`, (i+1).toString(), { x, y }, TypesNode.customNode, Date.now().toString())
            x += 500
            currentNodes.push(node)
            
        }  
        setNodes([...currentNodes])  
        
        const currentEdges = edges
        const nbrEdge = Math.round(nbrNode/100*density)
        for(let i = 0; i < nbrNode; i++) {
            for(let y = 0; y <= nbrEdge; y++) {
                const next = Math.floor(Math.random() * (nbrNode))
                if(next!=i ) {
                    const id = "edge_" + i.toString() + generation.toString() + "-" + y.toString() + generation.toString()
                    currentEdges.push({source:`${i}${generation}`, target:`${next}${generation}`,id:id,data:{label:""}} as Edge)
                    
                }
            }
            
            
        }
        setEdges([...currentEdges])
        
        
        setGeneration(generation+1)
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
                        <>
                            <div className="borne">
                                <input className="inputBorne" type="number" max={borneMax-1} onChange={changeMin} value={borneMin}/>
                                <MidText bold text="Borne Inferieur"/>
                            </div>
                            <div className="borne">
                                <input className="inputBorne" type="number" min={borneMin+1} onChange={changeMax} value={borneMax}/>
                                <MidText bold text="Borne Superieur"/>
                            </div>
                        </>
                            : undefined
                    }
                    <ValidationButton text="Completer les arretes non définis" onPress={clickAutoComplete}/>
                </div>
                <div className="autoCreate">
                    <div className="parametreAutoCreate">
                        <input className="inputCreate" type="number" min={1} onChange={changeNbrNode} value={nbrNode}/>
                        <MidText bold text="nombre Noeud(s)"/>
                    </div>
                    <div className="parametreAutoCreate">
                        <input className="inputCreate" type="number" min={0} max={100} onChange={changeNbrDensity} value={density}/>
                        <MidText bold text="Densitée (%)"/>
                    </div>
                    <ValidationButton text="Créer des nouveaux noeuds" onPress={clickAutoCreate}/>
                </div>
            </div>
         </div>
    )
}

export default AutomatingSideBar