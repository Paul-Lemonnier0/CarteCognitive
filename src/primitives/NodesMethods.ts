import { Node } from "reactflow"
import { PositionType } from "../context/AppContext"
import { SizeType, TypesNode } from "../context/GraphContext"

function createNewNodeObject(nodeID: number|string, label: string, position: PositionType, type: TypesNode, date:string, size?: SizeType): Node {
    const node: Node = { 
        id: String(nodeID), 
        position: { x: position?.x ?? 0, y: position?.y ?? 0 },
        type: type, 
        zIndex: type === "fieldsetNode" ? -2 : 1,
        data: { 
            label: label ?? ((type === "fieldsetNode" )? "Nouvelle zone" : "..."),
            date: date
        }
    }

    if(size) {
        node.style = {width: size.w, height: size.h}
    }

    return node
}

export {createNewNodeObject}