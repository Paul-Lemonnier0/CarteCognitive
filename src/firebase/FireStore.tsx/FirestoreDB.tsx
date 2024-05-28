import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs, setDoc, doc, deleteDoc, getDoc, DocumentReference } from "firebase/firestore";
import { firebaseConfig } from "../FireBaseConnexion"
import { GraphType } from "../../types/Graph/GraphType";
import { CustomUser, ListUtilisateurInterface, personnalDataUserInterface } from "../../context/AppContext";
import { User, deleteUser } from "firebase/auth";
import { auth } from "../Authentification/Auth";


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
    const docRef = await addDoc(collection(db, "users", userid, "Graphs"), graph)
    console.log("id du document : ", docRef.id)
}

/**
 * 
 * @param userid l'id de l'utilisateur pour récupérer tout ces graphes
 * @returns retourne la liste de tout les graphes de l'utilisateur
 */

async function getUserGraphs(userid: string) {
    const doc = await (getDocs(collection(db, "users", userid, "Graphs")))
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
    return data as GraphType[]
}

/**
 * 
 * @param userid l'utilisateur qui stock le graphe
 * @param graph le nouveau graphe
 * @param id id du document
 */
//TODO à supprimer
async function setgraph(userid: string, graph: GraphType, id: string) {
    const docRef = collection(db, "users", userid, "Graphs")
    await setDoc(doc(docRef, id), graph, { merge: true })

}

/**
 * 
 * @param userid id de l'utilisateur
 * @param documentId id du graph
 */

export function saveLocalStoragePersonnalData(PersonnalData: personnalDataUserInterface) {
    localStorage.setItem("personnalDataUser", JSON.stringify(PersonnalData))
}

export function saveLocalStorageUser(user: User | CustomUser) {
    localStorage.setItem("user", JSON.stringify(user))
}




export function getLocalStoragePersonnalData() {
    // Récupérez les données de `localStorage`
    const storedData = localStorage.getItem("personnalDataUser");

    // Vérifiez si les données existent
    if (storedData !== null) {
        // Convertissez la chaîne JSON en objet `personnalDataUserInterface`
        const personnalDataUser: personnalDataUserInterface = JSON.parse(storedData);
        return personnalDataUser;
    } else {
        // Si aucune donnée n'existe, renvoyez null
        return null;
    }
}

export function getLocalStorageUser() {
    const storedData = localStorage.getItem("user")
    if (storedData !== null) {
        const Userdata: CustomUser = JSON.parse(storedData)
        return Userdata
    } else return null
}



async function setPersonnalData(userid: string, data: any) {
    const docRef = doc(db, "users", userid)
    await setDoc(docRef, data, { merge: true })
}

async function getPersonnalData(userid: string) {
    try {
        const docRef = doc(db, "users", userid)
        const userDocSnapshot = await getDoc(docRef)
        if (userDocSnapshot.exists()) {
            const dataUser = userDocSnapshot.data();
            console.log("data user : ", dataUser)
            return dataUser
        }
        return null

    } catch (error) {
        console.log("erreur de récupération du firstName")
        return ""
    }

}

export async function getListUtilisateur(): Promise<ListUtilisateurInterface> {
    try {
        // Référencer le document Firestore
        const docRef = doc(db, "users", "ListUtilisateurs");

        // Récupérer le document
        const docSnapshot = await getDoc(docRef);

        // Vérifier si le document existe
        if (!docSnapshot.exists()) {
            console.error("Le document ListUtilisateurs n'existe pas");
            return {} as ListUtilisateurInterface;
        }

        // Récupérer les données du document
        const data = docSnapshot.data() as ListUtilisateurInterface;

        // Vérifier les données récupérées pour la sécurité de type
        if (!data) {
            console.error("Les données récupérées ne sont pas valides");
            return {} as ListUtilisateurInterface;
        }

        // Retourner les données
        return data;
    } catch (error) {
        // Gestion des erreurs
        console.error("Erreur lors de la récupération de la liste des utilisateurs :", error);
        return {} as ListUtilisateurInterface;
    }
}
export async function setListUtilisateur(Listdata: ListUtilisateurInterface) {
    const docRef = doc(db, "users", "ListUtilisateurs")
    const newdata = Listdata as ListUtilisateurInterface
    await setDoc(docRef, newdata, { merge: true })

}



interface listInterface {
    idgraph: string,
    usersId: string[],
    lastUser : string
}
interface ListGraphsInterface {
    nbGraphs: number,
    list: listInterface[]

}
/**
 * 
 * @param graph le nouveau graphe
 * @param uid id de l'utilisateur qui ajoute le graph
 * @param user personnalDataUserInterface
 */
