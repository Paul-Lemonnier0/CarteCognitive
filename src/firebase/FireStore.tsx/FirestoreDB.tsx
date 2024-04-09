import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";
import { firebaseConfig } from "../FireBaseConnexion"
import { GraphType } from "../../types/Graph/GraphType";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

async function CreateDoc(user: string, graph: GraphType) {
    const docRef = await addDoc(collection(db, user), graph)
    console.log("id du document : ", docRef.id)
}

/**
 * 
 * @param user le nom de l'utilisateur pour récupérer tout ces graphes
 * @returns retourne la liste de tout les graphes de l'utilisateur
 */

async function getCollection(user: string) {
    const doc = await (getDocs(collection(db, user)))
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
 * @param user l'utilisateur qui stock le graphe
 * @param graph le nouveau graphe
 * @param id id du document
 */
async function setDocument(user: string, graph: GraphType, id: string) {
    const docRef = collection(db, user)
    await setDoc(doc(docRef, id), graph, { merge: true })

}

async function deleteDocument(user : string, documentId : string){
    try{
        const docRef = doc(db, user, documentId)
        await deleteDoc(docRef);
        console.log("Document supprimé")
    } catch (error){
        console.log("erreur Suppression : ", error)
    }
}


export default db
export { CreateDoc, getCollection, setDocument, deleteDocument }