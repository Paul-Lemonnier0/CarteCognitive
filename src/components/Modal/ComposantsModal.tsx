import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import "./ModalStyle.css"
import "./ComposantsModalStyle.css"
import { UsualButton, ValidationButton } from '../Buttons/Buttons';
import { CheckButton, GoBackButton, IconButton } from '../Buttons/IconButtons';
import { IoClose } from "react-icons/io5";
import { TbSquareLetterG, TbSquareLetterN, TbSquareLetterS } from "react-icons/tb";
import { TbClick } from "react-icons/tb";
import { LuTreeDeciduous } from "react-icons/lu";
import CustomSearchBar from '../SearchBar/SearchBar';
import IconTextInput from '../TextInput/IconTextInput';
import { IoMailOpenOutline } from "react-icons/io5";
import { MidText, MidTextBold, NormalText, SmallText, TitleText } from '../Text/CustomText';
import { ToggleButton } from '../Buttons/SelectorButton';

interface ComposantsModalProps {
    onClose: () => void
}

const ComposantsModal: FC<ComposantsModalProps> = ({ onClose }) => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [isActive, setIsActive] = useState(false)

    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }

    const [searchValue, setSearchValue] = useState<string>("")
    const [textValue, setTextValue] = useState<string>("")

    return (
        <div className='ModalOverlay' onClick={onClose}>
            <div className='ModalContainer' onClick={(e) => e.stopPropagation()}>

                <div className='ModalCore'>
                    <div className='ModalHeader'>
                        <div className='ModalTitle'>
                            <h3>Composants</h3>
                        </div>
                        <div className='ModalIconClose'>
                            <IconButton Icon={IoClose} onPress={onClose} />
                        </div>
                    </div>

                    <div id="Composants-body">

                        <div>
                            <h3>Boutons icon</h3>
                            <div className='composantsRow'>
                                <IconButton Icon={LuTreeDeciduous} onPress={() => { }} />
                                <GoBackButton onPress={() => { }} />
                                <CheckButton onPress={() => { }} />
                            </div>
                        </div>

                        <div>
                            <h3>Boutons text</h3>
                            <div className='composantsRow'>
                                <ValidationButton text="Valider" onPress={() => { }} />
                                <UsualButton text="Annuler" onPress={() => { }} />
                            </div>
                        </div>

                        <div>
                            <h3>Input</h3>
                            <div className='composantsRow'>
                                <CustomSearchBar searchValue={searchValue} placeholder='Rechercher...' setSearchValue={setSearchValue} />
                                <IconTextInput textValue={textValue} Icon={IoMailOpenOutline} placeholder='Entrez votre mail...' setTextValue={setTextValue} />
                            </div>
                        </div>

                        <div>
                            <h3>Text</h3>
                            <div className='composantsCol'>
                                <div className='composantsRow'>
                                    <SmallText text="SmallText" />
                                    <SmallText text="SmallText" bold />
                                </div>
                                <div className='composantsRow'>
                                    <NormalText text="NormalText" />
                                    <NormalText text="NormalText" bold />
                                </div>
                                <div className='composantsRow'>
                                    <MidText text="MidText" />
                                    <MidText text="MidText" bold />
                                </div>
                                <div className='composantsRow'>
                                    <MidTextBold text="MidTextBold" />
                                    <MidTextBold text="MidTextBold" bold />
                                </div>
                                <div className='composantsRow'>
                                    <TitleText text="TitleText" />
                                    <TitleText text="TitleText" bold />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3>Intérupteur</h3>
                            <ToggleButton
                                isActive={isActive}
                                setIsActive={setIsActive}
                                style={{
                                    

                                }}
                            />
                        </div>

                    </div>

                </div>

                <div className='ModalFooter'>
                    <div className='ModalButtons'>
                        <ValidationButton text="Terminer" onPress={onClose} />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ComposantsModal