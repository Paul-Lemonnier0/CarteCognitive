import React, { Dispatch, MouseEvent, ReactNode, createContext, useState } from "react";

interface AppContextType {
    isDarkMode: boolean,
    isWriting: boolean,
    setIsDarkMode: Dispatch<React.SetStateAction<boolean>>,
    setIsWriting: Dispatch<React.SetStateAction<boolean>>,
}

const AppContext = createContext<AppContextType>({
    isDarkMode: false,
    isWriting: false,
    setIsDarkMode: () => {},
    setIsWriting: () => {},
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

    return(
        <AppContext.Provider value={{isDarkMode, isWriting, setIsDarkMode, setIsWriting}}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext, AppContextProvider}