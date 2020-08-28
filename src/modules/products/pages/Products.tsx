import * as R from 'ramda';
import React from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

import { productSummaryProps } from '../../../interfaces';
import Product from '../components/ProductCard';
import Container from '../../../components/Container';
import Theme from '../../../components/Theme';
import useProducts from '../hooks/useProducts';

const Products = () => {
    const { productsList } = useProducts();

    return (
        <Container>
            <Content>
                {!R.isNil(productsList) ? (
                    productsList.map((item: productSummaryProps) => <Product key={item.id} product={item} />)
                ) : (
                    <Loader type="Grid" color={Theme.backgroundsColor.gray} height={80} width={80} />
                )}
            </Content>
        </Container>
    );
};

const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`;

export default Products;
