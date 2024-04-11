import React, { useState } from 'react';
import './CircleImage.css'; // Assurez-vous d'avoir un fichier CSS pour styliser le composant
import { FaUser } from 'react-icons/fa6';
import { IconType } from 'react-icons';

interface CircleImageInterface {
    imageUrl ? : string,
    defaultIcon : IconType
}

const CircleImage = ({ imageUrl, defaultIcon } : CircleImageInterface) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
      setImageError(true);
    };
  
    return (
      <div className="circle-image-container" >
        {imageUrl ? (
          <img src={imageUrl} alt="User" className="circle-image"  />
        ) : (
          <div className="circle-image" style={{backgroundColor:"grey"}}>
            { React.createElement(defaultIcon, {size:50})}
          </div>
        )}
      </div>
    );
};

export default CircleImage;
