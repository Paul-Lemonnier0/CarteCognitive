import React, { FC, useCallback, useContext, useState } from "react"
import { GraphContext } from "../../context/GraphContext"
import { IconButton } from "../Buttons/IconButtons"
import { MidTextBold, NormalText, TitleText } from "../Text/CustomText";
import { SlCalculator } from "react-icons/sl";

import "./CalculSideBarStyle.css"
import "./EditSideBarStyle.css"
import { ValidationButton } from "../Buttons/Buttons";
import CustomNodeListItem from "../graphs/Nodes/CustomNodeListItem";
import { Edge } from "reactflow";

import { AdjMat, AdjMat_addEdge, AdjMat_addNode, AdjMat_breakNodeLinks, AdjMat_deleteMultipleEdges, AdjMat_deleteMultipleNodes, AdjMat_deleteNode, AdjMat_init, AdjMat_getNeighboors } from "../../primitives/MatriceMethods";
import { useSearchParams } from "react-router-dom";

interface CalculSideBarProps {
    isExpanded: boolean
}

const CalculSideBar: FC<CalculSideBarProps> = ({isExpanded}) => {
    const {influancePath, setInfluancePath, getNodeWithID, edges, setPathEdges, adjMat} = useContext(GraphContext)
    
    if(!isExpanded) return null

    const sourceNode = (influancePath && influancePath?.sourceID) ? getNodeWithID(influancePath?.sourceID) : null
    const targetNode = (influancePath && influancePath?.targetID) ? getNodeWithID(influancePath?.targetID) : null


    let liste_chemin:Edge[][] = []
    const nextEdges = useCallback((source:string, target:string, chemin:Edge[])=> {
            const nextEdge = edges.filter((elem) => elem.source === source)
            nextEdge.forEach((elem) => {
                    if(!chemin.find((edge) => edge === elem)) {
                        if(elem.target === target) {
                            liste_chemin = [...liste_chemin, [...chemin,elem]]
                            return null
                        }
                        else {
                            return nextEdges(elem.target,target,[...chemin,elem])
                        }
                    }        
            })
    },[edges])

    const handleCalculate = useCallback(() => {
        if(sourceNode && targetNode) {
            nextEdges(sourceNode.id, targetNode.id,[]) 
        }

        if(liste_chemin.length === 0) {
            console.log("PAs de chemin")
        }
        else {
            let Chemin = [edges[0]]
            let Compteur = 99999999
            console.log("LISTE : ", liste_chemin)
            liste_chemin.forEach((chemin) => {
                let currentCompteur = 0
                chemin.forEach((edge) => {
                    if(edge.data.label === "") {
                        currentCompteur += 100
                    }
                    else  {
                        if (edge.data.label) {
                            currentCompteur += parseFloat(edge.data.label as string);
                        }
                    }
                })
                if (currentCompteur < Compteur) {Chemin = chemin, Compteur = currentCompteur }
            })
            console.log(Compteur)
            setPathEdges(Chemin)
        
        }

    },[edges])

    return (
        <div className={`subSideBarContainer`}>
            <div id="header"> 
                <TitleText text="Calculs" flex/> 
                <IconButton Icon={SlCalculator} onPress={() => {}}/> 
            </div>

            <div id="body">
                {
                    sourceNode && 
                    <div style={{flexDirection: "column", display: "flex"}}>
                        <MidTextBold bold text="Source"/>
                        <CustomNodeListItem
                        isVisible
                        node={sourceNode}
                        onPress={() => {}}
                        isSelected={true} />
                    </div>
                }
                {
                    targetNode && 
                    <div style={{flexDirection: "column", display: "flex"}}>
                        <MidTextBold bold text="Cible"/>
                        <CustomNodeListItem
                        isVisible
                        node={targetNode}
                        onPress={() => {}}
                        isSelected={true} />
                    </div>
                }

                <ValidationButton
                    disabled={!sourceNode || !targetNode}
                    text="Calculer" 
                    onPress={handleCalculate}
                />

                

                
            </div>
        </div>
    )
}

export default CalculSideBar

