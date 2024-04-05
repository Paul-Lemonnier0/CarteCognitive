import { initializeApp } from "firebase/app";
import {getFirestore, addDoc, collection, getDocs, QuerySnapshot } from "firebase/firestore";
import {firebaseConfig} from "../FireBaseConnexion"
import { GraphType } from "../../types/Graph/GraphType";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);



async function CreateDoc(user : string, graph : GraphType) {
    const docRef = await addDoc(collection(db, user), graph)
    console.log("id du document : ", docRef.id)
}

async function getCollection(user : string){
    const doc = await (getDocs(collection(db, user)))
    //parcours de toute la collection pour la stocker dans un tableau data
    const data = doc.docs.map(d=>({
        ...d.data()
    }))
    console.log(data)
    return data
}


export default db
export {CreateDoc, getCollection}