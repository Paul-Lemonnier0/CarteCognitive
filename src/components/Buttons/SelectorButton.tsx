import React from "react";
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
    
    return(
        <div className="autoSaveButton" style={style} onClick={onClick}>
            <text>{text}</text>
        </div>
    )
}
interface ToggleButtonInterface {
    isActive : boolean
    setIsActive : any,
    style ? : React.CSSProperties,
}

const ToggleButton = ({isActive, style, setIsActive} : ToggleButtonInterface) => {
  
    // Fonction pour basculer l'état du bouton
    const toggleButton = () => {
      setIsActive(!isActive); // Inverse l'état actuel
    };
  
    return (
      <label className="toggleSwitch" style={style}>
        <input
          type="checkbox"
          checked={isActive}
          onChange={toggleButton}
        />
        <span className="slider"></span>
      </label>
    );
  };

export default SelectorButton
export {SelectorButton, ToggleButton}