import React, {useState} from "react";
import "./SelectorButton.css"

interface SelectorButtonInterface{
    text : string,
    style ? : React.CSSProperties,
    onClick : any
}

const SelectorButton = ({text, style, onClick} : SelectorButtonInterface) =>{
    /*TODO
    faire un disigne comme dans word
    */
    const [value, setValue] = useState(false);
    
    return(
        <div className="autoSaveButton" style={style} onClick={onClick}>
            <text>{text}</text>
        </div>
    )

}
export default SelectorButton