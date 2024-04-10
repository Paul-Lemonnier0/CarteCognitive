import React, { FC, useCallback } from 'react'
import { useReactFlow } from 'reactflow';
import { MenuType } from '../Graph';
import { MdOutlineContentCopy } from "react-icons/md";

import "./NodeContextMenuStyle.css"

interface NodeContextMenuProps {
    menu: MenuType,
    onPress: () => void
}
const NodeContextMenu: FC<NodeContextMenuProps> = ({menu, onPress}) => {
    const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
    const duplicateNode = useCallback(() => {
      const node = getNode(menu.id);
      
    if(node) {
        const position = {
            x: node.position.x + 50,
            y: node.position.y + 50,
          };
    
          if(node) {
            addNodes({...node, selected: false, dragging: false, id: `${node.id}-copy`, position});
          }
         
    }


    }, [menu.id, getNode, addNodes]);
  
    const deleteNode = useCallback(() => {
        setNodes((nodes) => nodes.filter((node) => node.id !== menu.id));
        setEdges((edges) => edges.filter((edge) => edge.source !== menu.id));
      }, [menu.id, setNodes, setEdges]);
  
    return (
      <div
        onClick={onPress}
        style={{top: menu.top as number, left: (menu.left as number) - 400, right: (menu.right as number) + 300, bottom: menu.bottom as number }}
        className="context-menu"
      >
        <div style={{ backgroundColor: 'white' }}>
            <p style={{ margin: '0.5em' }}>
            <small>node: {menu.id}</small>
            </p>
            <span onClick={duplicateNode}>
                <MdOutlineContentCopy size={18}/>
            </span>
            <button onClick={deleteNode}>delete</button>
        </div>
      </div>
    );
}

export default NodeContextMenu