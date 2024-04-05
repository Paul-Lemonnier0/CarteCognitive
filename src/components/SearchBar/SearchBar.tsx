import React, { Dispatch, FC } from "react"
import { IoSearch } from "react-icons/io5";

import "./SearchBarStyle.css"
import { CustomCard } from "../Card/CustomCard";

interface CustomSearchBarProps {
    searchValue: string,
    setSearchValue: Dispatch<string>,
    startingValue?: string
}

const CustomSearchBar: FC<CustomSearchBarProps> = ({startingValue, searchValue, setSearchValue}) => {
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearchValue(newValue)
    }
    
    return(
        <CustomCard>
            <IoSearch size={24}/>
            <input className="customSearchBarInput"
                onChange={onChange}
                value={searchValue}
                defaultValue={startingValue}
                placeholder="Chercher un noeud..."/>
        </CustomCard>
    )
}

export default CustomSearchBar