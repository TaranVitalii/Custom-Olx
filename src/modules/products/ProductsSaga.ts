import * as R from 'ramda';
import { all, takeEvery, call, put, select, debounce } from 'redux-saga/effects';

import {
    fetchProductsRequest,
    fetchProductByIdRequest,
    fetchProductOriginsRequest,
    updateProductRequest,
} from 'services';
import { successAction, failureAction } from 'store/type';
import { productTypes } from 'interfaces';
import { createProductStatus } from 'models';

import {
    FETCH_PRODUCTS,
    FETCH_PRODUCT_BY_ID,
    ADD_TO_BAG,
    INCREASE_PRODUCT_COUNT,
    DECREASE_PRODUCT_COUNT,
    UPDATE_PRODUCT_COUNT,
    FETCH_PRODUCTS_ORIGINS,
    CALL_PRODUCTS_DEBOUNCE_WATCHER,
    UPDATE_PRODUCT,
    increaseProductCountAction,
    decreaseProductCountAction,
    updateProductCountAction,
    fetchProductByIdAction,
    fetchProductsAction,
    addToBagAction,
    updateProductTypes,
    FETCH_DEBOUNCE_PRODUCT,
} from './ProductsActions';
import { getOrderPiecesSelector } from './ProductsReducer';
import { checkProductExist, findProduct, increasePieceCount, decreasePieceCount, updatePieceCount } from './helpers';

/**
 * Fetch products
 * */
function* fetchProductsHandler(action: fetchProductsAction) {
    try {
        const { page, origins, maxPrice, minPrice, editable } = R.prop('payload', action);

        // fetch get products
        const result = yield call(fetchProductsRequest, { page, origins, maxPrice, minPrice, editable });

        // check result exist
        if (result) {
            yield put({ type: successAction(FETCH_PRODUCTS), payload: result });
        } else {
            yield put({ type: failureAction(FETCH_PRODUCTS) });
        }
    } catch (e) {
        yield put({ type: failureAction(FETCH_PRODUCTS) });
    }
}

/**
 * Fetch products
 * */
function* fetchProductsOriginsHandler() {
    try {
        // fetch get products
        const result = yield call(fetchProductOriginsRequest);

        // check result exist
        if (result) {
            yield put({ type: successAction(FETCH_PRODUCTS_ORIGINS), payload: result });
        } else {
            yield put({ type: failureAction(FETCH_PRODUCTS_ORIGINS) });
        }
    } catch (e) {
        yield put({ type: failureAction(FETCH_PRODUCTS_ORIGINS) });
    }
}

/**
 * Fetch product by id
 * */
function* fetchProductByIdHandler(action: fetchProductByIdAction) {
    try {
        const productId = R.path(['payload', 'productId'], action);
        // fetch product by id
        const result = yield call(fetchProductByIdRequest, productId);

        // check result exist
        if (result) {
            yield put({ type: successAction(FETCH_PRODUCT_BY_ID), payload: { product: result } });
        } else {
            yield put({ type: failureAction(FETCH_PRODUCT_BY_ID) });
        }
    } catch (e) {
        yield put({ type: failureAction(FETCH_PRODUCTS) });
    }
}

/**
 * Fetch product by id
 * */
function* addToBagSagaHandler(action: addToBagAction) {
    try {
        const productId: string | null = R.pathOr(null, ['payload', 'productId'], action);
        const pieces = yield select(getOrderPiecesSelector);

        if (!R.isNil(productId)) {
            const productExist = checkProductExist(productId, pieces);

            if (productExist) {
                const currentProduct = findProduct(productId, pieces);
                const currentProductCount: number = R.propOr(0, 'count', currentProduct);

                const updatedPieces = increasePieceCount(pieces, productId, currentProductCount);

                yield put({
                    type: successAction(ADD_TO_BAG),
                    payload: updatedPieces,
                });
            } else {
                const updatedPieces =
                    R.isEmpty(pieces) || R.isNil(pieces)
                        ? [{ productId, count: 1 }]
                        : [...pieces, { productId, count: 1 }];
                yield put({ type: successAction(ADD_TO_BAG), payload: updatedPieces });
            }
        }
    } catch (e) {
        // field for error modal
    }
}

/**
 * Increase Product Count in Order saga
 */
