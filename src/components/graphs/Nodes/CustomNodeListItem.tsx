import React, { FC } from 'react'
import "./CustomNodeListItemStyle.css"
import { Node } from 'reactflow'
import { CustomZoneIcon } from '../Zones/CustomZoneIcon'
import { CustomNodeIcon } from './CustomNodeIcon'

interface CustomNodeListItemProps {
    node: Node,
    bottomBorder?: boolean,
    isSelected?: boolean,
    onPress: () => void,
    onDoublePress?: () => void,
}

const CustomNodeListItem: FC<CustomNodeListItemProps> = ({
    node, 
    bottomBorder, 
    isSelected, 
    onPress, 
    onDoublePress
}) => {

    if(!("label" in node.data)) {
        return null
    }

    return (
        <div className='customNodeListItemContainer' 
            onClick={onPress} 
            onDoubleClick={onDoublePress}
            style={{
                userSelect: 'none',
                borderBottom: bottomBorder ? "2px solid black" : undefined
            }}>

            {
                node.type === "customNode" ?
                <CustomNodeIcon color={node.data.couleur} isSelected={isSelected}/> :
                <CustomZoneIcon color={node.data.couleur} isSelected={isSelected}/>
            }
            <div style={{ flexDirection: 'column', gap: 5 }}>
                <h3>
                    {node.data.label}
                </h3>
            </div>
        </div>
    )
}

export default CustomNodeListItem