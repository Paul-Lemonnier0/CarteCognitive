import { GraphCalculType } from "../../context/GraphContext";
import { GraphType } from "../../types/Graph/GraphType";
import { PropagationAgretationType } from "../InfluanceCalculs";

export const graph1: GraphType = {
    title: "Premier graphe",
    nodes: [],
    edges: [],
    id:"",
    upgrade : false,
    proprio : "",
    propagation: PropagationAgretationType.ADD,
    aggregation: PropagationAgretationType.ADD,
    graphCalculType: GraphCalculType.Integer
}

export const graph2: GraphType = {
    title: "Deuxième graphe",
    nodes: [],
    edges: [],
    id: "",
    upgrade : false,
    proprio : "",
    propagation: PropagationAgretationType.ADD,
    aggregation: PropagationAgretationType.ADD,
    graphCalculType: GraphCalculType.Integer
}

export const graph3: GraphType = {
    title: "Troisième graphe",
    nodes: [],
    edges: [],
    id: "",
    upgrade : false,
    proprio : "",
    propagation: PropagationAgretationType.ADD,
    aggregation: PropagationAgretationType.ADD,
    graphCalculType: GraphCalculType.Integer
}

export const graph4: GraphType = {
    title: "Quatrième graphe",
    nodes: [],
    edges: [],
    id: "",
    upgrade : false,
    proprio : "",
    propagation: PropagationAgretationType.ADD,
    aggregation: PropagationAgretationType.ADD,
    graphCalculType: GraphCalculType.Integer
}

export const graph5: GraphType = {
    title: "Cinquième graphe",
    nodes: [],
    edges: [],
    id: "",
    upgrade : false,
    proprio : "",
    propagation: PropagationAgretationType.ADD,
    aggregation: PropagationAgretationType.ADD,
    graphCalculType: GraphCalculType.Integer
}

export const defaultGraphs = [graph1, graph2, graph3, graph4, graph5]
