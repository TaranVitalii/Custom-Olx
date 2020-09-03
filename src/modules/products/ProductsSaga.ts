import * as R from 'ramda';
import { all, takeEvery, call, put, select } from 'redux-saga/effects';

import {
    FETCH_PRODUCTS,
    FETCH_PRODUCT_BY_ID,
    ADD_TO_BAG,
    INCREASE_PRODUCT_COUNT,
    DECREASE_PRODUCT_COUNT,
    UPDATE_PRODUCT_COUNT,
    FETCH_PRODUCTS_ORIGINS,
    increaseProductCountAction,
    decreaseProductCountAction,
    updateProductCountAction,
    fetchProductByIdAction,
    fetchProductsAction,
    addToBagAction,
} from './ProductsActions';
import { getOrderPiecesSelector } from './ProductsReducer';
import { checkProductExist, findProduct, increasePieceCount, decreasePieceCount, updatePieceCount } from './helpers';
import { fetchProductsRequest, fetchProductByIdRequest, fetchProductOriginsRequest } from '../../services';
import { successAction, failureAction } from '../../store/type';

/**
 * Fetch products
 * */
function* fetchProductsHandler(action: fetchProductsAction) {
    try {
        const { page, origins, maxPrice, minPrice } = R.prop('payload', action);

        // fetch get products
        const result = yield call(fetchProductsRequest, { page, origins, maxPrice, minPrice });

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

        if (!!productId) {
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
 * Products Saga
 */
function* productsSaga() {
    yield all([
        takeEvery(FETCH_PRODUCTS, fetchProductsHandler),
        takeEvery(FETCH_PRODUCTS_ORIGINS, fetchProductsOriginsHandler),
        takeEvery(FETCH_PRODUCT_BY_ID, fetchProductByIdHandler),
        takeEvery(ADD_TO_BAG, addToBagSagaHandler),
        takeEvery(INCREASE_PRODUCT_COUNT, increaseProductCountSagaHandler),
        takeEvery(DECREASE_PRODUCT_COUNT, decreaseProductCountSagaHandler),
        takeEvery(UPDATE_PRODUCT_COUNT, updateProductCountSagaHandler),
    ]);
}

export default productsSaga;
