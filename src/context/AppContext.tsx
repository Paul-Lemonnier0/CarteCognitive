import React, { Dispatch, ReactNode, createContext, useState } from "react";

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
    
}

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
})

interface AppContextProviderProps {
    children: ReactNode
}

export interface PositionType {
    x?: number,
    y?: number
}

const AppContextProvider = ({children}: AppContextProviderProps) => {

    const [isDarkMode, setIsDarkMode] = useState(false)
    const [isWriting, setIsWriting] = useState(false)
    const [colorNode,setColorNode] = useState("#ebedee")
    const [wantSelectColor, setWantSelectColor] = useState<boolean>(false)
    const [cyclique,setCyclique] = useState<boolean>(false)

    return(
        <AppContext.Provider value={{isDarkMode, isWriting, setIsDarkMode, setIsWriting, colorNode, setColorNode, wantSelectColor, setWantSelectColor,cyclique,setCyclique,}}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext, AppContextProvider}