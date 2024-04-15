import React, { FC, useContext } from 'react';
import { AdjMat } from '../../primitives/MatriceMethods';
import "./AdjMatStyle.css";
import { GraphContext } from '../../context/GraphContext';
import { RxCross2 } from "react-icons/rx";

interface AdjMatComponentProps {
    adjMat: AdjMat;
}

const AdjMatComponent: FC<AdjMatComponentProps> = ({ adjMat }) => {
    const { getNodeWithID } = useContext(GraphContext);

    return (
        <div className='adjMatContainer'>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {Object.keys(adjMat).map(nodeID_1 => {
                            const node = getNodeWithID(nodeID_1);
                            return (
                                <th key={nodeID_1}>
                                    {node !== null ? node.data.label : nodeID_1}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(adjMat).map(nodeID_1 => {
                        const node = getNodeWithID(nodeID_1);
                        return (
                            <tr key={nodeID_1}>
                                <th>{node !== null ? node.data.label : nodeID_1}</th>
                                {Object.keys(adjMat[nodeID_1]).map(nodeID_2 => (
                                    // <td key={nodeID_2}>{adjMat[nodeID_1][nodeID_2]}</td>
                                    <td>
                                        {
                                            adjMat[nodeID_1][nodeID_2] !== null ?
                                            <RxCross2 size={25}/> : null
                                        }
                                    </td>
                                ))}
                            </tr>
                        )})}
                </tbody>
            </table>
        </div>
    );
};

export default AdjMatComponent;
