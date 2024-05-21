import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import "./ModalStyle.css"
import "./AddGraphModalStyle.css"
import { UsualButton, ValidationButton } from '../Buttons/Buttons';
import { IconButton } from '../Buttons/IconButtons';
import { IoClose } from "react-icons/io5";
import { TbSquareLetterG, TbSquareLetterN, TbSquareLetterS } from "react-icons/tb";
import { TbClick } from "react-icons/tb";

interface AddGraphModalProps {
  onClose: () => void
}

const AddGraphModal: FC<AddGraphModalProps> = ({onClose}) => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
    onClose()
  }

  return (
    <div className='ModalOverlay' onClick={closeModal}>
          <div className='ModalContainer' onClick={(e) => e.stopPropagation()}>
              
              <div className='ModalCore'>
                  <div className='ModalHeader'>
                    <div className='ModalTitle'>
                        <h3>Ajouter une carte</h3>
                    </div>
                    <div className='ModalIconClose'>
                      <IconButton Icon={IoClose} onPress={closeModal}/>
                    </div>
                  </div>
                  <div className='HM-body'>
                    <div className="HM-subBody">
                    
                    </div>

                  <div className='HM-subBody separation'>

                      <div className="HM-commandItem">
                        <div id="complexCommand">
                          <h1>CTRL </h1>
                          <p>+</p>
                          <TbClick size={25}/>
                        </div>

                        <p>Sélectionner un noeud</p>
                      </div>

                      <div className="HM-commandItem">
                        <div id="complexCommand">
                          <h1>SHIFT</h1>
                          <p>+</p>
                          <TbClick size={25}/>
                        </div>

                        <p>Sélectionner les noeuds d'une zone</p>
                      </div>
                    </div>
                  </div>
                </div>

              <div className='ModalFooter'>
                  <div className='ModalButtons'>
                    <ValidationButton text="Terminer" onPress={onClose}/>
                  </div>
              </div>
          </div>
            
      </div>
  );
}

export default AddGraphModal