import React, { useContext, useEffect, useState } from "react";
import "./HomeScreen.css";
import { GraphType } from "../types/Graph/GraphType";
import { getGraphFromJSON } from "../primitives/GraphMethods";
import ListGraph from "../components/graphs/ListGraph";
import { CreateGraph, addGraphtest, deleteGraphTest, getGraphtest, getListUtilisateur, getLocalStoragePersonnalData, getLocalStorageUser, getUserGraphs, saveLocalStoragePersonnalData, setPersonnalData } from "../firebase/FireStore.tsx/FirestoreDB";
import { AppContext } from "../context/AppContext";
import HomeSideBar from "../components/SideBar/HomeSideBar";
import CustomSearchBar from "../components/SearchBar/SearchBar";
import { IconButton } from "../components/Buttons/IconButtons";
import { IoAdd, IoReload } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import AddGraphModal from "../components/Modal/AddGraphModal";
import { HugeText, MidTextBold, TitleText } from "../components/Text/CustomText";
import { ValidationButton } from "../components/Buttons/Buttons";
import { useNavigate } from "react-router-dom";

export enum HomeSideBarMenu {
    Graphs = "Graphs",
    Templates = "Templates",
    Favorites = "Favorites"
}

const BASICS_GRAPHS = [
    getGraphFromJSON(require("../constantes/Graph/DefaultGraph1.json") as GraphType),
    getGraphFromJSON(require("../constantes/Graph/DefaultGraph2.json") as GraphType),
    getGraphFromJSON(require("../constantes/Graph/DefaultGraph3.json") as GraphType),
    getGraphFromJSON(require("../constantes/Graph/DefaultGraph4.json") as GraphType),
]

