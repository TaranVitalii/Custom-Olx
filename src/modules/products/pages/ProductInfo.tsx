import * as R from 'ramda';
import React from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

import Container from 'components/Container';
import Theme from 'components/Theme';
import IsEmpty from 'components/IsEmpty';
import locale from 'locale';

import useProductInfo from '../hooks/useProductInfo';

const ProductInfo = () => {
    const { currentProduct, name, price, origin, createdAtFormatted, updatedAtFormatted } = useProductInfo();

    return (
        <Container>
            {!R.isNil(currentProduct) && !R.isEmpty(currentProduct) ? (
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
                        <ProductField>{createdAtFormatted}</ProductField>
                    </Row>
                    <Row>
                        <ProductField>{locale.updatedAt}</ProductField>
                        <ProductField>{updatedAtFormatted}</ProductField>
                    </Row>
                    <Row>
                        <ProductField>{locale.origin}</ProductField>
                        <ProductField>{origin}</ProductField>
                    </Row>
                </Content>
            ) : R.isEmpty(currentProduct) ? (
                <Wrapper>
                    <IsEmpty>{locale.productInfoIsEmpty}</IsEmpty>
                </Wrapper>
            ) : (
                <Wrapper>
                    <Loader type="Grid" color={Theme.backgroundsColor.gray} height={80} width={80} />
                </Wrapper>
            )}
        </Container>
    );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

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
