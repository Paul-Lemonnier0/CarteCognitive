import React, { FC, useCallback, useContext, useEffect, useState } from "react"
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
    
    const [cheminNull, setCheminNull] = useState(false)
    const [erreurChemin, setErreurChemin] = useState(false)
    const sourceNode = (influancePath && influancePath?.sourceID) ? getNodeWithID(influancePath?.sourceID) : null
    const targetNode = (influancePath && influancePath?.targetID) ? getNodeWithID(influancePath?.targetID) : null


    let liste_chemin:Edge[][] = []
    const nextEdges = useCallback((source:string, target:string, chemin:Edge[])=> {
            const nextEdge = edges.filter((elem) => elem.source === source)
            nextEdge.forEach((elem) => {
                    if(!chemin.find((edge) => edge === elem)) {
                        if(elem.data.label) {
                            if(elem.data.label === "") setErreurChemin(true)}
                        else setErreurChemin(true)
                    
                        if(elem.target === target) {
                            liste_chemin = [...liste_chemin, [...chemin,elem]]
                            return null
                        }
                        else {
                            return nextEdges(elem.target,target,[...chemin,elem])
                        }
                    }        
            })
    },[edges,erreurChemin])

    const handleCalculate = useCallback((min:boolean) => {
        setCheminNull(false)
        liste_chemin = []
        if(sourceNode && targetNode) {
            setErreurChemin(false)
            nextEdges(sourceNode.id, targetNode.id,[]) 
        }
   
        

        
            if(liste_chemin.length === 0) {
                console.log("PAs de chemin")
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
                    if(test === 0) {Compteur = currentCompteur, Chemin = chemin, test = 1}
                    if(min) {
                        if (currentCompteur < Compteur) {
                            console.log("Chermin" , chemin , "Compteur :" , currentCompteur)
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
                if(!erreurChemin)setPathEdges(Chemin)
            
            } 
            

    },[edges, erreurChemin])

    const handleCalculateMax = () => {
        
        handleCalculate(false)
    }
    const handleCalculateMin = () => {

        handleCalculate(true)
    }

    if(!isExpanded) return null

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
                    text="Calculer Min" 
                    onPress={handleCalculateMin}
                />
                <ValidationButton
                    disabled={!sourceNode || !targetNode}
                    text="Calculer Max" 
                    onPress={handleCalculateMax}
                />
                {
                    cheminNull ? 
                    <MidTextBold bold text="Auncun chemin existant"/>
                     : undefined
                }

                {
                    erreurChemin?
                    <MidTextBold bold text="Certaines arrêtes ne sont pas indexé"/>
                     : undefined
                }
                

                
            </div>
        </div>
    )
}

export default CalculSideBar

