import React from 'react';
import styled from 'styled-components';

import PriceInput from './PriceInput';
import { MaxMinProps } from '../../../interfaces';
import locale from '../../../locale';

const PriceWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const MaxMinPrice = ({ onBlurMinPriceHandler, onBlurMaxPriceHandler }: MaxMinProps) => (
    <PriceWrapper>
        <PriceInput placeholderValue={locale.minPrice} onBlurHandler={onBlurMinPriceHandler} />
        <PriceInput placeholderValue={locale.maxPrice} onBlurHandler={onBlurMaxPriceHandler} />
    </PriceWrapper>
);

export default MaxMinPrice;
