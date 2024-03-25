import React, { Dispatch, ReactNode, createContext, useState } from "react";

interface AppContextType {
    isDarkMode: boolean,
    setIsDarkMode: Dispatch<React.SetStateAction<boolean>>,
}

const AppContext = createContext<AppContextType>({
    isDarkMode: false,
    setIsDarkMode: () => {}
})

interface AppContextProviderProps {
    children: ReactNode
}

const AppContextProvider = ({children}: AppContextProviderProps) => {

    const [isDarkMode, setIsDarkMode] = useState(false)

    return(
        <AppContext.Provider value={{isDarkMode, setIsDarkMode}}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext, AppContextProvider}