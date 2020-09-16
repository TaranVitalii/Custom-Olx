import * as R from 'ramda';
import React, { useState, useCallback } from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

import Container from 'components/Container';
import Theme from 'components/Theme';
import IsEmpty from 'components/IsEmpty';
import locale from 'locale';
import { productSummaryProps } from 'interfaces';
import { createPageList } from '../helpers';

import EditProductModal from '../components/EditProductModal';
import Product from '../components/ProductCard';
import Origin from '../components/Origin';
import PagesListCounter from '../components/PagesListCounter';
import MaxMinPrice from '../components/MaxMinPrice';
import useProducts from '../hooks/useProducts';

const OrdersList = () => {
    const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
    const [currentProduct, setCurrentProduct] = useState<productSummaryProps | null>(null);

    const {
        productsList,
        productsOriginsList,
        onChangeHandler,
        onBlurMinPriceHandler,
        onBlurMaxPriceHandler,
        pageCount,
        currentPage,
        setPage,
    } = useProducts(true);

    /**
     * Show edit modal handler
     */
    const showEditModalHandler = useCallback(
        (event: React.MouseEvent<HTMLImageElement, MouseEvent>, product: productSummaryProps) => {
            event.preventDefault();
            setIsVisibleModal(true);
            setCurrentProduct(product);
        },
        [],
    );

    /**
     * Close modal handler
     */
    const closeModalHandler = useCallback((event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        event.preventDefault();
        setIsVisibleModal(false);
    }, []);

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
                    productsList.map((item: productSummaryProps) => (
                        <Product key={item.id} product={item} isEditable showEditModal={showEditModalHandler} />
                    ))
                ) : R.isEmpty(productsList) ? (
                    <IsEmpty>{locale.productsListIsEmpty}</IsEmpty>
                ) : (
                    <Loader type="Grid" color={Theme.backgroundsColor.gray} height={80} width={80} />
                )}
            </Content>
            <PagesListCounter pageList={createPageList(pageCount)} currentPage={currentPage} setPage={setPage} />
            {isVisibleModal && <EditProductModal closeModal={closeModalHandler} product={currentProduct} />}
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

export default OrdersList;
