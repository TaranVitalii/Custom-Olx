import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Product from './components/Product';
import { getProducts } from './ProductsActions';
import { getProductsSelector } from './ProductsReducer';

const Products = () => {
    const dispatch = useDispatch();
    const productsList = useSelector(getProductsSelector);

    useEffect(() => {
        dispatch(getProducts());
    }, []);

    return (
        <Content>
            {productsList.map((item) => (
                <Product key={item.id} product={item} />
            ))}
        </Content>
    );
};

const Content = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.backgroundsColor.gray};
`;

export default Products;
