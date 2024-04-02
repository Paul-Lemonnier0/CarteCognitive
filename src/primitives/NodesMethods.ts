import { Node } from "reactflow"
import { PositionType } from "../context/AppContext"

function createNewNodeObject(nodeID: number, label: string, position: PositionType, type: string): Node {
    const node = { 
        id: String(nodeID), 
        position: { x: position?.x ?? 0, y: position?.y ?? 0 },
        type: type, 
        data: { 
            label: label
        }
    }

    return node
}

export {createNewNodeObject}