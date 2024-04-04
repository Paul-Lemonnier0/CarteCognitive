import React, { FC } from "react"
import { IoSearch } from "react-icons/io5";

import "./SearchBarStyle.css"
import { CustomCard } from "../Card/CustomCard";

interface CustomSearchBarProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    startingValue?: string
}

const CustomSearchBar: FC<CustomSearchBarProps> = ({onChange, startingValue}) => {
    return(
        <CustomCard>
            <IoSearch size={24}/>
            <input className="customSearchBarInput"
                onChange={onChange}
                defaultValue={startingValue}
                placeholder="Chercher un noeud..."/>
        </CustomCard>
    )
}

export default CustomSearchBar