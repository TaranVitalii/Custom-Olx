import React from 'react';
import styled from 'styled-components';

import { productsListProps } from '../../../interfaces';

const Product = ({ product }: productsListProps) => {
    const name = product.name;
    const price = product.price;
    const date = product.createdAt;

    return (
        <Container>
            <ProductName>{name}</ProductName>
            <Price>{price}</Price>
            <Date>{date}</Date>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    padding: 12 12;
`;

const ProductName = styled.div`
    ${({ theme }) => theme.fontStyles.h3};
`;

const Price = styled.div`
    ${({ theme }) => theme.fontStyles.h2};
`;

const Date = styled.div`
    ${({ theme }) => theme.fontStyles.p2};
`;

export default Product;
