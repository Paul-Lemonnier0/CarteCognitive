import { Edge, Node } from "reactflow";

//PAS UTILISE AU FINAL

export class Graph {
    nodes: Node[];
    edges: Edge[];
    adjMat: {[nodeID: string]: {
        [nodeID_bis: string]: (string | null)
    }}

    constructor(nodes: Node[], edges: Edge[]) {
        this.nodes = nodes
        this.edges = edges
        this.adjMat = {}

        const emptyNodesList: {[nodeID: string]: (string | null)} = {}
        
        //Init une liste comme : [nodeID_1: null, nodeID_2: null, ...]
        nodes.forEach(node => {
            emptyNodesList[node.id] = null
        })

        //Init de la mat
        nodes.forEach(node => {
            this.adjMat[node.id] = emptyNodesList
        })

        //MAJ des relations
        edges.forEach((edge) => {
            this.adjMat[edge.source][edge.target] = edge.id
        })
    }

    hasEdge(nodeID_1: string, nodeID_2: string): boolean {
        return this.adjMat[nodeID_1][nodeID_2] !== null
    }

    addEdge(nodeID_1: string, nodeID_2: string, edge: Edge) {
        this.edges.push(edge)
        this.adjMat[nodeID_1][nodeID_2] = edge.id
    }

    deleteEdgeByID(edgeID: string) {
        this.edges = this.edges.filter(edge => edge.id !== edgeID)
        for(const nodeID_1 in this.adjMat) {
            for(const nodeID_2 in this.adjMat[nodeID_1]) {
                if(this.adjMat[nodeID_1][nodeID_2] === edgeID) {
                    this.adjMat[nodeID_1][nodeID_2] = null
                }
            }
        }
    }

    deleteEdgeBetweenNodes(nodeID_1: string, nodeID_2: string) {
        if(this.adjMat[nodeID_1] && this.adjMat[nodeID_1][nodeID_2]) {
            const edgeID = this.adjMat[nodeID_1][nodeID_2]
            this.edges = this.edges.filter(edge => edge.id !== edgeID)
            this.adjMat[nodeID_1][nodeID_2] = null
        }
    }

    getNeighboors(nodeID: string): (string | null)[] {
        if(this.adjMat[nodeID]) {
            return Object.values(this.adjMat[nodeID])
        }

        return []
    }

    addNode(newNode: Node) {
        this.adjMat[newNode.id] = {}

        const emptyNodesList: {[nodeID: string]: (string | null)} = {}

        this.nodes.push(newNode)

        this.nodes.forEach(node => {
            emptyNodesList[node.id] = null
        })

        for(const nodeID in this.adjMat) {
            this.adjMat[nodeID][newNode.id] = null
        }

        this.adjMat[newNode.id] = emptyNodesList
    }
}