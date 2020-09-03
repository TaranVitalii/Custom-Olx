import * as R from 'ramda';
import React from 'react';
import Loader from 'react-loader-spinner';
import { useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';

import locale from '../../../locale';
import Container from '../../../components/Container';
import { getProductFromOrder, getTotalPrice } from '../../products/ProductsReducer';
import ProductInBagCard from '../components/ProductInBagCard';
import IsEmpty from '../../../components/IsEmpty';
import Theme from '../../../components/Theme';

const Bag = () => {
    const order = useSelector(getProductFromOrder, shallowEqual);
    const totalPrice = useSelector(getTotalPrice, shallowEqual);

    return (
        <>
            {!R.isNil(order) && !R.isEmpty(order) && <TotalPrice>{`${locale.totalPrice} ${totalPrice}`}</TotalPrice>}
            {!R.isNil(order) && !R.isEmpty(order) ? (
                <ContainerWrapper>
                    {order.map((item: any) => (
                        <ProductInBagCard key={R.prop('id', item)} product={item} />
                    ))}
                </ContainerWrapper>
            ) : R.isEmpty(order) ? (
                <Wrapper>
                    <IsEmpty>{locale.yourBagIsEmpty}</IsEmpty>
                </Wrapper>
            ) : (
                <Wrapper>
                    <Loader type="Grid" color={Theme.backgroundsColor.gray} height={80} width={80} />
                </Wrapper>
            )}
        </>
    );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContainerWrapper = styled(Container)`
    padding-left: 200px;
    padding-right: 200px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const TotalPrice = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 50px;
    color: ${({ theme }) => theme.textColors.green};
    ${({ theme }) => theme.fontStyles.h3};
`;

export default Bag;
