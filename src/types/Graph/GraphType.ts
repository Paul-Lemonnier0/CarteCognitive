import { Edge, Node } from "reactflow";
import { PropagationAgretationType } from "../../constantes/InfluanceCalculs";
import { GraphCalculType } from "../../context/GraphContext";

export interface GraphType {
    title: string,
    nbNodes?: number,
    nbEdges?: number,
    nodes: Node[],
    edges: Edge[],
    id : string,
    upgrade : boolean,
    proprio : string,
    propagation: PropagationAgretationType,
    aggregation: PropagationAgretationType,
    graphCalculType: GraphCalculType,
}