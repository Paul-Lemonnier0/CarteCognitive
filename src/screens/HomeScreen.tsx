import React, { useContext, useEffect, useState } from "react";
import "./HomeScreen.css";
import AppTopBar from "../components/TopBar/TopBar";
import { GraphType } from "../types/Graph/GraphType";
import { getGraphFromJSON } from "../primitives/GraphMethods";
import ListGraph from "../components/graphs/ListGraph";
import { CreateGraph, getGraphPartageUser, getListUtilisateur, getLocalStoragePersonnalData, getUserGraphs, setListUtilisateur, setPersonnalData, setgraph } from "../firebase/FireStore.tsx/FirestoreDB";
import { ValidationButton } from "../components/Buttons/Buttons";
import ComposantsModal from "../components/Modal/ComposantsModal";
import { AppContext } from "../context/AppContext";
import HomeSideBar from "../components/SideBar/HomeSideBar";
import CustomSearchBar from "../components/SearchBar/SearchBar";
import { IconButton } from "../components/Buttons/IconButtons";
import { IoReload } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { defaultGraphs } from "../constantes/Graph/DefaultGraphs";

export enum HomeSideBarMenu {
    Graphs = "Graphs",
    Templates = "Templates",
    Favorites = "Favorites"
}

const HomeScreen = () => {
    const graph1 = getGraphFromJSON(require("../constantes/Graph/DefaultGraph1.json") as GraphType);
    const graph2 = getGraphFromJSON(require("../constantes/Graph/DefaultGraph2.json") as GraphType);
    const graph3 = getGraphFromJSON(require("../constantes/Graph/DefaultGraph3.json") as GraphType);
    const graph4 = getGraphFromJSON(require("../constantes/Graph/DefaultGraph4.json") as GraphType);
    const graphs = [graph1, graph2, graph3, graph4];
    const { user, personnalDataUser, graphsUser, setGraphsUser, graphsPartage, setGraphsPartage, setPersonnalDataUser, setListUtilisateurs } = useContext(AppContext);


    // Partie Firestore
    useEffect(() => {
        const storagePersonnalData = getLocalStoragePersonnalData()
        if (storagePersonnalData) setPersonnalDataUser(storagePersonnalData)
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
        const getGraphPartageFun=(async () => {
            console.log("list graph : ", personnalDataUser.ListGraphsPartage)
            const graphCollectionPartage = await getGraphPartageUser(personnalDataUser.ListGraphsPartage)
            setGraphsPartage(graphCollectionPartage)
        })
        getGraphPartageFun()

    }, [])


    const [showComposants, setShowComposants] = useState<boolean>(false);

    const handleShowComposants = () => {
        setShowComposants(true);
    };

    const handleCloseComposants = () => {
        setShowComposants(false);
    };

    const [menu, setMenu] = useState<HomeSideBarMenu>(HomeSideBarMenu.Graphs);
    const [searchValue, setSearchValue] = useState<string>("");

    const [favorites, setFavorites] = useState<string[]>(personnalDataUser.favorites ?? []);
    const [favoritesGraphs, setFavoritesGraphs] = useState<GraphType[]>([]);

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

    const handleRefresh = async () => {
        const graphCollection = await getUserGraphs(user.uid);
        setGraphsUser(graphCollection);
    };

    return (
        <div style={{ display: "flex", flexDirection: "row", maxHeight: "100%", flex: 1, boxSizing: "border-box" }}>
            <HomeSideBar menu={menu} setMenu={setMenu} />
            <div className="homeScreenContainer">
                <div style={{
                    boxSizing: "border-box",
                    marginInline: -20,
                    paddingInline: 30,
                    paddingRight: 40,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: 15,
                    gap: 30,
                    borderBottom: '2px solid #d9d7d7'
                }}>
                    <CustomSearchBar
                        isWhite
                        placeholder="Chercher une carte..."
                        searchValue={searchValue} setSearchValue={setSearchValue} />
                    <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                        <IconButton Icon={IoReload} onPress={handleRefresh} />
                        <IconButton secondary Icon={IoIosAdd} onPress={() => {
                            CreateGraph(user.uid, graph1)
                            const updatedGraphsUser = graphsUser
                            updatedGraphsUser.push(graph1)
                            setGraphsUser(updatedGraphsUser)
                        }} />
                    </div>
                </div>
                <div style={{
                    overflowY: 'scroll',
                    marginBlock: -20,
                    paddingBlock: 20,
                    marginRight: -10,
                    paddingRight: 10
                }}>
                    {
                        menu === HomeSideBarMenu.Graphs ?
                            <div>
                                <ListGraph
                                    favorites={favorites}
                                    setFavorites={setFavorites}
                                    graphs={graphsUser}
                                    title="Vos cartes"
                                />
                                <ListGraph
                                    favorites={favorites}
                                    setFavorites={setFavorites}
                                    graphs={graphsPartage}
                                    title="cartes partagées"
                                />
                            </div>
                            :
                            (
                                menu === HomeSideBarMenu.Templates ?
                                    <ListGraph
                                        favorites={favorites}
                                        setFavorites={setFavorites}
                                        graphs={graphs}
                                        title="Modèles de cartes" /> :
                                    <ListGraph
                                        favorites={favorites}
                                        setFavorites={setFavorites}
                                        graphs={favoritesGraphs}
                                        title="Vos Favoris"
                                    />
                            )
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
        </div>
    );
};

export default HomeScreen;
