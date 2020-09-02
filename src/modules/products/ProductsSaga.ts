import * as R from 'ramda';
import { all, takeEvery, call, put, select } from 'redux-saga/effects';

import {
    FETCH_PRODUCTS,
    FETCH_PRODUCT_BY_ID,
    ADD_TO_BAG,
    fetchProductByIdAction,
    addToBagAction,
} from './ProductsActions';
import { getOrderPiecesSelector } from './ProductsReducer';
import { fetchProductsRequest, fetchProductByIdRequest } from '../../services';
import { successAction, failureAction } from '../../store/type';
import checkProductExist from './helpers/checkProductExist';
import findProduct from './helpers/findProduct';
import filterDuplicate from './helpers/filterDuplicate';

/**
 * Fetch products
 * */
function* fetchProductsHandler() {
    try {
        // fetch get products
        const result = yield call(fetchProductsRequest);

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
                const updatedPieces = filterDuplicate(productId, pieces);
                const currentProductCount: number = R.propOr(0, 'count', currentProduct);
                yield put({
                    type: successAction(ADD_TO_BAG),
                    payload: [...updatedPieces, { productId, count: currentProductCount + 1 }],
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
 * Products Saga
 */
function* productsSaga() {
    yield all([
        takeEvery(FETCH_PRODUCTS, fetchProductsHandler),
        takeEvery(FETCH_PRODUCT_BY_ID, fetchProductByIdHandler),
        takeEvery(ADD_TO_BAG, addToBagSagaHandler),
    ]);
}

export default productsSaga;
