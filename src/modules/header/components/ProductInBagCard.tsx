import * as R from 'ramda';
import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { updatedProductProps } from 'interfaces';
import CounterButton from 'components/Counter/Button';
import CounterInput from 'components/Counter/Input';

import removeImage from '../assets/removeImage.png';
import removeRedImage from '../assets/removeRedImage.png';
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
                <RemoveButtonWrapper>
                    <Image src={removeImage} onClick={removeProductFromOrderHandler} />
                    <HoverImage src={removeRedImage} onClick={removeProductFromOrderHandler} />
                </RemoveButtonWrapper>
            </TopContent>
            <BottomContent>
                <Date>{date}</Date>
                <BottomContentWrapper>
                    <CounterContainer>
                        <CounterButton onClick={increaseOrderCountHandler}>+</CounterButton>
                        <CounterWrapper
                            value={updatedCount}
                            type="number"
                            onChange={onChangeTextInputHandler}
                            onBlur={onBlurCountInputHandler}
                        />
                        <CounterButton onClick={decreaseOrderCountHandler}>-</CounterButton>
                    </CounterContainer>
                    <Price>${price}</Price>
                </BottomContentWrapper>
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

const HoverImage = styled.img`
    width: 32px;
    height: 32px;
    display: none;
`;

const RemoveButtonWrapper = styled.div`
    &:hover ${Image} {
        display: none;
    }

    &:hover ${HoverImage} {
        display: inline;
    }
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 350px;
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

const CounterContainer = styled.div`
    width: 100%;
    padding-right: 14px;
`;

const BottomContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-top: 8px;
`;

const BottomContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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
