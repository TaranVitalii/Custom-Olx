import * as R from 'ramda';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import locale from '../../../locale';
import Container from '../../../components/Container';
import { getProductFromOrder, getTotalPrice } from '../../products/ProductsReducer';
import ProductInBagCard from '../components/ProductInBagCard';

const Bag = () => {
    const order = useSelector(getProductFromOrder);
    const totalPrice = useSelector(getTotalPrice);

    return (
        <>
            <ContainerWrapper>
                {!R.isNil(order) &&
                    !R.isEmpty(order) &&
                    order.map((item: any) => <ProductInBagCard key={R.prop('id', item)} product={item} />)}
            </ContainerWrapper>
            {!R.isNil(order) && !R.isEmpty(order) && <TotalPrice>{`${locale.totalPrice} ${totalPrice}`}</TotalPrice>}
        </>
    );
};

const ContainerWrapper = styled(Container)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const TotalPrice = styled.div`
    position: absolute;
    top: 120px;
    right: 60px;
    color: ${({ theme }) => theme.textColors.green};
    ${({ theme }) => theme.fontStyles.h3};
`;

export default Bag;
