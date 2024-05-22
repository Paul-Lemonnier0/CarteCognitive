import React, { Dispatch, FC, useContext, useEffect, useState } from "react"
import "./HomeSideBarStyle.css"
import { IconButton, IconTextButton } from "../Buttons/IconButtons"
import { useNavigate } from "react-router-dom"
import { IoSettingsOutline } from "react-icons/io5"


import { GraphContext } from "../../context/GraphContext"
import { AppContext } from "../../context/AppContext"
import ProfilButton from "../Profil/ProfilButton"
import { MdLogout } from "react-icons/md"
import { MidText, MidTextBold, NormalText, TitleText } from "../Text/CustomText"
import { PiGraph } from "react-icons/pi"
import { FaRegStar } from "react-icons/fa6"
import { TbTemplate } from "react-icons/tb"
import { HomeSideBarMenu } from "../../screens/HomeScreen"
import { UsualButton, ValidationButton } from "../Buttons/Buttons"
import BaseModal from "../Modal/BaseModal"
import IconTextInput from "../TextInput/IconTextInput"
import { RxText } from "react-icons/rx"
import { deleteAllDataUser, saveLocalStoragePersonnalData, setListUtilisateur, setPersonnalData } from "../../firebase/FireStore.tsx/FirestoreDB"

enum SideBarMenuType {
    Edit = "Edit",
    Calcul = "Calcul",
    Settings = "Settings"
}

interface HomeSideBarProps {
    menu: HomeSideBarMenu,
    setMenu: Dispatch<HomeSideBarMenu>,
}

