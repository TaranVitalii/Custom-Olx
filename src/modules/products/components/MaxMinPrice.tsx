import React from 'react';
import styled from 'styled-components';

import { MaxMinProps } from 'interfaces';
import locale from 'locale';

import PriceInput from './PriceInput';

const MaxMinPrice = ({ onBlurMinPriceHandler, onBlurMaxPriceHandler }: MaxMinProps) => (
    <PriceWrapper>
        <PriceInput placeholderValue={locale.minPrice} onBlurHandler={onBlurMinPriceHandler} />
        <PriceInput placeholderValue={locale.maxPrice} onBlurHandler={onBlurMaxPriceHandler} />
    </PriceWrapper>
);

const PriceWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export default MaxMinPrice;
