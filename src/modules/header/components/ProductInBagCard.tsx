import * as R from 'ramda';
import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { updatedProductProps } from '../../../interfaces';
import removeImage from '../assets/removeImage.png';
import CounterButton from '../../../components/Counter/Button';
import CounterInput from '../../../components/Counter/Input';
import useCounter from '../hooks/useCounter';

const ProductInBagCard = ({ product }: updatedProductProps) => {
    const id = R.prop('id', product);
    const name = R.prop('name', product);
    const price = R.prop('price', product);
    const count = R.prop('count', product);
    const createdAt = R.prop('createdAt', product);
    const date = moment(createdAt).format('LL');

    const {
        removeProductFromOrderHandler,
        increaseOrderCountHandler,
        decreaseOrderCountHandler,
        onChangeTextInputHandler,
        onBlurCountInputHandler,
        updatedCount,
    } = useCounter({ productId: id, count });

    return (
        <Container>
            <TopContent>
                <ProductName>{name}</ProductName>
                <CounterButton onClick={increaseOrderCountHandler}>+</CounterButton>
                <CounterWrapper
                    value={updatedCount}
                    type="number"
                    onChange={onChangeTextInputHandler}
                    onBlur={onBlurCountInputHandler}
                />
                <CounterButton onClick={decreaseOrderCountHandler}>-</CounterButton>

                <Image src={removeImage} onClick={removeProductFromOrderHandler} />
            </TopContent>
            <BottomContent>
                <Date>{date}</Date>
                <Price>${price}</Price>
            </BottomContent>
        </Container>
    );
};

const CounterWrapper = styled(CounterInput)`
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

const Image = styled.img`
    width: 32px;
    height: 32px;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 20px 20px;
    padding: 14px 14px;
    -webkit-box-shadow: 1px -1px 10px 1px rgba(94, 45, 15, 1);
    -moz-box-shadow: 1px -1px 10px 1px rgba(94, 45, 15, 1);
    box-shadow: 1px -1px 10px 1px rgba(94, 45, 15, 1);
    background-color: ${({ theme }) => theme.backgroundsColor.gray};
`;

const TopContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const BottomContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-top: 8px;
`;

const ProductName = styled.div`
    padding-right: 20px;
    ${({ theme }) => theme.fontStyles.h3};
`;

const Price = styled.div`
    color: ${({ theme }) => theme.textColors.green};
    ${({ theme }) => theme.fontStyles.p2};
`;

const Date = styled.div`
    ${({ theme }) => theme.fontStyles.p2};
`;

export default ProductInBagCard;
