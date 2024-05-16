import React, { FC, useCallback, useContext, useState } from "react"
import { GraphCalculType, GraphContext } from "../../context/GraphContext"
import { IconButton } from "../Buttons/IconButtons"
import { MidTextBold, NormalText, TitleText } from "../Text/CustomText";
import { SlCalculator } from "react-icons/sl";
import { ValidationButton } from "../Buttons/Buttons";
import CustomNodeListItem from "../graphs/Nodes/CustomNodeListItem";
import { Edge, Node } from "reactflow";
import { FiAlertTriangle } from "react-icons/fi";
import { calculPropAgreg, getBooleanPathsValue, getIntPathsValue, getMax, getMin, getSymbolicPathsValue, PropagationAgretationType, SYMBOLIC_SYMBOL, SYMBOLIC_TABLE } from "../../constantes/InfluanceCalculs";

import "./CalculSideBarStyle.css"
import "./EditSideBarStyle.css"

interface CalculSideBarProps {
    isExpanded: boolean
}

const CalculSideBar: FC<CalculSideBarProps> = ({ isExpanded }) => {
    const { influancePath, getNodeWithID, edges, setPathEdges, graphCalculType, propagationValue, agregationValue, resultAgregation, setResultAgregation } = useContext(GraphContext)

    const [cheminNull, setCheminNull] = useState(false)
    const [erreurChemin, setErreurChemin] = useState(false)

    const sourceNode = 
        (influancePath && influancePath?.nodesID && influancePath.nodesID.length > 0) ? 
            getNodeWithID(influancePath.nodesID[0]) : null

    const targetNode = 
        (influancePath && influancePath?.nodesID && influancePath.nodesID.length > 1) ? 
            getNodeWithID(influancePath.nodesID[influancePath.nodesID.length - 1]) : null


    let nodePaths: Node[] = []
    if (influancePath && influancePath?.nodesID) {
        const nodePathsTemp = influancePath?.nodesID.map(nodeID => {
            return getNodeWithID(nodeID)
        })

        nodePaths = nodePathsTemp.filter(node => node !== null) as Node[]
    }

    const nodeShouldVisit: Node[] = []
    nodePaths.map((node, index) => {
        const isSource = index === 0
        const isTarget = nodePaths.length > 1 && index === nodePaths.length - 1
        if (isTarget) {
            
        } else if (isSource) {
          
        } else {
            nodeShouldVisit.push(node);
        }
    })



    let liste_chemin: Edge[][] = []
    const nextEdges = useCallback((source: string, target: string, chemin: Edge[], nodeVisited: Node[]) => {
        const nextEdge = edges.filter((elem) => elem.source === source)
        nextEdge.forEach((elem) => {
            if (!chemin.find((edge) => edge === elem)) {


                if (elem.target === target) {

                    if (nodeVisited.length === 0) liste_chemin = [...liste_chemin, [...chemin, elem]]
                    return null
                }
                else {

                    return nextEdges(elem.target, target, [...chemin, elem], nodeVisited.filter((node) => node.id !== elem.source && node.id !== elem.target))
                }
            }
        })

    }, [edges, liste_chemin])

    //TODO : Récupérer la gestion des fractions et l'implémenter
    //                     if (edge.data.label) {
    //                         if (/^\d+(\.\d+)?$/.test(edge.data.label))
    //                             currentCompteur += parseFloat(edge.data.label as string);
    //                         else if (/^\d+\/\d+$/.test(edge.data.label)) {
    //                             const [numerator, denominator] = edge.data.label.split('/').map(Number);
    //                             const result = numerator / denominator;
    //                             currentCompteur += result
    //                         }
    //                     }

    const handleCalculateMax = () => {
        setResultAgregation("")
        handleCalculateBase(PropagationAgretationType.MAX)
    }
    const handleCalculateMin = () => {
        setResultAgregation("")
        handleCalculateBase(PropagationAgretationType.MIN)
    }

    const handleCalculateBase = (customAgregation?: PropagationAgretationType, customPropagation?: PropagationAgretationType) => {
        const path: Edge[] = []
        let influanceValue: SYMBOLIC_SYMBOL | number | boolean | null = null

        if(sourceNode && targetNode) {
            liste_chemin = []
            nextEdges(sourceNode.id, targetNode.id, path, nodeShouldVisit)

            if(liste_chemin.length === 0) {
                setCheminNull(true)
            }

            else {
                const propagation = customPropagation ?? propagationValue
                const agregation = customAgregation ?? agregationValue

                switch(graphCalculType) {
                    case GraphCalculType.Integer:
                        influanceValue = getIntPathsValue(liste_chemin, propagation, agregation)
                        break;
                    case GraphCalculType.Symbolic:
                        influanceValue = getSymbolicPathsValue(liste_chemin)
                        break;
                    case GraphCalculType.Boolean:
                        influanceValue = getBooleanPathsValue(liste_chemin, propagation, agregation)
                        break;
                }

                if(influanceValue === null) {
                    setResultAgregation(""); 
                    setErreurChemin(true)
                }

                else {
                    setResultAgregation("" + influanceValue); 
                    setErreurChemin(false)
                }

                setCheminNull(false)
            }
        }
    }

    if (!isExpanded) return null

    return (
        <div className={`subSideBarContainer`} style={{ height: "100vh" }}>
            <div id="header">
                <TitleText text="Calculs" flex />
                <IconButton Icon={SlCalculator} onPress={() => { }} />
            </div>

            <div id="body">
                {
                    nodePaths.map((node, index) => {

                        const isSource = index === 0
                        const isTarget = nodePaths.length > 1 && index === nodePaths.length - 1

                        const label = isTarget ? "Target" :
                            isSource ? "Source" :
                                "Noeud" + index

                        return (
                            <div style={{ flexDirection: "column", display: "flex" }}>
                                <MidTextBold bold text={label} />
                                <CustomNodeListItem
                                    isVisible
                                    node={node}
                                    onPress={() => { }}
                                    isSelected={true} />
                            </div>
                        )
                    })
                }
                {
                    graphCalculType === GraphCalculType.Integer &&
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 20 }}>
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
                        </div>
                }

                <ValidationButton
                    disabled={!sourceNode || !targetNode}
                    text="Calculer"
                    onPress={() => handleCalculateBase()}
                />
                
                {
                    cheminNull ?
                        <MidTextBold bold text="Auncun chemin existant" />
                        : <MidTextBold bold text={resultAgregation} />
                }
            </div>
            {
                erreurChemin && !cheminNull &&
                <div id="settingsSideBarFooter" style={{ height: 60 }}>
                    <FiAlertTriangle size={30} color="#D44C47" />
                    <NormalText color="#D44C47" bold text="Certaines arrêtes ne sont pas indexées" />
                </div>
            }
        </div>
    )
}

export default CalculSideBar

