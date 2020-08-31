import * as R from 'ramda';
import { createSelector } from 'reselect';

import {
    FETCH_PRODUCTS,
    FETCH_PRODUCT_BY_ID,
    ADD_TO_BAG,
    REMOVE_FROM_ORDER,
    INCREASE_PRODUCT_COUNT,
    DECREASE_PRODUCT_COUNT,
    UPDATE_PRODUCT_COUNT,
} from './ProductsActions';
import { successAction, failureAction } from '../../store/type';
import { calcAllPrice, filterById } from './helpers';
import { productSummaryProps, createOrderProps, createOrderListProps } from '../../interfaces';

export const STATE_KEY = 'products';

interface initialStateProps {
    [STATE_KEY]: {
        productsList: Array<productSummaryProps>;
        currentProduct: productSummaryProps;
        order: createOrderProps;
    };
}

const initialState = {
    productsList: null,
    currentProduct: null,
    order: {
        pieces: [],
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
        case successAction(INCREASE_PRODUCT_COUNT):
        case successAction(DECREASE_PRODUCT_COUNT):
        case successAction(UPDATE_PRODUCT_COUNT):
            const updatedPieces = R.prop('payload', action);

            return {
                ...state,
                order: {
                    pieces: updatedPieces,
                },
            };
        case REMOVE_FROM_ORDER:
            const productId: string | null = R.pathOr(null, ['payload', 'productId'], action);
            const order: createOrderListProps[] = R.pathOr([], ['order', 'pieces'], state);

            const filteredOrder = filterById(productId, order);

            return {
                ...state,
                order: {
                    pieces: filteredOrder,
                },
            };
        default:
            return state;
    }
}

export const getProductsSelector = (state: initialStateProps): Array<productSummaryProps> =>
    R.pathOr([], [STATE_KEY, 'productsList'], state);

export const getCurrentProductSelector = (state: initialStateProps): productSummaryProps | null =>
    R.pathOr(null, [STATE_KEY, 'currentProduct'], state);

export const getOrderPiecesSelector = (state: initialStateProps): createOrderListProps[] | null =>
    R.pathOr(null, [STATE_KEY, 'order', 'pieces'], state);

export const getTotalPrice = (state: initialStateProps): number => {
    const pieces = R.pathOr([], [STATE_KEY, 'order', 'pieces'], state);
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