const HomeSideBar: FC<HomeSideBarProps> = ({
    menu,
    setMenu
}) => {

    const { isCalculating, setIsCalculating, isGraphModified, nodes, edges, id, graphTitle, upgrade } = useContext(GraphContext)
    const { user, ListUtilisateurs, setListUtilisateurs, setPersonnalDataUser, personnalDataUser, Deconnection } = useContext(AppContext)
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [ProfilSelected, setProfilSelected] = useState<boolean>(false)
    const [isModif, setIsModif] = useState<boolean>(false)
    const [name, setName] = useState<string>(personnalDataUser.name)
    const [firstName, setFirstName] = useState<string>(personnalDataUser.firstName)


    useEffect(() => {
        setName(personnalDataUser.name)
        setFirstName(personnalDataUser.firstName)
    }, [personnalDataUser])

    const navigation = useNavigate()
    const handleChangeExpandState = () => {
        setIsExpanded(!isExpanded)
    }

    const handleChangeMenu = (menu: HomeSideBarMenu) => {
        setMenu(menu)
    }

    const handleProfile = () => {
        setProfilSelected(true)
    }

    const handlemodif = () => {
        setIsModif(true)
    }
    const handledelete = () => {
        //TODO faire la fonction de suppresion des données sur firebase
        const choice = window.confirm("êtes-vous sur de supprimer votre compte? cette action sera définitive")
        if (choice){
        Deconnection()
        deleteAllDataUser(user.uid)
        }
    }

    const SaveModif = () => {
        const newPersonnalData = { ...personnalDataUser }
        newPersonnalData.firstName = firstName
        newPersonnalData.name = name
        setPersonnalDataUser(newPersonnalData)
        saveLocalStoragePersonnalData(newPersonnalData)
        setPersonnalData(user.uid, newPersonnalData)
        //TODO modifier la liste utilisateur
        const newListUtilisateurs = { ...ListUtilisateurs }
        newListUtilisateurs.List.forEach((element) => {
            if (user.uid === element.uid) {
                element.name = name
                element.firstName = firstName
            }
        })
        setListUtilisateurs(newListUtilisateurs)
        setListUtilisateur(newListUtilisateurs)
        setIsModif(false)
        setProfilSelected(false)
    }

    const dontSaveModif = () => {
        setName(personnalDataUser.name)
        setFirstName(personnalDataUser.firstName)
        setIsModif(false)
        setProfilSelected(false)

    }

    return (

        <div className={`homeSideBarContainer ${isExpanded ? "expanded" : ""}`}>
            {personnalDataUser.name !== "" ? (
                //cas ou connecté

                !ProfilSelected ? (
                    <div onClick={handleProfile} id="header" style={{ userSelect: "none", cursor: "pointer" }} >
                        <ProfilButton name={personnalDataUser.name} />
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 0 }}>
                            <MidText bold text={personnalDataUser.name} />
                            <NormalText bold text={personnalDataUser.firstName} />
                        </div>

                    </div>
                )
                    : (
                        <div id="header" style={{ userSelect: "none", cursor: "pointer" }} >
                            <ProfilButton onClick={() => { setProfilSelected(false); setIsModif(false) }} name={personnalDataUser.name} />
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 0 }}>
                                <UsualButton text="Modifier" onPress={handlemodif}></UsualButton>
                                <UsualButton text="supprimer" onPress={handledelete}></UsualButton>
                            </div>

                        </div>

                    )
            ) :
                //cas non connecté
                <div id="header" style={{ userSelect: "none" }}>
                    <UsualButton text="Connexion" onPress={() => navigation("SignIn")}></UsualButton>
                    <UsualButton text="Inscription" onPress={() => navigation("SignUp")}></UsualButton>
                </div>}


            <div id="body">
                <div className="homeSideBarListItem">
                    <IconTextButton
                        text="Vos cartes"
                        isSelected={menu === HomeSideBarMenu.Graphs}
                        onPress={() => handleChangeMenu(HomeSideBarMenu.Graphs)}
                        Icon={PiGraph} />
                </div>

                <div className="homeSideBarListItem">
                    <IconTextButton
                        text="Modèles"
                        isSelected={menu === HomeSideBarMenu.Templates}
                        onPress={() => handleChangeMenu(HomeSideBarMenu.Templates)}
                        Icon={TbTemplate} />
                </div>

                <div className="homeSideBarListItem">
                    <IconTextButton
                        text="Favoris"
                        isSelected={menu === HomeSideBarMenu.Favorites}
                        onPress={() => handleChangeMenu(HomeSideBarMenu.Favorites)}
                        Icon={FaRegStar} />
                </div>
            </div>

            <div id="footer">
                <li className="utilsSideBarItem" onClick={handleChangeExpandState}>
                    <span style={{ marginLeft: -15 }}>
                        <IconButton Icon={IoSettingsOutline} onPress={() => { }} />
                    </span>
                    <MidText bold text="Paramètres" />


                </li>
                <li className="utilsSideBarItem" onClick={handleChangeExpandState}>
                    <span style={{ marginLeft: -15 }}>
                        <IconButton Icon={MdLogout} onPress={() => {
                            Deconnection()
                        }} />
                    </span>
                    <MidText bold text="Déconnexion" />

                </li>
            </div>
            {
                isModif ?
                    (<BaseModal.Overlay onClose={() => { }}>
                        <BaseModal.Container>
                            <BaseModal.Core>
                                <BaseModal.Header>
                                    <BaseModal.HeaderTitle title="Information Personnel" />
                                    <BaseModal.CloseIcon onClose={() => {
                                        if (personnalDataUser.name !== name || personnalDataUser.firstName !== firstName) {
                                            if (window.confirm("voulez vous sauvegarder ?"))
                                                SaveModif();
                                            else {
                                                dontSaveModif()
                                            }
                                        } else {
                                            setIsModif(false)
                                        }
                                    }} />
                                </BaseModal.Header>
                                <BaseModal.Body>
                                    <MidText bold text="Prénom"></MidText>
                                    <IconTextInput Icon={RxText} textValue={name} setTextValue={setName}></IconTextInput>
                                    <MidText bold text="nom"></MidText>
                                    <IconTextInput Icon={RxText} textValue={firstName} setTextValue={setFirstName}></IconTextInput>


                                </BaseModal.Body>

                            </BaseModal.Core>
                            <BaseModal.Footer>
                                <BaseModal.FooterButtons>

                                    <ValidationButton text="Terminer" onPress={SaveModif} />

                                </BaseModal.FooterButtons>
                            </BaseModal.Footer>
                        </BaseModal.Container>
                    </BaseModal.Overlay>)
                    :
                    (null)
            }
        </div >
    )
}

export default HomeSideBar