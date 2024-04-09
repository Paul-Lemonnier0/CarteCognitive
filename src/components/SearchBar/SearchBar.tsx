import React, { Dispatch, FC } from "react"
import { IoSearch } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

import "./SearchBarStyle.css"
import { CustomCard } from "../Card/CustomCard";
import { FiSearch } from "react-icons/fi";

interface CustomSearchBarProps {
    searchValue: string,
    setSearchValue: Dispatch<string>,
    startingValue?: string,
    isExpanded?: boolean
}

const CustomSearchBar: FC<CustomSearchBarProps> = ({startingValue, searchValue, setSearchValue, isExpanded}) => {
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearchValue(newValue)
    }
    
    return(
        <div style={{minWidth: 50}}>
            <CustomCard customPadding>
                <div className="searchBarSubContainer">
                    <div id="searchIconContainer">
                    <FiSearch size={25}/>
                    </div>
                    
                        <input className="customSearchBarInput"
                            onChange={onChange}
                            value={searchValue}
                            defaultValue={startingValue}
                            placeholder="Chercher un noeud..."/>
                    
                </div>
            </CustomCard>
        </div>
    )
}

export default CustomSearchBar