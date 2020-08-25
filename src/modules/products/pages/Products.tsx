import * as R from 'ramda';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { productSummaryProps } from '../../../interfaces';
import Product from '../components/ProductCard';
import { fetchProducts } from '../ProductsActions';
import { getProductsSelector } from '../ProductsReducer';
import Container from '../../../components/Container';

const Products = () => {
    const dispatch = useDispatch();
    const productsList: productSummaryProps[] | null = useSelector(getProductsSelector);

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return (
        <Container>
            <Content>
                {!R.isNil(productsList) &&
                    productsList.map((item: productSummaryProps) => <Product key={item.id} product={item} />)}
            </Content>
        </Container>
    );
};

const Content = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

export default Products;
