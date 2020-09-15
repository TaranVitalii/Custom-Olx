import React from 'react';
import styled from 'styled-components';

import { inputPriceProps } from 'interfaces';

const PriceInput = ({ onBlurHandler, placeholderValue }: inputPriceProps) => (
    <Input type="number" onBlur={onBlurHandler} placeholder={placeholderValue} />
);

const Input = styled.input`
    width: 100px;
    border-radius: 12px;
    margin-right: 10px;
    ${({ theme }) => theme.fontStyles.p3};
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export default PriceInput;
