import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";
import { firebaseConfig } from "../FireBaseConnexion"
import { GraphType } from "../../types/Graph/GraphType";

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

/**
 * 
 * @param userid l'id de l'utilisateur pour récupérer tout ces graphes
 * @param graph un graph
 */
async function CreateGraph(userid: string, graph: GraphType) {
    const docRef = await addDoc(collection(db,"users", userid, "Graphs"), graph)
    console.log("id du document : ", docRef.id)
}

/**
 * 
 * @param userid l'id de l'utilisateur pour récupérer tout ces graphes
 * @returns retourne la liste de tout les graphes de l'utilisateur
 */

async function getUserGraphs(userid: string) {
    const doc = await (getDocs(collection(db, "users",userid, "Graphs")))
    //parcours de toute la collection pour la stocker dans un tableau data
    const data = doc.docs.map((d: any) => {
        // Obtention des données du document Firestore
        const documentData = d.data();

        // Récupération de l'ID du document Firestore
        const documentId = d.id;

        // Création d'un nouvel objet avec l'ID actualisé
        const modifiedData = {
            ...documentData,
            id: documentId
        };

        return modifiedData;
    })
    console.log(data)
    return data as GraphType[]
}

/**
 * 
 * @param userid l'utilisateur qui stock le graphe
 * @param graph le nouveau graphe
 * @param id id du document
 */
async function setgraph(userid: string, graph: GraphType, id: string) {
    const docRef = collection(db, "users", userid, "Graphs")
    await setDoc(doc(docRef, id), graph, { merge: true })

}

/**
 * 
 * @param userid id de l'utilisateur
 * @param documentId id du graph
 */

async function deleteGraph(userid : string, graphId : string){
    try{
        const docRef = doc(db,"users", userid,"Graphs", graphId)
        await deleteDoc(docRef);
        console.log("Document supprimé")
    } catch (error){
        console.log("erreur Suppression : ", error)
    }
}


export default db
export { CreateGraph, getUserGraphs, setgraph, deleteGraph }