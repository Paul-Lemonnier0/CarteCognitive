import React, { CSSProperties, Dispatch, FC, useEffect } from "react"

import "./TextInputStyle.css"
import { CustomCard } from "../Card/CustomCard";
import { IconType } from "react-icons";

interface IconTextInputProps {
    textValue: string,
    Icon: IconType,
    setTextValue?: Dispatch<string>,
    startingValue?: string,
    onChangeCustom?:(e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur?: () => void,
    placeholder?: string,
    iconHover?: boolean,
    style?:CSSProperties,
    passWord ? : boolean,
    isWhite?: boolean,
    numeric?: boolean
}

const IconTextInput: FC<IconTextInputProps> = ({
    startingValue, 
    textValue, 
    setTextValue, 
    onChangeCustom,
    placeholder,
    Icon,
    onBlur,
    iconHover,
    style,
    passWord,
    isWhite,
    numeric
}) => {
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (setTextValue) {
            setTextValue(newValue);
        }    
    }

    const onChangeNumeric = (e: React.ChangeEvent<HTMLInputElement>) => {
    }

    // const numberInput = document.getElementById('inputTest');

    // const onInput = (event: React.FormEvent<HTMLInputElement>): void => {
    //     const regex = /^[0-9]+(?:\/[1-9][0-9]*)?(?:\.[0-9]+)?$/;

    //     if (!regex.test(event.)) {
    // }

    
    return(
        <div style={style? style :{minWidth:50, flex: 1}}>
            <CustomCard customPadding isWhite={isWhite}>
                <div className="textInputSubContainer">
                    <div style={{display: "flex"}} className={iconHover ? "iconHover" : ""}>
                        <Icon size={25}/>
                    </div>
                    
                    <input className="customInput"
                        // pattern={numeric ? "[0-9]+(?:\/[1-9][0-9]*)?(?:\.[0-9]+)?" : undefined}
                        type={passWord ? "password": "text"}
                        onChange={onChangeCustom ?? (numeric ? onChangeNumeric : onChange)}
                        value={textValue}
                        defaultValue={startingValue}
                        placeholder={placeholder}
                        onBlur={onBlur}
                    />
                </div>
            </CustomCard>
        </div>
    )
}

export default IconTextInput