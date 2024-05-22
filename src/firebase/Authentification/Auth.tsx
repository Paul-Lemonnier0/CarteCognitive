import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, User } from "firebase/auth";
import { app } from "../FireBaseConnexion";
import { useNavigate } from "react-router-dom";
export const auth = getAuth(app);



async function SignUpEmailPassword(mail: string, password: string, navigate: any) {

    try{
        const userCredential = await createUserWithEmailAndPassword(auth, mail, password)
        const user = userCredential.user as User
        console.log("création réussie ! :", user);
        navigate("/");
        return user

    }catch(error : any){
            const errorCode = error.code;
            const errorMessage = error.message;

            throw error

    }
}

const SignInEmailPassword = async (mail: string, password: string, navigate: any) => {

    try {
        const userCredential = await signInWithEmailAndPassword(auth, mail, password);
        const user = userCredential.user;
        console.log("Connexion réussie ! :", user);
        navigate("/");
        return user;
    } catch (error : any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Email ou Mot de passe incorrect");
        throw error;
    }
}

export { SignUpEmailPassword, SignInEmailPassword }


