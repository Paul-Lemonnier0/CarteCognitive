import React, { Dispatch, FC } from "react"
import "./SearchBarStyle.css"
import "./../TextInput/TextInputStyle.css"
import { FiSearch } from "react-icons/fi";
import IconTextInput from "../TextInput/IconTextInput";

interface CustomSearchBarProps {
    searchValue: string,
    setSearchValue: Dispatch<string>,
    startingValue?: string,
    placeholder?: string,
    iconHover?: boolean,
    isWhite?: boolean
}

const CustomSearchBar: FC<CustomSearchBarProps> = ({
    startingValue, 
    searchValue, 
    setSearchValue, 
    placeholder,
    iconHover,
    isWhite
}) => {
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearchValue(newValue)
    }
    
    return(
        <IconTextInput 
            isWhite={isWhite}
            iconHover={iconHover}
            Icon={FiSearch}
            startingValue={startingValue}
            placeholder={placeholder}
            textValue={searchValue}
            onChangeCustom={onChange}/>
    )
}

export default CustomSearchBar