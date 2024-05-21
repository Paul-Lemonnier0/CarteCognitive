import React, { FC } from 'react'
import "./CustomNodeListItemStyle.css"
import { Node } from 'reactflow'
import { CustomZoneIcon } from '../Zones/CustomZoneIcon'
import { CustomNodeIcon } from './CustomNodeIcon'

interface CustomNodeListItemProps {
    node: Node,
    bottomBorder?: boolean,
    isSelected?: boolean,
    isVisible?: boolean,
    onPress: () => void,
    onDoublePress?: () => void,
}

const CustomNodeListItem: FC<CustomNodeListItemProps> = ({
    node, 
    bottomBorder, 
    isSelected, 
    isVisible,
    onPress, 
    onDoublePress
}) => {

    if(!("label" in node.data)) {
        return null
    }

    return (
        <div className={`customNodeListItemContainer ${!isVisible ? "hidden" : ""}`}
            onClick={onPress} 
            onDoubleClick={onDoublePress}
            style={{ userSelect: 'none', borderBottom: bottomBorder ? "2px solid black" :  undefined}}>
            
            <div id="icon">
            {
                node.type === "customNode" ?
                <CustomNodeIcon color={node.data.couleur} isSelected={isSelected} isSecondary/> :
                <CustomZoneIcon color={node.data.couleur} isSelected={isSelected} isSecondary/>
            }
            </div>
            <div id="label">
                {node.data.label}
            </div>
        </div>
    )
}

export default CustomNodeListItem