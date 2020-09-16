import * as R from 'ramda';
import { createSelector } from 'reselect';

import { successAction, failureAction } from 'store/type';
import {
    productSummaryProps,
    productsConfigProps,
    createOrderProps,
    createOrderListProps,
    productsOriginsProps,
} from 'interfaces';
import { CREATE_ORDER } from 'modules/header/HeaderActions';

import { calcAllPrice, filterById, calcPageCount } from './helpers';
import {
    FETCH_PRODUCTS,
    FETCH_PRODUCT_BY_ID,
    ADD_TO_BAG,
    REMOVE_FROM_ORDER,
    INCREASE_PRODUCT_COUNT,
    DECREASE_PRODUCT_COUNT,
    UPDATE_PRODUCT_COUNT,
    UPDATE_PRODUCT,
    FETCH_PRODUCTS_ORIGINS,
} from './ProductsActions';

export const STATE_KEY = 'products';

interface initialStateProps {
    [STATE_KEY]: {
        productsList: Array<productSummaryProps>;
        productsResponseConfig: productsConfigProps;
        productsOrigins: productsOriginsProps;
        currentProduct: productSummaryProps;
        order: createOrderProps;
    };
}

const initialState = {
    productsList: null,
    productsResponseConfig: null,
    currentProduct: null,
    productsOrigins: null,
    order: {
        pieces: [],
    },
};

export default function Products(state = initialState, action: any) {
    switch (action.type) {
        case successAction(FETCH_PRODUCTS): {
            const productsList = R.path(['payload', 'items'], action);
            const page = R.path(['payload', 'page'], action);
            const perPage = R.path(['payload', 'perPage'], action);
            const totalItems = R.path(['payload', 'totalItems'], action);

            return {
                ...state,
                productsList,
                productsResponseConfig: {
                    page,
                    perPage,
                    totalItems,
                },
            };
        }
        case failureAction(FETCH_PRODUCTS): {
            return {
                ...state,
                productsList: null,
            };
        }
        case successAction(FETCH_PRODUCT_BY_ID): {
            const currentProduct = R.path(['payload', 'product'], action);
            return {
                ...state,
                currentProduct,
            };
        }
        case failureAction(FETCH_PRODUCT_BY_ID): {
            return {
                ...state,
                productsList: null,
            };
        }
        case successAction(ADD_TO_BAG):
        case successAction(INCREASE_PRODUCT_COUNT):
        case successAction(DECREASE_PRODUCT_COUNT):
        case successAction(UPDATE_PRODUCT_COUNT): {
            const updatedPieces = R.prop('payload', action);

            return {
                ...state,
                order: {
                    pieces: updatedPieces,
                },
            };
        }
        case successAction(FETCH_PRODUCTS_ORIGINS): {
            const productsOrigins = R.path(['payload', 'items'], action);

            return {
                ...state,
                productsOrigins,
            };
        }
        case REMOVE_FROM_ORDER: {
            const productId: string | null = R.pathOr(null, ['payload', 'productId'], action);
            const order: createOrderListProps[] = R.pathOr([], ['order', 'pieces'], state);

            const filteredOrder = filterById(productId, order);

            return {
                ...state,
                order: {
                    pieces: filteredOrder,
                },
            };
        }
        case successAction(UPDATE_PRODUCT): {
            const productId: string | null = R.pathOr(null, ['payload', 'id'], action);
            const updatedProduct = R.pathOr(null, ['payload'], action);
            const productsList: productSummaryProps[] = R.propOr(null, 'productsList', state);

            const productsListUpdated = productsList.map((product) =>
                R.prop('id', product) === productId ? updatedProduct : product,
            );

            return { ...state, productsList: productsListUpdated };
        }
        case successAction(CREATE_ORDER): {
            return { ...state, order: { pieces: [] } };
        }
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

export const getProductsOrigins = (state: initialStateProps): productsOriginsProps[] | null =>
    R.pathOr(null, [STATE_KEY, 'productsOrigins'], state);

export const getProductsConfig = (state: initialStateProps): productsConfigProps | null =>
    R.pathOr(null, [STATE_KEY, 'productsResponseConfig'], state);

export const getProductsConfigSelector = createSelector(getProductsConfig, (productsConfig) => {
    const totalItems: number | null = R.propOr(null, 'totalItems', productsConfig);
    const perPage: number | null = R.propOr(null, 'perPage', productsConfig);
    const currentPage: number = R.propOr(1, 'page', productsConfig);

    const pageCount = calcPageCount(totalItems, perPage);

    return {
        currentPage,
        pageCount,
    };
});

export const getProductsOriginsSelector = createSelector(getProductsOrigins, (productsOrigins) => productsOrigins);

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
