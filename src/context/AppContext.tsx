import React, { Dispatch, ReactNode, createContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { GraphType } from "../types/Graph/GraphType";
import { getGraphPartageUser, getLocalStoragePersonnalData, getUserGraphs, saveLocalStoragePersonnalData } from "../firebase/FireStore.tsx/FirestoreDB";

interface AppContextType {
    isDarkMode: boolean,
    isWriting: boolean,
    setIsDarkMode: Dispatch<React.SetStateAction<boolean>>,
    setIsWriting: Dispatch<React.SetStateAction<boolean>>,
    colorNode: string,
    setColorNode: Dispatch<React.SetStateAction<string>>,
    wantSelectColor: boolean,
    setWantSelectColor: Dispatch<React.SetStateAction<boolean>>,
    cyclique: boolean,
    setCyclique: Dispatch<React.SetStateAction<boolean>>,
    user: User | CustomUser,
    //TODO changer les any par des types approprié
    setUser: any,
    personnalDataUser: personnalDataUserInterface
    setPersonnalDataUser: any,
    Deconnection: () => void,
    graphsUser: GraphType[],
    graphsPartage: GraphType[],
    setGraphsUser: Dispatch<React.SetStateAction<GraphType[]>>,
    setGraphsPartage: Dispatch<React.SetStateAction<GraphType[]>>,
    ListUtilisateurs: ListUtilisateurInterface,
    setListUtilisateurs: Dispatch<React.SetStateAction<ListUtilisateurInterface>>,
}

export interface ListUtilisateurInterface {
    List : {
        name : string,
        firstName : string,
        uid : string,
    }[]
}
export interface personnalDataUserInterface {
    name: string,
    firstName: string,
    favorites: string[],
    ListGraphsPartage : any[],
}

interface CustomUser {
    uid: string;
    email: string;
}
const defaultUser: CustomUser = {
    uid: 'Default',
    email: 'utilisateur@Default.com',
};

const defaultListUser : ListUtilisateurInterface ={
    List : []
}
const personnalData: personnalDataUserInterface = {
    firstName: '',
    name: '',
    favorites: [],
    ListGraphsPartage : [],
};

const AppContext = createContext<AppContextType>({
    isDarkMode: false,
    isWriting: false,
    setIsDarkMode: () => { },
    setIsWriting: () => { },
    colorNode: "",
    setColorNode: () => { },
    wantSelectColor: false,
    setWantSelectColor: () => { },
    cyclique: true,
    setCyclique: () => { },
    user: defaultUser,
    setUser: () => { },
    personnalDataUser: personnalData,
    setPersonnalDataUser: () => { },
    Deconnection: () => { },
    graphsUser: [],
    graphsPartage : [],
    setGraphsUser: () => { },
    setGraphsPartage: () => { },
    ListUtilisateurs: defaultListUser,
    setListUtilisateurs: ()=>{},
})

interface AppContextProviderProps {
    children: ReactNode
}

export interface PositionType {
    x?: number,
    y?: number
}



const AppContextProvider = ({ children }: AppContextProviderProps) => {

    const [user, setUser] = useState(defaultUser)
    const [personnalDataUser, setPersonnalDataUser] = useState(personnalData)
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [isWriting, setIsWriting] = useState(false)
    const [colorNode, setColorNode] = useState("#ebedee")
    const [wantSelectColor, setWantSelectColor] = useState<boolean>(false)
    const [cyclique, setCyclique] = useState<boolean>(false)
    const [graphsUser, setGraphsUser] = useState<GraphType[]>([])
    const [ListUtilisateurs, setListUtilisateurs] = useState(defaultListUser)
    const [graphsPartage, setGraphsPartage] = useState<GraphType[]>([])

    function Deconnection() {
        setUser(defaultUser)
        setPersonnalDataUser(personnalData)
        saveLocalStoragePersonnalData(personnalData)
    }




    useEffect(() => {
        async function fetchGraphs() {

            try {
                const graphCollection = await getUserGraphs(user.uid);
                setGraphsUser(graphCollection);
                
            } catch (error) {
                console.error("Erreur lors de la récupération des graphiques de l'utilisateur :", error);
            }

        }
        fetchGraphs();

        
    }, [user]);


    return (
        <AppContext.Provider value={{
            isDarkMode, isWriting, setIsDarkMode, setIsWriting, colorNode, setColorNode, wantSelectColor, ListUtilisateurs,
            setWantSelectColor, cyclique, setCyclique, user, setUser, personnalDataUser, setPersonnalDataUser, Deconnection,
            graphsUser, setGraphsUser, setListUtilisateurs, graphsPartage, setGraphsPartage,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider }