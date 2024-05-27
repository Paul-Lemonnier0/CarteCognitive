import { GraphType } from "../types/Graph/GraphType";

const ExportToJSON = (Graph: GraphType) => {

    const jsonString = JSON.stringify(Graph, null, 2);

    const blob = new Blob([jsonString], { type: 'application/json' });

    const link = document.createElement('a');
    link.href =URL.createObjectURL(blob);
    link.download = Graph.title+".json"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)


};



export default ExportToJSON;