function* increaseProductCountSagaHandler(action: increaseProductCountAction) {
    try {
        const productId: string | null = R.pathOr(null, ['payload', 'productId'], action);
        const pieces = yield select(getOrderPiecesSelector);
        const currentProduct = findProduct(productId, pieces);
        const currentProductCount: number = R.propOr(0, 'count', currentProduct);

        if (!!productId) {
            const updatedPieces = increasePieceCount(pieces, productId, currentProductCount);

            yield put({
                type: successAction(ADD_TO_BAG),
                payload: updatedPieces,
            });
        }
    } catch (e) {
        //show error modal
    }
}

/**
 * Decrease Product Count in Order saga
 */
function* decreaseProductCountSagaHandler(action: decreaseProductCountAction) {
    try {
        const productId: string | null = R.pathOr(null, ['payload', 'productId'], action);
        const pieces = yield select(getOrderPiecesSelector);
        const currentProduct = findProduct(productId, pieces);
        const currentProductCount: number = R.propOr(0, 'count', currentProduct);

        if (currentProductCount <= 1) return;

        if (!!productId) {
            const updatedPieces = decreasePieceCount(pieces, productId, currentProductCount);

            yield put({
                type: successAction(DECREASE_PRODUCT_COUNT),
                payload: updatedPieces,
            });
        }
    } catch (e) {
        //show error modal
    }
}

/**
 * Update Product Count in Order saga
 */
function* updateProductCountSagaHandler(action: updateProductCountAction) {
    try {
        const productId: string | null = R.pathOr(null, ['payload', 'productId'], action);
        const updatedCount: number = R.pathOr(0, ['payload', 'count'], action);
        const pieces = yield select(getOrderPiecesSelector);

        if (updatedCount < 1) return;

        if (!!productId) {
            const updatedPieces = updatePieceCount(pieces, productId, updatedCount);

            yield put({
                type: successAction(UPDATE_PRODUCT_COUNT),
                payload: updatedPieces,
            });
        }
    } catch (e) {
        //show error modal
    }
}

/**
 * Update product data
 */
function* updateProductHandler(action: updateProductTypes) {
    const product: productTypes | null = R.pathOr(null, ['payload', 'product'], action);
    const productId: string | null = R.pathOr(null, ['payload', 'productId'], action);

    const setCreatedStatus: ((value: string | null) => void | undefined) | null = R.pathOr(
        null,
        ['payload', 'setCreatedStatus'],
        action,
    );
    const setIsLoading: ((value: boolean) => void | undefined) | null = R.pathOr(
        null,
        ['payload', 'setIsLoading'],
        action,
    );

    try {
        if (!R.isNil(product)) {
            const result = yield call(updateProductRequest, { product }, productId);

            if (result && !R.isNil(setCreatedStatus) && !R.isNil(setIsLoading)) {
                yield put({ type: successAction(UPDATE_PRODUCT), payload: result });
                yield call(setCreatedStatus, createProductStatus.updated);
                yield call(setIsLoading, false);
            }
        }
    } catch (e) {
        if (!R.isNil(setCreatedStatus) && !R.isNil(setIsLoading)) {
            yield call(setCreatedStatus, createProductStatus.failed);
            yield call(setIsLoading, false);
        }
        //show error modal
    }
}

/**
 * Call products with debounce
 */
function* callProductDebounceHandler() {
    yield debounce(2000, FETCH_DEBOUNCE_PRODUCT, fetchProductsHandler);
}

/**
 * Products Saga
 */
function* productsSaga() {
    yield all([
        takeEvery(FETCH_PRODUCTS, fetchProductsHandler),
        takeEvery(CALL_PRODUCTS_DEBOUNCE_WATCHER, callProductDebounceHandler),
        takeEvery(FETCH_PRODUCTS_ORIGINS, fetchProductsOriginsHandler),
        takeEvery(FETCH_PRODUCT_BY_ID, fetchProductByIdHandler),
        takeEvery(ADD_TO_BAG, addToBagSagaHandler),
        takeEvery(INCREASE_PRODUCT_COUNT, increaseProductCountSagaHandler),
        takeEvery(DECREASE_PRODUCT_COUNT, decreaseProductCountSagaHandler),
        takeEvery(UPDATE_PRODUCT_COUNT, updateProductCountSagaHandler),
        takeEvery(UPDATE_PRODUCT, updateProductHandler),
    ]);
}

export default productsSaga;
