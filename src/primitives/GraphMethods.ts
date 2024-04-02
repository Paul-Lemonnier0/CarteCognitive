import { defaultEdgeOptions } from "../styles/Graphes/Edge"
import { GraphType } from "../types/Graph/GraphType"

export const getGraphFromJSON = (graphJSON: GraphType): GraphType => {        

        graphJSON.edges = graphJSON.edges.map(edge => ({
                ...edge,
                ...defaultEdgeOptions
        }))

        return graphJSON as GraphType
}