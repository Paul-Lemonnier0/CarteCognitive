import React, { CSSProperties, useContext, useState } from 'react';
import { SignUpEmailPassword } from '../firebase/Authentification/Auth';
import { useNavigate } from 'react-router-dom';
import { CheckButton, GoBackButton } from '../components/Buttons/IconButtons';
import { SmallText, TitleText } from '../components/Text/CustomText';
import IconTextInput from '../components/TextInput/IconTextInput';
import { IoMailOpenOutline } from 'react-icons/io5';
import { TbPasswordUser } from "react-icons/tb";
import { AppContext } from '../context/AppContext';

//TODO créer un nouvelle utilisateur dans firestore quand je signUp


const SignUpScreen = () => {
    const {setUser} = useContext(AppContext)

    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerif, setPasswordVerif] = useState('');
    const [passwordMessageClass, setPasswordMessageClass] = useState('MessageErrorHidden');
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordMessageVerif, setPasswordMessageVerif] = useState("");
    const [mailMessage, setMailMessage] = useState('');
    const [mailMessageClass, setMailMessageClass] = useState('MessageErrorHidden');
    const [passwordClassVerif, setPasswordClassVerif] = useState('MessageErrorHidden');
    const [PasswordValide, setPasswordValide] = useState(false);
    const [emailValide, setemailValide] = useState(false);


    const styleInput: CSSProperties = {
        minWidth: 50,
        width: "auto",
        margin: "10px",
    }

    function Validation() {
        if (password === "") {
            setPasswordMessage('Mot de passe manquant')
            setPasswordMessageClass("MessageError")
        } else if (password.length < 6) {
            setPasswordMessage('Mot de passe trop cours')
            setPasswordMessageClass("MessageError")
        } else if (password !== passwordVerif) {
            setPasswordMessageVerif('Mot de passe différent')
            setPasswordClassVerif("MessageError")

        }

        else {
            setPasswordMessageClass("MessageErrorHidden")
            setPasswordValide(true)
        }
        if (email === "") {
            setMailMessage('Email manquant')
            setMailMessageClass("MessageError")
        }
        else {
            setMailMessageClass("MessageErrorHidden")
            setemailValide(true)
        }

        if (PasswordValide && emailValide) {
            try {
                const user = SignUpEmailPassword(email, password, navigate)
                setUser(user);
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
        <TitleText text='Sign Up' />
        <div className={mailMessageClass}><SmallText text={mailMessage} color='red' /></div>
        <IconTextInput textValue={email} Icon={IoMailOpenOutline} placeholder='Entrez votre mail...' setTextValue={setEmail} style={styleInput} />
        <div className={passwordMessageClass}><SmallText text={passwordMessage} color='red' /></div>
        <IconTextInput textValue={password} Icon={TbPasswordUser} placeholder='Mot de Passe...' setTextValue={setPassword} style={styleInput} passWord />
        <div className={passwordClassVerif}><SmallText text={passwordMessageVerif} color='red' /></div>
        <IconTextInput textValue={passwordVerif} Icon={TbPasswordUser} placeholder='Mot de Passe...' setTextValue={setPasswordVerif} style={styleInput} passWord />
        <CheckButton onPress={Validation} />
    </div>


);
};

export default SignUpScreen;
