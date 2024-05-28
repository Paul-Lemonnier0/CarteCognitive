import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import "./ModalStyle.css"
import "./HelpModalStyle.css"
import { UsualButton, ValidationButton } from '../Buttons/Buttons';
import { IconButton } from '../Buttons/IconButtons';
import { IoClose } from "react-icons/io5";
import { TbSquareLetterG, TbSquareLetterN, TbSquareLetterP, TbSquareLetterS, TbSquareLetterT } from "react-icons/tb";
import { TbClick } from "react-icons/tb";
import BaseModal from './BaseModal';
import Separator from '../Other/Separator';
import { MdBackspace } from 'react-icons/md';

interface HelpModalProps {
  onClose: () => void
}

const HelpModal: FC<HelpModalProps> = ({ onClose }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }

  return (
    <BaseModal.Overlay onClose={onClose}>
      <BaseModal.Container>
        <BaseModal.Core>
          <BaseModal.Header>
            <BaseModal.HeaderTitle title='Aide' />
            <BaseModal.CloseIcon onClose={onClose} />
          </BaseModal.Header>

          <div className='HM-body'>
            <div className="HM-subBody">
              <div className="HM-commandItem">
                <TbSquareLetterN size={25} />
                <p>Créer un nouveau noeud</p>
              </div>

              <div className="HM-commandItem">
                <TbSquareLetterS size={25} />
                <p>Supprime les éléments sélectionnés</p>
              </div>

              <div className="HM-commandItem">
                <TbSquareLetterG size={25} />
                <p>Grouper les noeuds sélectionnés</p>
              </div>
            </div>

            <Separator />

            <div className='HM-subBody'>

              <div className="HM-commandItem">
                <div id="complexCommand">
                  <h1>CTRL </h1>
                  <p>+</p>
                  <TbClick size={25} />
                </div>

                <p>Sélectionner un noeud</p>
              </div>

              <div className="HM-commandItem">
                <div id="complexCommand">
                  <h1>SHIFT</h1>
                  <p>+</p>
                  <TbClick size={25} />
                </div>

                <p>Sélectionner les noeuds d'une zone</p>
              </div>
            </div>
          </div>
        </BaseModal.Core>

        <BaseModal.Footer>
          <BaseModal.FooterButtons>

            <ValidationButton text="Terminer" onPress={onClose} />

          </BaseModal.FooterButtons>
        </BaseModal.Footer>
      </BaseModal.Container>
    </BaseModal.Overlay>
  );
}


export const HelpModalHome: FC<HelpModalProps> = ({ onClose }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }

  return (
    <BaseModal.Overlay onClose={onClose}>
      <BaseModal.Container>
        <BaseModal.Core>
          <BaseModal.Header>
            <BaseModal.HeaderTitle title='Aide' />
            <BaseModal.CloseIcon onClose={onClose} />
          </BaseModal.Header>

          <div className='HM-body'>
            <div className="HM-subBody">
              <div className="HM-commandItem">
                <TbClick size={25} />
                <p>+</p>
                <TbSquareLetterT size={25} />
                <p>télécharge le graphe en format json</p>
              </div>

              <div className="HM-commandItem">
                <TbClick size={25} />
                <p>+</p>
                <MdBackspace size={25} />
                <p>Supprime les éléments sélectionnés</p>
              </div>

              <div className="HM-commandItem">
                <TbClick size={25} />
                <p>+</p>
                <TbSquareLetterP size={25} />
                <p>affiche la liste des utilisateurs pour partager le(s) graphe(s)</p>
              </div>
            </div>

          </div>
        </BaseModal.Core>

        <BaseModal.Footer>
          <BaseModal.FooterButtons>

            <ValidationButton text="Terminer" onPress={onClose} />

          </BaseModal.FooterButtons>
        </BaseModal.Footer>
      </BaseModal.Container>
    </BaseModal.Overlay >
  );
}

export default HelpModal