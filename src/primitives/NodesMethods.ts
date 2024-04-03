import { Node } from "reactflow"
import { PositionType } from "../context/AppContext"

function createNewNodeObject(nodeID: number, label: string, position: PositionType, type: string): Node {
    const node: Node = { 
        id: String(nodeID), 
        position: { x: position?.x ?? 0, y: position?.y ?? 0 },
        type: type, 
        zIndex: type === "fieldsetNode" ? -2 : 1,
        data: { 
            label: label ?? type === "fieldsetNode" ? "Nouvelle zone" : "..."
        }
    }

    return node
}

export {createNewNodeObject}