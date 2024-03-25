import { Node } from "reactflow";
import { edgeBase } from "../../styles/Graphes/Edge";

const defaultNodes: Node[] = [
    {
      id: "0",
      type: 'customNode',
      position: { x: 20, y: 20 },
      data: { label: 'A' },
    },
  
    {
      id: '1',
      type: 'customNode',
      position: { x: 100, y: 200 },
      data: { label: 'B' },
    }
  ];
  
  const defaultEdges = [edgeBase({ id: 'e0-1', source: '0', target: '1'})];

  export {defaultEdges, defaultNodes}