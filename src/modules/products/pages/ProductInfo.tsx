import * as R from 'ramda';
import React from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

import useProductInfo from '../hooks/useProductInfo';
import Container from '../../../components/Container';
import locale from '../../../locale';
import Theme from '../../../components/Theme';

const ProductInfo = () => {
    const { currentProduct, name, price, origin, createdAtFormated, updatedAtFormated } = useProductInfo();

    return (
        <Container>
            {!R.isNil(currentProduct) ? (
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
            ) : (
                <LoaderWrapper>
                    <Loader type="Grid" color={Theme.backgroundsColor.gray} height={80} width={80} />
                </LoaderWrapper>
            )}
        </Container>
    );
};

const LoaderWrapper = styled.div`
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
