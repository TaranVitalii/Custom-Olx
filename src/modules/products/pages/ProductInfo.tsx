import * as R from 'ramda';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';

import { productSummaryProps } from '../../../interfaces';
import Container from '../../../components/Container';
import locale from '../../../locale';
import { fetchProductById } from '../ProductsActions';
import { getCurrentProductSelector } from '../ProductsReducer';

const ProductInfo = () => {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const currentProduct: productSummaryProps | null = useSelector(getCurrentProductSelector);
    const name: string | null = R.propOr(null, 'name', currentProduct);
    const price: string | null = R.propOr(null, 'price', currentProduct);
    const createdAt: string | null = R.propOr(null, 'createdAt', currentProduct);
    const updatedAt: string | null = R.propOr(null, 'updatedAt', currentProduct);
    const origin: string | null = R.propOr(null, 'origin', currentProduct);
    const createdAtFormated = moment(createdAt).format('LL');
    const updatedAtFormated = moment(updatedAt).format('LL');

    useEffect(() => {
        dispatch(fetchProductById(productId));
    }, []);

    return (
        <Container>
            {!R.isNil(currentProduct) && (
                <Content>
                    <Row>
                        <ProductField>{locale.name}</ProductField>
                        <ProductField>{name}</ProductField>
                    </Row>
                    <Row>
                        <ProductField>{locale.price}</ProductField>
                        <ProductField isPrice>${price}</ProductField>
                    </Row>
                    <Row>
                        <ProductField>{locale.createdAt}</ProductField>
                        <ProductField>{createdAtFormated}</ProductField>
                    </Row>
                    <Row>
                        <ProductField>{locale.updatedAt}</ProductField>
                        <ProductField>{updatedAtFormated}</ProductField>
                    </Row>
                    <Row>
                        <ProductField>{locale.origin}</ProductField>
                        <ProductField>{origin}</ProductField>
                    </Row>
                </Content>
            )}
        </Container>
    );
};

const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px 150px;
    background-color: ${({ theme }) => theme.backgroundsColor.gray};
`;

const ProductField = styled.div<{ isPrice?: boolean }>`
    ${({ theme }) => theme.fontStyles.h3};
    color: ${({ theme, isPrice }) => (isPrice ? theme.textColors.green : null)};
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
`;

export default ProductInfo;
