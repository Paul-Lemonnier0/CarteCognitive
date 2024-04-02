import { Edge, Node } from "reactflow";

export interface GraphType {
    title: string,
    nbNodes?: number,
    nbEdges?: number,
    nodes: Node[],
    edges: Edge[]
}