import * as R from 'ramda';
import React, { useCallback } from 'react';
import Loader from 'react-loader-spinner';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import styled from 'styled-components';

import locale from 'locale';
import Container from 'components/Container';
import { getProductFromOrder, getTotalPrice, getOrderPiecesSelector } from 'modules/products/ProductsReducer';
import IsEmpty from 'components/IsEmpty';
import Theme from 'components/Theme';
import Button from 'components/Button';

import ProductInBagCard from '../components/ProductInBagCard';
import { createOrder } from '../HeaderActions';

const Bag = () => {
    const dispatch = useDispatch();
    const order = useSelector(getProductFromOrder, shallowEqual);
    const totalPrice = useSelector(getTotalPrice, shallowEqual);
    const orderPieces = useSelector(getOrderPiecesSelector, shallowEqual);

    /**
     * Create order handler
     */
    const createOrderHandler = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        if (!R.isNil(orderPieces)) {
            dispatch(
                createOrder({
                    order: {
                        pieces: orderPieces,
                    },
                }),
            );
        }
    }, []);

    return (
        <>
            {!R.isNil(order) && !R.isEmpty(order) && <TotalPrice>{`${locale.totalPrice} ${totalPrice}`}</TotalPrice>}
            {!R.isNil(order) && !R.isEmpty(order) && (
                <Wrapper>
                    <Button onClick={createOrderHandler}>{locale.createOrder}</Button>
                </Wrapper>
            )}

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
