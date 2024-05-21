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
import RadioButton from '../Buttons/RadioButtons';
import { GraphCalculType } from '../../context/GraphContext';
import CustomSelect from '../SelectMenu/CustomSelect';
import { useCalculType } from '../../hooks/useCalculType';
import { PropagationAgretationType } from '../../constantes/InfluanceCalculs';
import Separator from '../Other/Separator';
import { TitleText } from '../Text/CustomText';
import { GraphType } from '../../types/Graph/GraphType';
import { User } from 'firebase/auth';
import { CustomUser } from '../../context/AppContext';
const { v4: uuidv4 } = require('uuid');

interface AddGraphModalProps {
  onClose: (newGraph?: GraphType) => void,
  user: CustomUser | User
}

const AddGraphModal: FC<AddGraphModalProps> = ({onClose, user}) => {
  const [title, setTitle] = useState<string>("")

  function closeModal() {
    onClose()
  }

  function saveModal() {
    const newGraph: GraphType = {
      title,
      proprio: user.uid,
      nodes: [],
      edges: [],
      id: uuidv4(),
      upgrade: false,
      propagation: propagationValue, 
      aggregation: aggretionValue, 
      graphCalculType: graphCalculType
  }

    onClose(newGraph)
  }


  const handleSetTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value)
  }

  const [graphCalculType, setGraphCalculType] = useState<GraphCalculType>(GraphCalculType.Integer)
  const [aggretionValue, setAggretionValue] = useState<PropagationAgretationType>(PropagationAgretationType.ADD)
  const [propagationValue, setPropagationValue] = useState<PropagationAgretationType>(PropagationAgretationType.ADD)

  const {changePropagation, changeAgregation} = useCalculType(setGraphCalculType, setAggretionValue, setPropagationValue)

  return (
    <div className='ModalOverlay' onClick={closeModal}>
          <div className='ModalContainer' onClick={(e) => e.stopPropagation()}> 
            <div className='ModalCore'>
                <div className='ModalHeader' style={{marginTop: 15}}>
                    <div className='ModalTitle'>
                        <TitleText text="Ajouter une carte"/>
                    </div>
                    <div className='ModalIconClose'>
                        <IconButton Icon={IoClose} onPress={closeModal}/>
                    </div>
                </div>
                <div className='HM-body'>
                    <Separator/>

                    <div className="HM-subBody">
                        <IconTextInput 
                            iconHover
                            Icon={RxText} 
                            textValue={title} 
                            onChangeCustom={handleSetTitle}
                            placeholder="Nom de la carte..."
                        />
                    </div>

                    <Separator/>

                    <div className="HM-subBody">
                        <RadioButton.GraphType customGraphCalculType={graphCalculType} handleSetGraphCalculType={setGraphCalculType}/>
                    </div>

                    <Separator/>

                    <div className="HM-subBody">
                      {
                          <div style={{ display: "flex", flexDirection: "column",  gap: 15 }}>
                              <CustomSelect.AggregationPropagation 
                                  disabled={graphCalculType === GraphCalculType.Symbolic} 
                                  value={propagationValue} setValue={changePropagation} graphCalculType={graphCalculType}/>
                              
                              <CustomSelect.AggregationPropagation aggregation
                                  disabled={graphCalculType === GraphCalculType.Symbolic} 
                                  value={aggretionValue} setValue={changeAgregation} 
                                  graphCalculType={graphCalculType}/>
                          </div>
                      } 
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