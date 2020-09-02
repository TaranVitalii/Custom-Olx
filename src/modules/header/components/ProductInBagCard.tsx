import * as R from 'ramda';
import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { updatedProductProps } from '../../../interfaces';
import locale from '../../../locale';

const ProductInBagCard = ({ product }: updatedProductProps) => {
    const name = R.prop('name', product);
    const price = R.prop('price', product);
    const count = R.prop('count', product);
    const createdAt = R.prop('createdAt', product);
    const date = moment(createdAt).format('LL');

    /**
     * Add to bag Handler
     */
    return (
        <Container>
            <TopContent>
                <ProductName>{name}</ProductName>
                <Price>${price}</Price>
            </TopContent>
            <BottomContent>
                <Date>{date}</Date>
                <Count>{`${locale.count} ${count}`}</Count>
            </BottomContent>
        </Container>
    );
};

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
    ${({ theme }) => theme.fontStyles.h3};
`;

const Price = styled.div`
    color: ${({ theme }) => theme.textColors.green};
    ${({ theme }) => theme.fontStyles.p2};
`;

const Count = styled.div`
    ${({ theme }) => theme.fontStyles.h3};
`;

const Date = styled.div`
    ${({ theme }) => theme.fontStyles.p2};
`;

export default ProductInBagCard;
