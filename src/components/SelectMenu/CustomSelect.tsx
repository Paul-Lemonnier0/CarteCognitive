import React, { FC, ReactNode } from 'react';
import { CustomCard } from '../Card/CustomCard';
import { GraphCalculType } from '../../context/GraphContext';
import { PropagationAgretationType } from '../../constantes/InfluanceCalculs';
import { MidTextBold } from '../Text/CustomText';

type CustomSelectProps = {
    title: string,
    value: any;
    setValue: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    disabled?: boolean,
    children: ReactNode
};

const CustomSelect: 
    FC<CustomSelectProps> 
    & { AggregationPropagation: FC<AggPropProps> } 
= ({ title, value, setValue, disabled, children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10}}>
        <MidTextBold text={title} />
        <CustomCard customPadding disabled={disabled}>
            <select
                disabled={disabled}
                style={{ borderRight: '16px solid transparent' }}
                name="PropagationVal"
                id="edgeBoolVals"
                value={value}
                onChange={setValue}
            >
                {children}
            </select>
        </CustomCard>
    </div>
  );
};

interface AggPropProps {
  graphCalculType: GraphCalculType;
  value: any;
  setValue: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  title?: string,
  aggregation?: boolean,
  disabled?: boolean
}

const AggregationPropagation: FC<AggPropProps> = ({ disabled, graphCalculType, value, setValue, title, aggregation }) => {
  return (
    <CustomSelect disabled={disabled} title={title ?? (aggregation ? 'Aggregation' : 'Propagation')} value={value} setValue={setValue}>
      {
        !disabled &&
            (graphCalculType === GraphCalculType.Integer ? (
                <>
                  <option value={PropagationAgretationType.MIN}>min</option>
                  <option value={PropagationAgretationType.MAX}>max</option>
                  <option value={PropagationAgretationType.MULTIPLY}>*</option>
                  <option value={PropagationAgretationType.ADD}>+</option>
                  <option value={PropagationAgretationType.SUBSCTRACT}>-</option>
                  <option value={PropagationAgretationType.AVG}>moyenne</option>
                </>
              ) : 
                <>
                  <option value={PropagationAgretationType.AND}>∧</option>
                  <option value={PropagationAgretationType.OR}>V</option>
                </>)
        
      }
    </CustomSelect>
  );
};

CustomSelect.AggregationPropagation = AggregationPropagation;

export default CustomSelect;