export async function addGraphtest(graph: GraphType, uid: string ,  user : personnalDataUserInterface) {
    const collectionRef = collection(db, "Graphs")
    const docRef = doc(db, "Graphs", "ListGraphs")

    const docSnap = await getDoc(docRef);
    let ListGraphs = docSnap.exists() ? (docSnap.data() as ListGraphsInterface) : { nbGraphs: 0, list: [] };

    const newGraphDocRef = doc(collectionRef);
    const newGraphId = newGraphDocRef.id;

    ListGraphs.list.push({ idgraph: newGraphId, usersId: [uid], lastUser : user.name+ " " + user.firstName} as listInterface)
    ListGraphs.nbGraphs++

    await setDoc(newGraphDocRef, { ...graph, id: newGraphId })

    await setDoc(docRef, ListGraphs, { merge: true })

}

export async function setGraph(graph: GraphType, user : personnalDataUserInterface) {
    try {
        let docRef = doc(db, "Graphs", graph.id)
        await setDoc(docRef, graph, {merge : true})
        docRef = doc(db, "Graphs", "ListGraphs")
        let ListGraphs = (await getDoc(docRef)).data() as ListGraphsInterface
        ListGraphs.list.forEach(element => {
            if(element.idgraph === graph.id) element.lastUser = user.name+" "+user.firstName
        });
        await setDoc(docRef, ListGraphs, {merge :true})

    } catch (error) {
        console.log("impossible de mettre à jour le graph", error)
    }
}


/**
 * 
 * 
 * @param uid uid de l'utilisater
 * @returns list de graphs
 */
export async function getGraph(uid: string) {
    const docRef = doc(db, "Graphs", "ListGraphs")
    let listGraphs = (await getDoc(docRef)).data() as ListGraphsInterface
    let graphPromises = listGraphs.list
        .filter(graph => graph.usersId.includes(uid))
        .map(async (graph) => {

            let docRefGraph = doc(db, "Graphs", graph.idgraph)
            const g = (await getDoc(docRefGraph)).data() as GraphType
            return g
        })

    const results = await Promise.all(graphPromises)
    return results as GraphType[]

}

export async function deleteGraph(graphid: string, uid: string) {
    const docRef = doc(db, "Graphs", "ListGraphs")
    let listGraphs = (await getDoc(docRef)).data() as ListGraphsInterface
    listGraphs.list.forEach((item: listInterface) => {
        if (item.idgraph === graphid) {

            item.usersId = item.usersId.filter(i => i !== uid)

        }
    })

    listGraphs.list = listGraphs.list.filter(element => {
        if (element.usersId.length === 0) {
            const graphdocRef = doc(db, "Graphs", element.idgraph)
            deleteDoc(graphdocRef)
            listGraphs.nbGraphs -= 1
            return false // Ne pas inclure cet élément dans la nouvelle liste
        } else {
            return true // Inclure cet élément dans la nouvelle liste
        }
    });

    await setDoc(docRef, listGraphs, { merge: true })

}

export async function addPartageOtherUser(graphid : string, uid : string){
    const docRef = doc(db, "Graphs", "ListGraphs")
    let listGraphs = (await getDoc(docRef)).data() as ListGraphsInterface
    listGraphs.list.forEach((e)=>{
        if(e.idgraph === graphid) e.usersId.push(uid)
    })
    await setDoc(docRef, listGraphs, {merge : true})
}

export async function deleteAllDataUser (uid : string){
    const user = auth.currentUser
    if(user !== null){
    const ListUsersdocRef = doc(db, "users", "ListUtilisateurs")
    let ListUsersdata = (await getDoc(ListUsersdocRef)).data() as ListUtilisateurInterface
    const newListUsers = {}as ListUtilisateurInterface
    newListUsers.List= ListUsersdata.List.filter((user)=>user.uid !== uid)
    await setDoc(ListUsersdocRef, newListUsers, {merge : true})
    const userDoc = doc(db, "users", uid)
    await deleteDoc(userDoc)
    const ListGraphsDocRef = doc(db, "Graphs", "ListGraphs")
    let ListGraphs = (await getDoc(ListGraphsDocRef)).data() as ListGraphsInterface
    ListGraphs.list.forEach((item: listInterface) => {
        if (item.usersId.includes(uid)) {
            deleteGraph(item.idgraph, uid)
        }
    })
    deleteUser(user).then(()=>{
        console.log("delete du compte réussi")
    }).catch((error)=>{
        console.log(error)
    })
    }

}

export default db
export { CreateGraph, getUserGraphs, setgraph, setPersonnalData, getPersonnalData }