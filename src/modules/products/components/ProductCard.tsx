import * as R from 'ramda';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';

import { productsListProps } from 'interfaces';

import ShopingBag from '../assets/shopping-bag.png';
import { addToBag } from '../ProductsActions';

const ProductCard = ({ product }: productsListProps) => {
    const dispatch = useDispatch();

    const productId = R.prop('id', product);
    const name = R.prop('name', product);
    const price = R.prop('price', product);
    const createdAt = R.prop('createdAt', product);
    const date = moment(createdAt).format('LL');

    /**
     * Add to bag Handler
     */
    const addToBagHandler = (event: React.MouseEvent<HTMLImageElement, MouseEvent>): void => {
        event.preventDefault();
        dispatch(addToBag(productId));
    };

    return (
        <StyledLink to={`/products/${productId}`}>
            <Container>
                <TopContent>
                    <ProductName>{name}</ProductName>
                    <Price>${price}</Price>
                </TopContent>
                <BottomContent>
                    <Date>{date}</Date>
                    <AddToBagImage src={ShopingBag} onClick={addToBagHandler} />
                </BottomContent>
            </Container>
        </StyledLink>
    );
};

const AddToBagImage = styled.img`
    width: 30px;
    height: 30px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }
    margin: 14px 14px;
    border-radius: 8px;
`;

const Container = styled.div`
    width: 350px;
    display: flex;
    justify-content: center;
    flex-direction: column;
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
    ${({ theme }) => theme.fontStyles.h3};
`;

const Price = styled.div`
    color: ${({ theme }) => theme.textColors.green};
    ${({ theme }) => theme.fontStyles.p2};
`;

const Date = styled.div`
    ${({ theme }) => theme.fontStyles.p2};
`;

export default ProductCard;
