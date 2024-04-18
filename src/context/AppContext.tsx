import React, { Dispatch, ReactNode, createContext, useState } from "react";
import { User } from "firebase/auth";

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
    user : User | CustomUser,
    setUser : any,
    
}

interface CustomUser{
    uid: string;
    email : string | null;
}
const defaultUser: CustomUser = {
    uid: 'Default',
    email: 'example@example.com',
  };

const AppContext = createContext<AppContextType>({
    isDarkMode: false,
    isWriting: false,
    setIsDarkMode: () => {},
    setIsWriting: () => {},
    colorNode: "",
    setColorNode: () => {},
    wantSelectColor: false,
    setWantSelectColor: () => {},
    cyclique: true,
    setCyclique: () => {},
    user : defaultUser,
    setUser:()=>{},
})

interface AppContextProviderProps {
    children: ReactNode
}

export interface PositionType {
    x?: number,
    y?: number
}

const AppContextProvider = ({children}: AppContextProviderProps) => {

    const [user, setUser] = useState(defaultUser)
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [isWriting, setIsWriting] = useState(false)
    const [colorNode,setColorNode] = useState("#ebedee")
    const [wantSelectColor, setWantSelectColor] = useState<boolean>(false)
    const [cyclique,setCyclique] = useState<boolean>(false)

    return(
        <AppContext.Provider value={{isDarkMode, isWriting, setIsDarkMode, setIsWriting, colorNode, setColorNode, wantSelectColor, setWantSelectColor,cyclique,setCyclique, user, setUser}}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext, AppContextProvider}