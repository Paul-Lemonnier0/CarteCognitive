import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import "./ModalStyle.css"
import "./HelpModalStyle.css"
import { UsualButton, ValidationButton } from '../Buttons/Buttons';
import { IconButton } from '../Buttons/IconButtons';
import { IoClose } from "react-icons/io5";
import { TbSquareLetterG, TbSquareLetterN, TbSquareLetterS } from "react-icons/tb";
import { TbClick } from "react-icons/tb";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface HelpModalProps {
  onClose: () => void
}

const HelpModal: FC<HelpModalProps> = ({onClose}) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className='ModalOverlay' onClick={onClose}>
          <div className='ModalContainer' onClick={(e) => e.stopPropagation()}>
              
              <div className='ModalCore'>
                  <div className='ModalHeader'>
                    <div className='ModalTitle'>
                        <h3>Aide</h3>
                    </div>
                    <div className='ModalIconClose'>
                      <IconButton Icon={IoClose} onPress={onClose}/>
                    </div>
                  </div>
                  <div className='HM-body'>
                    <div className="HM-subBody">
                      <div className="HM-commandItem">
                        <TbSquareLetterN size={25}/>
                        <p>Créer un nouveau noeud</p>
                      </div>

                      <div className="HM-commandItem">
                        <TbSquareLetterS size={25}/>
                        <p>Supprime les éléments sélectionnés</p>
                      </div>

                      <div className="HM-commandItem">
                        <TbSquareLetterG size={25}/>
                        <p>Grouper les noeuds sélectionnés</p>
                      </div>
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
                    <ValidationButton content="Terminer" onClick={onClose}/>
                  </div>
              </div>
          </div>
            
      </div>
  );
}

export default HelpModal