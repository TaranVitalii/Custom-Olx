import React from 'react';
import styled from 'styled-components';

import { MaxMinProps } from 'interfaces';
import locale from 'locale';

import PriceInput from './PriceInput';

const MaxMinPrice = ({
    onChangeMaxPriceHandler,
    onChangeMinPriceHandler,
    minPriceValue,
    maxPriceValue,
}: MaxMinProps) => (
    <PriceWrapper>
        <PriceInput
            type="number"
            value={minPriceValue}
            placeholder={locale.minPrice}
            onChange={onChangeMinPriceHandler}
        />
        <PriceInput
            type="number"
            value={maxPriceValue}
            placeholder={locale.maxPrice}
            onChange={onChangeMaxPriceHandler}
        />
    </PriceWrapper>
);

const PriceWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export default MaxMinPrice;
