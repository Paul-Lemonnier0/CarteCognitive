import { Edge, Node } from "reactflow";

export type AdjMatValue = string | null
export type AdjMatRow = {[nodeID: string]: AdjMatValue}
export type AdjMat = {[nodeID: string]: AdjMatRow}

export const AdjMat_init = (nodes: Node[], edges: Edge[]): AdjMat => {
    const adjMat: AdjMat = {}

    const emptyNodesList: AdjMatRow = {}
        
    //Init une liste comme : [nodeID_1: null, nodeID_2: null, ...]
    nodes.forEach(node => {
        emptyNodesList[node.id] = null
    })

    //Init de la mat
    nodes.forEach(node => {
        adjMat[node.id] = {...emptyNodesList}
    })

    //MAJ des relations
    edges.forEach((edge) => {
        adjMat[edge.source][edge.target] = edge.id
    })

    return adjMat
}

export const AdjMat_addNode = (adjMat: AdjMat, newNode: Node): AdjMat => {
    adjMat[newNode.id] = {}

    const emptyNodesList: AdjMatRow = {}

    const nodeIDs = Object.keys(adjMat)
    nodeIDs.push(newNode.id)

    nodeIDs.forEach(nodeID => {
        emptyNodesList[nodeID] = null
    })

    for(const nodeID in adjMat) {
        adjMat[nodeID][newNode.id] = null
    }

    adjMat[newNode.id] = emptyNodesList

    return adjMat
}


export const AdjMat_getNeighboors = (adjMat: AdjMat, nodeID: string): AdjMatValue[] => {
    if(adjMat[nodeID]) {
        return Object.values(adjMat[nodeID])
    }

    return []
}

export const AdjMat_deleteEdgeBetweenNodes = (adjMat: AdjMat, nodeID_1: string, nodeID_2: string): AdjMat => {
    if(adjMat[nodeID_1] && adjMat[nodeID_1][nodeID_2]) {
        adjMat[nodeID_1][nodeID_2] = null
    }

    return adjMat
}

export const AdjMat_deleteEdgeByID = (adjMat: AdjMat, edgeID: string): AdjMat => {
    for(const nodeID_1 in adjMat) {
        for(const nodeID_2 in adjMat[nodeID_1]) {
            if(adjMat[nodeID_1][nodeID_2] === edgeID) {
                adjMat[nodeID_1][nodeID_2] = null
            }
        }
    }
    
    return adjMat
}

export const AdjMat_hasEdge = (adjMat: AdjMat, nodeID_1: string, nodeID_2: string): boolean => {
    return adjMat[nodeID_1][nodeID_2] !== null
}

export const AdjMat_addEdge = (adjMat: AdjMat, nodeID_1: string, nodeID_2: string, edge: Edge): AdjMat => {
    adjMat[nodeID_1][nodeID_2] = edge.id
    return adjMat
}

export const AdjMat_deleteNode = (adjMat: AdjMat, toDeleteNodeID: string): AdjMat => {
    delete adjMat[toDeleteNodeID]
    for(const nodeID in adjMat) {
        delete adjMat[nodeID][toDeleteNodeID]
    }

    return adjMat
}

export const AdjMat_deleteMultipleNodes = (adjMat: AdjMat, nodeIDs: string[]): AdjMat => {
    nodeIDs.forEach(nodeID => {
        adjMat = AdjMat_deleteNode(adjMat, nodeID)
    })

    return adjMat
}

export const AdjMat_deleteMultipleEdges = (adjMat: AdjMat, edgeIDs: string[]): AdjMat => {
    for(const nodeID_1 in adjMat) {
        for(const nodeID_2 in adjMat[nodeID_1]) {
            if(adjMat[nodeID_1][nodeID_2] !== null && edgeIDs.includes(adjMat[nodeID_1][nodeID_2] as string)) {
                adjMat[nodeID_1][nodeID_2] = null
            }
        }
    }

    return adjMat
}


export const AdjMat_breakNodeLinks = (adjMat: AdjMat, nodeID: string): AdjMat => {
    for(const id in adjMat[nodeID]) {
        adjMat[nodeID][id] = null
    }

    for(const id in adjMat) {
        adjMat[id][nodeID] = null
    }

    return adjMat
}