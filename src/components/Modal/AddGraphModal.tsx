import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import "./ModalStyle.css"
import "./AddGraphModalStyle.css"
import { UsualButton, ValidationButton } from '../Buttons/Buttons';
import { IconButton } from '../Buttons/IconButtons';
import { IoClose } from "react-icons/io5";
import { TbSquareLetterG, TbSquareLetterN, TbSquareLetterS } from "react-icons/tb";
import { TbClick } from "react-icons/tb";
import IconTextInput from '../TextInput/IconTextInput';
import { RxText } from 'react-icons/rx';

interface AddGraphModalProps {
  onClose: (text?: string) => void
}

const AddGraphModal: FC<AddGraphModalProps> = ({onClose}) => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("")

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
    onClose()
  }


  function saveModal() {
    setIsOpen(false);
    onClose(title)
  }


  const handleSetTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
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
                        <IconTextInput 
                            iconHover
                            Icon={RxText} 
                            textValue={title} 
                            onChangeCustom={handleSetTitle}
                            placeholder="Nom de la carte..."
                        />
                    </div>
                </div>
            </div>

              <div className='ModalFooter'>
                  <div className='ModalButtons'>
                    <ValidationButton text="Ajouter" onPress={saveModal}/>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default AddGraphModal