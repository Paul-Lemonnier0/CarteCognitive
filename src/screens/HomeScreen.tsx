import React, { useContext, useEffect, useState } from "react"
import "./HomeScreen.css"
import AppTopBar from "../components/TopBar/TopBar"
import { GraphType } from "../types/Graph/GraphType"
import { getGraphFromJSON } from "../primitives/GraphMethods"
import ListGraph from "../components/graphs/ListGraph"
import { getUserGraphs } from "../firebase/FireStore.tsx/FirestoreDB"
import { ValidationButton } from "../components/Buttons/Buttons"
import ComposantsModal from "../components/Modal/ComposantsModal"
import { AppContext } from "../context/AppContext"
import HomeSideBar from "../components/SideBar/HomeSideBar"
import CustomSearchBar from "../components/SearchBar/SearchBar"
import { IconButton } from "../components/Buttons/IconButtons"
import { IoIosAdd } from "react-icons/io"
import { IoReload } from "react-icons/io5"

export enum HomeSideBarMenu {
    Graphs = "Graphs",
    Templates = "Templates",
    Favorites = "Favorites"
}

const HomeScreen = () => {
    const graph1 = getGraphFromJSON(require("../constantes/Graph/DefaultGraph1.json") as GraphType)
    const graph2 = getGraphFromJSON(require("../constantes/Graph/DefaultGraph2.json") as GraphType)
    const graph3 = getGraphFromJSON(require("../constantes/Graph/DefaultGraph3.json") as GraphType)
    const graph4 = getGraphFromJSON(require("../constantes/Graph/DefaultGraph4.json") as GraphType)
    const graphs = [graph1, graph2, graph3, graph4]

    //parie firestore
    const {user, graphsUser} = useContext(AppContext)
    const userid = user.uid
    


    const [showComposants, setShowComposants] = useState<boolean>(false)

    const handleShowComposants = () => {
        setShowComposants(true)
    }

    const handleCloseComposants = () => {
        setShowComposants(false)
    }

    const [menu, setMenu] = useState<HomeSideBarMenu>(HomeSideBarMenu.Graphs)
    const [searchValue, setSearchValue] = useState<string>("")

    const [favorites, setFavorites] = useState<string[]>([])

    return (
        <div style={{display: "flex", flexDirection: "row", maxHeight: "100%", flex: 1, boxSizing: "border-box"}}>
            <HomeSideBar menu={menu} setMenu={setMenu}/>
            <div className="homeScreenContainer">
                <div style={{
                    boxSizing: "border-box",
                    marginInline: -20,
                    paddingInline: 30,
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
                        searchValue={searchValue} setSearchValue={setSearchValue}/>
                    <div style={{display: "flex", flexDirection: "row", gap: 10}}>
                        <IconButton Icon={IoReload} onPress={() => {}}/>
                        <IconButton secondary Icon={IoIosAdd} onPress={() => {}}/>
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
                        <ListGraph 
                            favorites={favorites}
                            setFavorites={setFavorites}
                            graphs={graphsUser} 
                            title = {"Vos cartes"}
                        /> 
                        
                        :
                    (
                        menu === HomeSideBarMenu.Templates ? 
                        <ListGraph 
                            favorites={favorites}
                            setFavorites={setFavorites}
                            graphs={graphs} 
                            title={"Modèles de cartes"}/> :
                        <ListGraph 
                            favorites={favorites}
                            setFavorites={setFavorites}
                            graphs={[]} 
                            title={"Vos Favoris"}
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
    )
}

export default HomeScreen