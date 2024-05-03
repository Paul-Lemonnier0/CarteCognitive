import React, { FC, useCallback, useContext, useEffect, useState } from "react"
import { GraphCalculType, GraphContext } from "../../context/GraphContext"
import { IconButton } from "../Buttons/IconButtons"
import { MidTextBold, NormalText, TitleText } from "../Text/CustomText";
import { SlCalculator } from "react-icons/sl";

import "./CalculSideBarStyle.css"
import "./EditSideBarStyle.css"
import { ValidationButton } from "../Buttons/Buttons";
import CustomNodeListItem from "../graphs/Nodes/CustomNodeListItem";
import { Edge } from "reactflow";
import ColorIcon from "../Other/ColorIcon"

import { FiAlertTriangle } from "react-icons/fi";

import { AdjMat, AdjMat_addEdge, AdjMat_addNode, AdjMat_breakNodeLinks, AdjMat_deleteMultipleEdges, AdjMat_deleteMultipleNodes, AdjMat_deleteNode, AdjMat_init, AdjMat_getNeighboors } from "../../primitives/MatriceMethods";
import { useSearchParams } from "react-router-dom";

interface CalculSideBarProps {
    isExpanded: boolean
}

const CalculSideBar: FC<CalculSideBarProps> = ({isExpanded}) => {
    const {influancePath, setInfluancePath, getNodeWithID, edges, setPathEdges, graphCalculType, adjMat, relationInt} = useContext(GraphContext)
    
    const [cheminNull, setCheminNull] = useState(false)
    const [erreurChemin, setErreurChemin] = useState(false)
    const sourceNode = (influancePath && influancePath?.nodesID && influancePath.nodesID.length > 0) ? getNodeWithID(influancePath.nodesID[0]) : null
    const targetNode = (influancePath && influancePath?.nodesID && influancePath.nodesID.length > 1) ? getNodeWithID(influancePath.nodesID[influancePath.nodesID.length - 1]) : null


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
        
    },[edges,liste_chemin])

    const symbolicTable = {
        ["x"]: {
            ["x"]: "x",
            ["-"]: "-",
            ["?"]: "?",
        },

        ["-"]: {
            ["x"]: "-",
            ["-"]: "+",
            ["?"]: "?",
        },

        ["?"]: {
            ["x"]: "?",
            ["-"]: "?",
            ["?"]: "?",
        },
    }


    const handleCalculate = useCallback((min:boolean) => {
        setCheminNull(false)
        let testChemin = false
        liste_chemin = []
        if(sourceNode && targetNode) {
            nextEdges(sourceNode.id, targetNode.id,[]) 
        }
        console.log(liste_chemin)
     
            if(liste_chemin.length === 0) {
                setCheminNull(true)
                setPathEdges([])
            }
            else {
                let Chemin = [edges[0]]
                let Compteur = 0
                let test = 0


                liste_chemin.forEach((chemin) => {
                    let currentCompteur = 0
                    chemin.forEach((edge) => {
                        if(edge.data.label === "") {
                            currentCompteur += 100
                            testChemin = true
                        }
                        else  {
                            if (edge.data.label) {
                                if(/^\d+(\.\d+)?$/.test(edge.data.label))
                                    currentCompteur += parseFloat(edge.data.label as string);
                                else if (/^\d+\/\d+$/.test(edge.data.label)) {
                                    const [numerator, denominator] = edge.data.label.split('/').map(Number);
                                    const result = numerator / denominator;
                                    currentCompteur += result
                                }
                            }
                        }
                    })

                    if(test === 0) {
                        Compteur = currentCompteur;
                        Chemin = chemin;
                        test = 1
                    }

                    if(min) {
                        if (currentCompteur < Compteur) {
                            Chemin = chemin;
                            Compteur = currentCompteur 
                        } 
                    }
                    else {
                        if (currentCompteur > Compteur) {
                            Chemin = chemin;
                            Compteur = currentCompteur 
                        } 
                    }
                    
                })
                
                //Erreur : le erreurChemin ne se met pas a jour
                if(!testChemin) { setPathEdges(Chemin); setErreurChemin(false) }
                else { setPathEdges([]); setErreurChemin(true) }
            
            } 
            

    },[edges])

    const handleCalculateMax = () => {
        
        handleCalculate(false)
    }
    const handleCalculateMin = () => {

        handleCalculate(true)
    }

    if(!isExpanded) return null

    return (
        <div className={`subSideBarContainer`} style={{height: "100vh"}}>
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
                {
                    graphCalculType === GraphCalculType.Integer ? 
                    <div style={{display: "flex", flexDirection: "row", gap: 20}}>
                        <ValidationButton
                            disabled={!sourceNode || !targetNode}
                            text="Calculer Min" 
                            onPress={handleCalculateMin}
                        />
                        <ValidationButton
                            disabled={!sourceNode || !targetNode}
                            text="Calculer Max" 
                            onPress={handleCalculateMax}
                        />
                    </div> : 
                    <ValidationButton
                        disabled={!sourceNode || !targetNode}
                        text="Calculer" 
                        onPress={() => {}}
                    />
                }
                
                {
                    cheminNull ? 
                    <MidTextBold bold text="Auncun chemin existant"/>
                     : undefined
                }
            </div>
            {
                erreurChemin && !cheminNull &&
                <div id="settingsSideBarFooter" style={{height: 60}}>
                    <FiAlertTriangle size={30} color="#D44C47"/>
                    <NormalText color="#D44C47" bold text="Certaines arrêtes ne sont pas indexées"/>
                </div>
            }
        </div>
    )
}

export default CalculSideBar

