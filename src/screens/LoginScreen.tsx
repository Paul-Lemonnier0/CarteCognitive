import React, { CSSProperties, useContext, useState } from 'react';
import { SignInEmailPassword } from '../firebase/Authentification/Auth';
import { useNavigate } from 'react-router-dom';
import { SmallText, TitleText } from '../components/Text/CustomText';
import IconTextInput from '../components/TextInput/IconTextInput';
import { IoMailOpenOutline } from 'react-icons/io5';
import { CheckButton, GoBackButton } from '../components/Buttons/IconButtons';
import { TbPasswordUser } from "react-icons/tb";
import "./LoginScreen.css"
import { AppContext } from '../context/AppContext';
import { getPersonnalData } from '../firebase/FireStore.tsx/FirestoreDB';


const LoginScreen = () => {
    const {setUser, setPersonnalDataUser} = useContext(AppContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordMessageClass, setPasswordMessageClass] = useState('MessageErrorHidden');
    const [passwordMessage, setPasswordMessage] = useState("");
    const [mailMessage, setMailMessage] = useState('MessageErrorHidden');
    const [mailMessageClass, setMailMessageClass] = useState('MessageErrorHidden');

    

    const styleInput: CSSProperties = {
        minWidth: 50,
        width: "auto",
        margin: "10px",
    }

    const Validation = async () => {

        

        if (password === "") {
            setPasswordMessage('Mot de passe manquant')
            setPasswordMessageClass("MessageError")
        }
        if(email ===""){
            setMailMessage('Email manquant')
            setMailMessageClass("MessageError")
        }       
        else {
            try {
                const user = await SignInEmailPassword(email, password, navigate);
                setUser(user);
                const PersonnalData = await getPersonnalData(user.uid)
                setPersonnalDataUser(PersonnalData)
                console.log("user connecté : ", user);
            } catch (error) {
                console.error("Erreur de connexion :", error);
            }
        }
    }


    return (

        <div id='SignInDiv'>
            <div id='GoBackButton'>
                <GoBackButton onPress={() => { navigate(-1) }} />
            </div>
            <TitleText text='Connection' />
            <div className={mailMessageClass}><SmallText text={mailMessage} color='red' /></div>
            <IconTextInput textValue={email} Icon={IoMailOpenOutline} placeholder='Entrez votre mail...' setTextValue={setEmail} style={styleInput} />
            <div className={passwordMessageClass}><SmallText text={passwordMessage} color='red' /></div>
            <IconTextInput textValue={password} Icon={TbPasswordUser} placeholder='Mot de Passe...' setTextValue={setPassword} style={styleInput} passWord />
            <CheckButton onPress={Validation} />
        </div>


    );
};

export default LoginScreen;
