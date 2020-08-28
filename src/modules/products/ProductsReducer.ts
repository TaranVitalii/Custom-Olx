import * as R from 'ramda';
import { createSelector } from 'reselect';

import { FETCH_PRODUCTS, FETCH_PRODUCT_BY_ID, ADD_TO_BAG } from './ProductsActions';
import { successAction, failureAction } from '../../store/type';
import calcAllPrice from './helpers/calcAllPrice';
import { productSummaryProps, createOrderProps, createOrderListProps } from '../../interfaces';

interface initialStateProps {
    productsReducer: {
        productsList: Array<productSummaryProps>;
        currentProduct: productSummaryProps;
        order: createOrderProps;
    };
}

const initialState = {
    productsList: null,
    currentProduct: null,
    order: {
        pieces: null,
    },
};

export default function Products(state = initialState, action: any) {
    switch (action.type) {
        case successAction(FETCH_PRODUCTS):
            const productsList = R.path(['payload', 'items'], action);

            return {
                ...state,
                productsList,
            };
        case failureAction(FETCH_PRODUCTS):
            return {
                ...state,
                productsList: null,
            };
        case successAction(FETCH_PRODUCT_BY_ID):
            const currentProduct = R.path(['payload', 'product'], action);
            return {
                ...state,
                currentProduct,
            };
        case failureAction(FETCH_PRODUCT_BY_ID):
            return {
                ...state,
                productsList: null,
            };
        case successAction(ADD_TO_BAG):
            const updatedPieces = R.prop('payload', action);
            console.log('sss', updatedPieces);
            return {
                ...state,
                order: {
                    pieces: updatedPieces,
                },
            };
        default:
            return state;
    }
}

export const getProductsSelector = (state: initialStateProps): Array<productSummaryProps> =>
    R.pathOr([], ['productsReducer', 'productsList'], state);

export const getCurrentProductSelector = (state: initialStateProps): productSummaryProps | null =>
    R.pathOr(null, ['productsReducer', 'currentProduct'], state);

export const getOrderPiecesSelector = (state: initialStateProps): createOrderListProps[] | null =>
    R.pathOr(null, ['productsReducer', 'order', 'pieces'], state);

export const getTotalPrice = (state: initialStateProps): number => {
    const pieces = R.pathOr([], ['productsReducer', 'order', 'pieces'], state);
    const products = getProductsSelector(state);
    const totalCount = calcAllPrice(pieces, products);

    return !!totalCount ? totalCount : 0;
};

export const getProductFromOrder = createSelector(
    getOrderPiecesSelector,
    getProductsSelector,
    (order: createOrderListProps[] | null, products: productSummaryProps[] | []) => {
        if (R.isNil(order)) return [];

        const updatedOrder = order
            .map((item) => {
                const productId = R.prop('productId', item);
                const product = products.find((item) => {
                    const currentProductId = R.prop('id', item);
                    return currentProductId === productId;
                });
                return { ...product, count: item.count };
            })
            .filter((item) => !R.isNil(item));

        return updatedOrder;
    },
);
