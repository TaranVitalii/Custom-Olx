import * as R from 'ramda';
import React from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

import Container from 'components/Container';
import Theme from 'components/Theme';
import IsEmpty from 'components/IsEmpty';
import locale from 'locale';
import { productSummaryProps } from 'interfaces';

import Origin from '../components/Origin';
import Product from '../components/ProductCard';
import PagesListCounter from '../components/PagesListCounter';
import MaxMinPrice from '../components/MaxMinPrice';
import useProducts from '../hooks/useProducts';
import { createPageList } from '../helpers';

const Products = () => {
    const {
        productsList,
        productsOriginsList,
        onChangeHandler,
        onBlurMinPriceHandler,
        onBlurMaxPriceHandler,
        pageCount,
        currentPage,
        setPage,
    } = useProducts();

    return (
        <Container>
            <FilteredField>
                <ProductsWrapper>
                    {productsOriginsList?.map((productsOrigins, index) => {
                        const displayName = R.prop('displayName', productsOrigins);
                        const value = R.prop('value', productsOrigins);

                        return (
                            <Origin key={index} name={displayName} value={value} onChangeHandler={onChangeHandler} />
                        );
                    })}
                </ProductsWrapper>
                <MaxMinPrice
                    onBlurMaxPriceHandler={onBlurMaxPriceHandler}
                    onBlurMinPriceHandler={onBlurMinPriceHandler}
                />
            </FilteredField>
            <Content>
                {!R.isNil(productsList) && !R.isEmpty(productsList) ? (
                    productsList.map((item: productSummaryProps) => <Product key={item.id} product={item} />)
                ) : R.isEmpty(productsList) ? (
                    <IsEmpty>{locale.productsListIsEmpty}</IsEmpty>
                ) : (
                    <Loader type="Grid" color={Theme.backgroundsColor.gray} height={80} width={80} />
                )}
            </Content>
            <PagesListCounter pageList={createPageList(pageCount)} currentPage={currentPage} setPage={setPage} />
        </Container>
    );
};

const FilteredField = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.backgroundsColor.gray};
`;

const ProductsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`;

export default Products;