const HomeScreen = () => {

    const [graphs, setGraphs] = useState<GraphType[]>(BASICS_GRAPHS)
    const [displayedGraphs, setDisplayedGraphs] = useState<GraphType[]>(graphs)
    const { user, personnalDataUser, graphsUser, setGraphsUser, graphsPartage, setGraphsPartage, setPersonnalDataUser, setListUtilisateurs, setUser } = useContext(AppContext);
    const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false)
    const [isConnected, setIsConnected] = useState(false)
    const [favorites, setFavorites] = useState<string[]>(personnalDataUser.favorites);
    const [favoritesGraphs, setFavoritesGraphs] = useState<GraphType[]>([]);

    const navigation = useNavigate()
    // Partie Firestore
    useEffect(() => {
        const storagePersonnalData = getLocalStoragePersonnalData()
        const userData = getLocalStorageUser()
        if (storagePersonnalData) {
            setPersonnalDataUser(storagePersonnalData)
            setFavorites(storagePersonnalData.favorites)
        }
        if (userData) {
            setUser(userData)
        }

        const getListFun = async () => {
            try {
                // Attendre le résultat de getListUtilisateur
                const list = await getListUtilisateur();

                // Vérifier que la liste n'est pas null
                if (list !== null) {
                    setListUtilisateurs(list);
                } else {
                    console.warn("La liste d'utilisateurs est vide ou n'a pas pu être récupérée.");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération de la liste d'utilisateurs :", error);
            }
        }
        getListFun()

    }, [])

    useEffect(() => {
        if (user.uid !== "Default") {
            setIsConnected(true)
        }
        else setIsConnected(false)
    }, [user])

    const [menu, setMenu] = useState<HomeSideBarMenu>(HomeSideBarMenu.Graphs);
    const [searchValue, setSearchValue] = useState<string>("");



    useEffect(() => {


        const newFavoritesGraphs: GraphType[] = [];
        const userGraphsIDs = graphsUser.map(graph => graph.id);
        const defaultGraphIDs = graphs.map(graph => graph.id);
        favorites.forEach((graphID) => {
            if (userGraphsIDs.includes(graphID)) {
                newFavoritesGraphs.push(graphsUser.find(graph => graph.id === graphID)!);
            }

            if (defaultGraphIDs.includes(graphID)) {
                newFavoritesGraphs.push(graphs.find(graph => graph.id === graphID)!);

            }
        });
        setFavoritesGraphs(newFavoritesGraphs);

        


    }, [favorites, graphs, graphsUser]);


    useEffect(()=>{
        if(personnalDataUser.name !== "" && isConnected){
            console.log("personnal data : ", personnalDataUser)
            saveLocalStoragePersonnalData({...personnalDataUser, favorites : favorites})
            setPersonnalDataUser({...personnalDataUser, favorites : favorites})
            setPersonnalData(user.uid, {...personnalDataUser, favorites : favorites})

        }
    },[favorites])



    const handleRefresh = async () => {
        const graphCollection = await getGraphtest(user.uid);
        let graphs1 = [] as GraphType[]
        let graphs2 = [] as GraphType[]
        graphCollection.forEach((e) => {
            if (e.proprio === user.uid) graphs1.push(e)
            else graphs2.push(e)
        })
        console.log("graphs1  : ", graphs1, "\n", "graphs2  : ", graphs2)
        setGraphsUser(graphs1);
        setGraphsPartage(graphs2);
        setFavorites(personnalDataUser.favorites)
    };

    useEffect(() => {
        setDisplayedGraphs(graphs.filter(graph => graph.title.toLowerCase().startsWith(searchValue.toLowerCase())))
    }, [searchValue])

    const openAddModal = () => {
        setIsAddModalVisible(true)

    }

    const handleAddGraph = (newGraph: GraphType) => {
        addGraphtest(newGraph, user.uid, personnalDataUser)

        setGraphsUser(prevUserGraphs => [
            newGraph,
            ...prevUserGraphs
        ])
    }

    const userGraphsEmpty = graphsUser.length + graphsPartage.length === 0
    return (
        <div style={{ display: "flex", flexDirection: "row", maxHeight: "100%", flex: 1, boxSizing: "border-box" }}>
            <HomeSideBar menu={menu} setMenu={setMenu} />
            <div className="homeScreenContainer">
                <div className="homeScreenHeader">
                    <CustomSearchBar
                        isWhite
                        placeholder="Chercher une carte..."
                        searchValue={searchValue} setSearchValue={setSearchValue} />
                    <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                        <IconButton Icon={IoReload} onPress={handleRefresh} />

                        <IconButton contrast Icon={IoAdd} onPress={isConnected? openAddModal : ()=>{}} />
                    </div>
                </div>
                <div style={{
                    marginBlock: -20,
                    paddingBlock: 20,
                    marginRight: -10,
                    paddingRight: 10,
                    display: "flex",
                    flexDirection: "column",
                    flex: 1
                }}>
                    {
                        menu === HomeSideBarMenu.Graphs ? (
                            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                                {userGraphsEmpty ? (
                                    <div style={{
                                        flex: 1,
                                        gap: 40,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <HugeText text="Aucune carte !" style={{ fontSize: 40 }} />
                                            
                                            <TitleText bold gray center color="" text={
                                                isConnected ?
                                                "Commencez à créer des cartes personnalisées dès maitenant" :
                                                "Connectez-vous afin de créer des cartes personnalisées"
                                            } />
                                        </div>
                                        {isConnected ?
                                            <ValidationButton text="Créer une carte" onPress={openAddModal} /> :
                                            <ValidationButton text="Connectez-vous" onPress={() => navigation("SignIn")} />
                                        }

                                    </div>
                                ) : (
                                    <div>
                                        {graphsUser.length > 0 && (
                                            <ListGraph
                                                favorites={favorites}
                                                setFavorites={setFavorites}
                                                graphs={graphsUser}
                                                title="Vos cartes"
                                            />
                                        )}
                                        {graphsPartage.length > 0 && (
                                            <ListGraph
                                                favorites={favorites}
                                                setFavorites={setFavorites}
                                                graphs={graphsPartage}
                                                title="cartes partagées"
                                            />
                                        )}
                                    </div>
                                )}
                            </div>)
                            : menu === HomeSideBarMenu.Templates ? (
                                <ListGraph
                                    favorites={favorites}
                                    setFavorites={setFavorites}
                                    graphs={displayedGraphs}
                                    title="Modèles de cartes"
                                />)
                                :
                                <ListGraph
                                    favorites={favorites}
                                    setFavorites={setFavorites}
                                    graphs={favoritesGraphs}
                                    title="Vos Favoris"
                                />
                    }
                </div>

            </div>
            {/* <div style={{padding: 20}}>
                <ValidationButton text="Composants" onPress={handleShowComposants}/>
            </div>
            {
                showComposants &&
                <ComposantsModal onClose={handleCloseComposants}/>
            } */}

            {
                isAddModalVisible &&
                <AddGraphModal user={user} onClose={(newGraph?: GraphType) => {
                    if(newGraph) {
                        handleAddGraph(newGraph)
                    }

                    setIsAddModalVisible(false)
                    }}
                />
            }

        </div>
    );
};

export default HomeScreen;
