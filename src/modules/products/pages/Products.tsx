import * as R from 'ramda';
import React from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

import Container from 'components/Container';
import IsEmpty from 'components/IsEmpty';
import Theme from 'components/Theme';
import locale from 'locale';
import { productSummaryProps } from 'interfaces';

import Product from '../components/ProductCard';
import useProducts from '../hooks/useProducts';
import { createPageList, isSelected } from '../helpers';
import Origin from '../components/Origin';
import PagesListCounter from '../components/PagesListCounter';
import MaxMinPrice from '../components/MaxMinPrice';

const Products = () => {
    const {
        onChangeMaxPriceHandler,
        onChangeMinPriceHandler,
        productsOriginsList,
        onChangeHandler,
        selectedOrigin,
        maxPriceValue,
        minPriceValue,
        productsList,
        currentPage,
        pageCount,
        setPage,
    } = useProducts(null);

    return (
        <Container>
            <FilteredField>
                <ProductsWrapper>
                    {productsOriginsList?.map((productsOrigins, index) => {
                        const displayName = R.prop('displayName', productsOrigins);
                        const value = R.prop('value', productsOrigins);

                        const isChecked: boolean = isSelected(selectedOrigin, value);

                        return (
                            <Origin
                                key={index}
                                checked={isChecked}
                                name={displayName}
                                value={value}
                                onChangeHandler={onChangeHandler}
                            />
                        );
                    })}
                </ProductsWrapper>
                <MaxMinPrice
                    maxPriceValue={maxPriceValue ? maxPriceValue : ''}
                    minPriceValue={minPriceValue ? minPriceValue : ''}
                    onChangeMaxPriceHandler={onChangeMaxPriceHandler}
                    onChangeMinPriceHandler={onChangeMinPriceHandler}
                />
            </FilteredField>
            <Content>
                {!R.isNil(productsList) && !R.isEmpty(productsList) ? (
                    productsList.map((item: productSummaryProps) => (
                        <Product key={item.id} product={item} isEditable={false} showEditModal={null} />
                    ))
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
