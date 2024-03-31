import { Node } from "reactflow"
import { PositionType } from "../context/AppContext"

function createNewNodeObject(nodeID: number, label: string, position: PositionType): Node {
    const node = { 
        id: String(nodeID), 
        position: { x: position?.x ?? 0, y: position?.y ?? 0 },
        type: 'customNode', 
        data: { 
            label: label
        }
    }

    return node
}

export {createNewNodeObject}