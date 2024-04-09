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
    iconHover?: boolean
}

const CustomSearchBar: FC<CustomSearchBarProps> = ({
    startingValue, 
    searchValue, 
    setSearchValue, 
    placeholder,
    iconHover
}) => {
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearchValue(newValue)
    }
    
    return(
        <IconTextInput 
            iconHover={iconHover}
            Icon={FiSearch}
            startingValue={startingValue}
            placeholder={placeholder}
            textValue={searchValue}
            onChangeCustom={onChange}/>
    )
}

export default CustomSearchBar